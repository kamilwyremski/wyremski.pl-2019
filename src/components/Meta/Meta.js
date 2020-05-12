import React, { Component } from 'react';
import MetaTags from 'react-meta-tags';

import messages_pl from "./../../translations/pl.json";
import messages_en from "./../../translations/en.json";

const messages = {
  'pl': messages_pl,
  'en': messages_en
};

const url = 'https://wyremski.pl';

class Meta extends Component {

  constructor(props) {
    super();
    this.state = {
      lang: '',
      component: '',
      title: '',
      keywords: '',
      description: '',
      og_locale: '',
      image: '',
      url: ''
		}
  }
  
  static getDerivedStateFromProps(props, state) {
    if (props.language !== state.language || props.component !== state.component || props.meta !== state.meta) {

      let lang = props.language;
      let component = props.component;

      document.getElementsByTagName('html')[0].setAttribute('lang',lang);

      let title = messages[lang][component+'.title'];
      if(props.meta.title !== undefined){
        title = props.meta.title;
      }
      if(component !== 'home'){
        title = title+' - '+messages[lang]['home.title'];
      }
      document.title = title;

      let description = messages[lang][component+'.description'];
      if(props.meta.description !== undefined){
        description = props.meta.description;
      }
    
      let keywords = messages[lang]['home.keywords'];

      let image = url+'/upload/images/logo_facebook.png';
      if(props.meta.image!==undefined){
        image = url+props.meta.image
      }

      let favicon = url+'/upload/images/favicon/favicon.png';
      if(props.meta.image!==undefined){
        favicon = url+props.meta.favicon
      }
      document.querySelector('link[rel="shortcut icon"]').href = favicon;

      let alternate_pl = url+messages['pl']['nav.link.'+component];
      let alternate_en = url+messages['en']['nav.link.'+component];
      if(props.meta.script_name!==undefined){
        alternate_pl = alternate_pl+'/'+props.meta.script_name;
        alternate_en = alternate_en+'/'+props.meta.script_name;
      }
      document.querySelector('link[hreflang="pl"]').href = alternate_pl;
      document.querySelector('link[hreflang="en"]').href = alternate_en;

      return {
        lang: lang,
        component: component,
        title: title,
        description: description,
        keywords: keywords,
        og_locale: lang === 'pl' ? 'pl_PL' : 'en_US',
        image: image,
        url: url
      }
    }
  }

  render() {
    return (
      <MetaTags>
        <title>{this.state.title}</title>
        <meta name="keywords" content={this.state.keywords}/>
        <meta name="description" content={this.state.description}/>
        <meta name="author" content="Kamil Wyremski"/>

        <meta property="og:image" content={this.state.image}/>
        <meta property="og:description" content={this.state.description}/>
        <meta property="og:title" content={this.state.title}/>
        <meta property="og:type" content="website"/>
        <meta property="og:site_name" content={this.state.title}/>
        <meta property="og:locale" content={this.state.og_locale}/>
        <meta property="og:url" content={this.state.url}/>
        <meta property="fb:app_id" content="531870546992716"/>

        <meta name="twitter:card" content="summary"/>
        <meta name="twitter:title" content={this.state.title}/>
        <meta name="twitter:description" content={this.state.description}/>
        <meta name="twitter:image" content={this.state.image}/>

        <meta name="p:domain_verify" content="c2fb247846bc4133916bec76263b6941"/>
      </MetaTags>
      )
  }
}

export default Meta;