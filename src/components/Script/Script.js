import React, { Component } from 'react';
import './Script.scss';
import {FormattedMessage, FormattedHTMLMessage} from 'react-intl';
import { messages, language, setMetaTags } from './../../Lang';
import LazyLoad from 'react-image-lazy-load';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

class Script extends Component {
  constructor(props) {
    super(props);
    this.state = {
      script: false,
      script_name: this.props.match.params.script_slug,
      photoIndex: 0,
      lightboxIsOpen: false
    };
  }

  componentDidMount() {
    fetch('/json/scripts/'+this.state.script_name+'.json')
      .then(response => response.json())
      .then(data => {
        Object.assign(messages.pl, data.pl);
        Object.assign(messages.en, data.en);
        this.setState({ script: data.data });
        let meta = {
          'title': data[language]['title']+' - '+messages[language]['home.title'],
          'description': data[language]['description'],
          'image': '/upload/scripts/'+this.state.script_name+'/'+this.state.script_name+'.jpg',
          'favicon': '/upload/scripts/'+this.state.script_name+'/favicon.png',
          'alternate_pl': messages['pl']['nav.link.script']+'/'+this.state.script_name,
          'alternate_en': messages['en']['nav.link.script']+'/'+this.state.script_name
        }
        setMetaTags(meta);
        window.scrollTo(0, 0);
      })
  }

  createFunctions = () => {
    let functions = []
    for (let i = 1; i <= this.state.script.functions; i++) {
      functions.push(<div className="functions" key={i}>
        <div className="animatable fadeInUp">
          <LazyLoad height={250} width={200} offsetVertical={300} loaderImage imageProps={{
            src: "/upload/scripts/"+this.state.script_name+"/f"+i+".jpg",
            alt: this.state.script_name
          }} />
          <FormattedHTMLMessage id={"script.function."+i}/>
        </div>
      </div>)
    }
    return functions;
  }

  createGallery = () => {
    let gallery = []
    for (let i = 1; i <= this.state.script.photos; i++) {
      gallery.push(<div className="gallery--photo" key={i}>
        <div className="animatable fadeInUp">
          <button title={this.state.script_name} onClick={() => this.setState({ lightboxIsOpen: true, photoIndex: i-1 })} className="gallery--link">
            <LazyLoad height={138} width={245} offsetVertical={300} loaderImage imageProps={{
              src: "/upload/scripts/"+this.state.script_name+"/screenshots/"+i+"_thumb.jpg",
              alt: this.state.script_name
            }} />
          </button>
        </div>
      </div>)
    }
    return gallery;
  }

  getImages = () => {
    let images = []
    for (let i = 1; i <= this.state.script.photos; i++) {
      images.push("/upload/scripts/"+this.state.script_name+"/screenshots/"+i+".jpg");
    }
    return images;
  }

  createListDomains = () => {
    let domains = [];
    if(this.state.script.list_domains!==undefined){
      let arr_length = this.state.script.list_domains.length;
      for (let i = 0; i < arr_length; i++) {
        if(i===arr_length-1){
          domains.push(<span key={i}><a title={this.state.script.list_domains[i]} href={"http://"+this.state.script.list_domains[i]} target="_blank" rel="nofollow noopener noreferrer"  key={i}>{this.state.script.list_domains[i]}</a></span>);
        }else{
          domains.push(<span key={i}><a title={this.state.script.list_domains[i]} href={"http://"+this.state.script.list_domains[i]} target="_blank" rel="nofollow noopener noreferrer"  key={i}>{this.state.script.list_domains[i]}</a>, </span>);
        }
      }
    }
    return domains;
  }

