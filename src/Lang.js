import messages_pl from "./translations/pl.json";
import messages_en from "./translations/en.json";

const messages = {
  'pl': messages_pl,
  'en': messages_en
};

const language = window.location.pathname.substring(0,3)==='/en' ? 'en' : 'pl';

let meta = {
  'lang': language,
  'title': messages[language]['home.title'],
  'description': messages[language]['home.description'],
  'keywords': messages[language]['home.keywords'],
  'image': '/upload/images/logo_facebook.png',
  'url': window.location.href,
  'favicon': '/upload/images/favicon/favicon.png'
}

function setMetaTags(meta) {
  if(meta.lang!==undefined){
    document.getElementsByTagName('html')[0].setAttribute('lang',meta.lang);
    if(meta.lang==='pl'){
      document.querySelector('meta[property="og:locale"]').setAttribute("content", 'pl_PL');
    }else{
      document.querySelector('meta[property="og:locale"]').setAttribute("content", 'en_US');
    }
  }
  if(meta.title!==undefined){
    document.title = meta.title;
    document.querySelector('meta[property="og:title"]').setAttribute("content", meta.title);
    document.querySelector('meta[property="og:site_name"]').setAttribute("content", meta.title);
    document.querySelector('meta[name="twitter:title"]').setAttribute("content", meta.title);
  }
  if(meta.description!==undefined){
    document.querySelector('meta[name="description"]').setAttribute("content", meta.description);
    document.querySelector('meta[property="og:description"]').setAttribute("content", meta.description);
    document.querySelector('meta[name="twitter:description"]').setAttribute("content", meta.description);
  }
  if(meta.keywords!==undefined){
    document.querySelector('meta[name="keywords"]').setAttribute("content", meta.keywords);
  }
  if(meta.image!==undefined){
    document.querySelector('meta[property="og:image"]').setAttribute("content", window.location.origin+meta.image);
    document.querySelector('meta[name="twitter:image"]').setAttribute("content", window.location.origin+meta.image);
  }
  if(meta.favicon!==undefined){
    document.querySelector('link[rel="shortcut icon"]').href = window.location.origin+meta.favicon;
  }
  if(meta.url!==undefined){
    document.querySelector('meta[property="og:url"]').setAttribute("content", meta.url);
  }
  if(meta.alternate_pl!==undefined){
    document.querySelector('link[hreflang="pl"]').href = window.location.origin+meta.alternate_pl;
    if(language==='en'){
      document.getElementById('nav--link-lang').href = window.location.origin+meta.alternate_pl;
    }
  }
  if(meta.alternate_en!==undefined){
    document.querySelector('link[hreflang="en"]').href = window.location.origin+meta.alternate_en;
    if(language==='pl'){
      document.getElementById('nav--link-lang').href = window.location.origin+meta.alternate_en;
    }
  }
}
setMetaTags(meta);

export {
  language,
  messages,
  setMetaTags
}