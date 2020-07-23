import React, { Component } from 'react';
import {FormattedMessage} from 'react-intl';
import LazyLoad from 'react-image-lazy-load';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import Error404 from './../Error404/Error404';
import Preloader from './../Preloader/Preloader.js';

import './Script.scss';

class Script extends Component {
  constructor(props) {
    super(props);
    this.state = {
      script: false,
      script_name: this.props.match.params.script_slug,
      photoIndex: 0,
      lightboxIsOpen: false,
      script_error404: false
    };
  }

  componentDidMount() {
    fetch('/json/scripts/'+this.state.script_name+'.json')
      .then(response => response.json())
      .then(data => {
        let meta = {
          'messages': data,
          'title': data[this.props.language]['title'],
          'script_name': this.state.script_name,
          'description': data[this.props.language]['description'],
          'image': '/upload/scripts/'+this.state.script_name+'/'+this.state.script_name+'.jpg',
          'image_width': 450,
          'image_height': 300,
          'favicon': '/upload/scripts/'+this.state.script_name+'/favicon.png',
        }
        this.props.handleLanguage(this.props.language,'script',meta);
        this.setState({ script: data.data });
        window.scrollTo(0, 0);
      })
      .catch( err => {
        this.setState({ script_error404: true });
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
          <FormattedMessage id={"script.function."+i}  values={{
              h4: chunks => <h4>{chunks}</h4>,
              p: chunks => <p>{chunks}</p>,
              strong: chunks => <strong>{chunks}</strong>,
            }}
          />
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
    const { script, script_name, photoIndex, lightboxIsOpen, script_error404 } = this.state;
    const images = this.getImages();
    const list_domains = this.createListDomains();
    const show_list_domains = list_domains.length ? true : false;
    return (
      <main>
        {!script && !script_error404 && <Preloader/>}
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
            <div className="text-center section container" id="script--up--bottom">
              <FormattedMessage id="script.desc1" values={{
                  h2: chunks => <h2>{chunks}</h2>,
                  p: chunks => <p>{chunks}</p>,
                  strong: chunks => <strong>{chunks}</strong>,
                  breakingLine: <br />
                }}
              />
            </div>
            <div className="d-flex container text-center">
        			<div className="features">
                <LazyLoad height={100} width={100} offsetVertical={300} loaderImage imageProps={{
                  src: "/upload/scripts/clock.png",
                  alt: "Clock"
                }} />
        			  <FormattedMessage id="script.feature.1" values={{
                  h4: chunks => <h4>{chunks}</h4>,
                  p: chunks => <p>{chunks}</p>,
                 }}
                />
        			</div>
        			<div className="features">
                <LazyLoad height={100} width={100} offsetVertical={300} loaderImage imageProps={{
                  src: "/upload/scripts/main-ok.png",
                  alt: "OK"
                }} />
        				<FormattedMessage id="script.feature.2" values={{
                  h4: chunks => <h4>{chunks}</h4>,
                  p: chunks => <p>{chunks}</p>,
                 }}
                />
        			</div>
        			<div className="features">
                <LazyLoad height={100} width={100} offsetVertical={300} loaderImage imageProps={{
                  src: "/upload/scripts/help.png",
                  alt: "Help"
                }} />
        				<FormattedMessage id="script.feature.3" values={{
                  h4: chunks => <h4>{chunks}</h4>,
                  p: chunks => <p>{chunks}</p>,
                 }}
                />
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
            	<p><FormattedMessage id="script.requirements_bottom" values={{
                strong: chunks => <strong>{chunks}</strong>
              }}/></p>
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
              <FormattedMessage id="script.language.desc" values={{
                p: chunks => <p>{chunks}</p>,
                strong: chunks => <strong>{chunks}</strong>,
                breakingLine: <br />
              }}/>
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
              <h4><FormattedMessage id="script.demo.desc" values={{
                strong: chunks => <strong>{chunks}</strong>,
                a: chunks => <a href={'https://'+chunks} target="_blank" rel="noopener noreferrer" title={script_name}>{chunks}</a>
              }}/>
              </h4>
          		<br />
              <p><FormattedMessage id="script.demo.desc2" values={{
                strong: chunks => <strong>{chunks}</strong>,
                a: chunks => <a href={'https://'+chunks} target="_blank" rel="noopener noreferrer" title={script_name}>{chunks}</a>,
                breakingLine: <br />
              }}/>
              </p>
              {show_list_domains &&
              	<p><FormattedMessage id="script.demo.list"/> <strong>{list_domains}</strong></p>
              }
              <p><FormattedMessage id="script.demo.manual" values={{
                a: chunks => <a href="http://blog.wyremski.pl/instrukcja-instalacji-i-konfiguracji-skryptow/" title="Instrukcja instalacji i konfiguracji skryptów" target="_blank" rel="noopener noreferrer">{chunks}</a>,
                breakingLine: <br />
              }}/></p>
            </div>
          	<div className="text-center background-light" id="script--info">
          		<h4><FormattedMessage id="script.desc2"/></h4>
          	</div>
            <div className="text-center container section">
              <FormattedMessage id="script.desc3"
                values={{
                  h3: chunks => <h3>{chunks}</h3>,
                  p: chunks => <p>{chunks}</p>,
                  breakingLine: <br />
                }}
              />
              <a href={script.buy_url} title={script_name} id="script--buy"><FormattedMessage id="script.buy"/></a>
            </div>
          </div>
        }
        {script_error404 &&
          <Error404 language={this.props.language} handleLanguage = {this.props.handleLanguage.bind(this)}/>
        }
      </main>
    );
  }
}

export default Script;