  render() {
    const { script, script_name, photoIndex, lightboxIsOpen } = this.state;
    const images = this.getImages();
    const list_domains = this.createListDomains();
    const show_list_domains = list_domains.length ? true : false;
    return (
      <main>
        {!script &&
          <div className="preloader d-flex">
            <div className="cssload-container">
              <div className="cssload-loading"><i></i><i></i><i></i><i></i></div>
            </div>
          </div>
        }
        {script &&
          <div id="script">
            <div id="script--up" className="text-center">
            	<div id="script--up--middle">
                <h1><FormattedMessage id="script.header"/></h1>
                <h3><FormattedMessage id="script.subheader"/></h3>
                <LazyLoad offsetVertical={300} loaderImage imageProps={{
                  src: "/upload/scripts/"+script_name+"/banner_top.png",
                  alt: script_name
                }} />
            	</div>
            </div>
            <div className="text-center section container">
              <FormattedHTMLMessage id="script.desc1"/>
            </div>
            <div className="d-flex container text-center">
        			<div className="features">
                <LazyLoad height={100} width={100} offsetVertical={300} loaderImage imageProps={{
                  src: "/upload/scripts/clock.png",
                  alt: "Clock"
                }} />
        			  <FormattedHTMLMessage id="script.feature.1"/>
        			</div>
        			<div className="features">
                <LazyLoad height={100} width={100} offsetVertical={300} loaderImage imageProps={{
                  src: "/upload/scripts/main-ok.png",
                  alt: "OK"
                }} />
        				<FormattedHTMLMessage id="script.feature.2"/>
        			</div>
        			<div className="features">
                <LazyLoad height={100} width={100} offsetVertical={300} loaderImage imageProps={{
                  src: "/upload/scripts/help.png",
                  alt: "Help"
                }} />
        				<FormattedHTMLMessage id="script.feature.3"/>
        			</div>
        		</div>
            <br />
            <div className="text-center background-dark section">
              <h2 className="color-light"><FormattedMessage id="script.functions"/></h2>
	            <div className="container d-flex">
                {this.createFunctions()}
              </div>
            </div>
            <div className="container text-center section">
            	<h2><FormattedMessage id="script.requirements"/></h2>
            	<div className="d-flex">
            		<div className="script--requirements">
                  <LazyLoad height={200} width={142} offsetVertical={300} loaderImage imageProps={{
                    src: "/upload/scripts/php7.png",
                    alt: "Logo PHP7"
                  }} />
                  <h4>PHP</h4>
            			<p><FormattedMessage id="script.requirements.1"/></p>
            		</div>
            		<div className="script--requirements">
                  <LazyLoad height={200} width={168} offsetVertical={300} loaderImage imageProps={{
                    src: "/upload/scripts/mysql.png",
                    alt: "Logo MySQL"
                  }} />
                  <h4>MySQL</h4>
            			<p><FormattedMessage id="script.requirements.2"/></p>
            		</div>
            		<div className="script--requirements">
                  <LazyLoad height={200} width={188} offsetVertical={300} loaderImage imageProps={{
                    src: "/upload/scripts/crontab.png",
                    alt: "Logo CronTab"
                  }} />
                  <h4>CronTab</h4>
            			<p><FormattedMessage id="script.requirements.3"/></p>
            		</div>
            	</div>
            	<p><FormattedHTMLMessage id="script.requirements_bottom"/></p>
            </div>
            <div className="text-center color-light background-dark section" id="script--admin--panel">
            	<h2><FormattedMessage id="script.admin_panel"/></h2>
              <LazyLoad height={129} width={345} offsetVertical={300} loaderImage imageProps={{
                src: "/upload/scripts/admin.png",
                alt: "Admin Panel created by Kamil Wyremski"
              }} />
            	<p><FormattedMessage id="script.admin_panel_description"/></p>
            </div>
            <div className="container text-center section" id="script--language">
            	<h2><FormattedMessage id="script.language.title"/></h2>
              <LazyLoad height={286} width={258} offsetVertical={300} loaderImage imageProps={{
                src: "/upload/scripts/language.png",
                alt: "Flags of countries in the world"
              }} />
              <FormattedHTMLMessage id="script.language.desc"/>
            </div>
          	<div className="text-center section background-light" id="script--gallery">
          		<h2><FormattedMessage id="script.gallery"/></h2>
          		<br />
          		<div className="container d-flex">
                {this.createGallery()}
          		</div>
          	</div>
            {lightboxIsOpen && (
              <Lightbox
                mainSrc={images[photoIndex]}
                nextSrc={images[(photoIndex + 1) % images.length]}
                prevSrc={images[(photoIndex + images.length - 1) % images.length]}
                onCloseRequest={() => this.setState({ lightboxIsOpen: false })}
                onMovePrevRequest={() =>
                  this.setState({
                    photoIndex: (photoIndex + images.length - 1) % images.length,
                  })
                }
                onMoveNextRequest={() =>
                  this.setState({
                    photoIndex: (photoIndex + 1) % images.length,
                  })
                }
              />
            )}
            <div className="text-center container section">
          		<h2><FormattedMessage id="script.demo.title"/></h2>
            	<br />
              <FormattedHTMLMessage id="script.demo.desc"/>
          		<br />
              {show_list_domains &&
              	<p><FormattedMessage id="script.demo.list"/> <strong>{list_domains}</strong></p>
              }
              <FormattedHTMLMessage id="script.demo.manual"/>
            </div>
          	<div className="text-center background-light" id="script--info">
          		<h4><FormattedMessage id="script.desc2"/></h4>
          	</div>
            <div className="text-center container section">
              <FormattedHTMLMessage id="script.desc3"/>
              <a href={script.buy_url} title={script_name} id="script--buy"><FormattedMessage id="script.buy"/></a>
            </div>
          </div>
        }
      </main>
    );
  }
}

export default Script;
