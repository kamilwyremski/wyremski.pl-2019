import React, { Component } from 'react';
import { Link } from "react-router-dom";
import {injectIntl,FormattedMessage} from 'react-intl';
import LazyLoad from 'react-image-lazy-load';
import Preloader from './../Preloader/Preloader.js';

import './Scripts.scss';

class Scripts extends Component {
  constructor({intl, ...props}) {
    super();
    this.state = {
      scripts: []
    };
  }

  componentDidMount() {
    this.mounted = true;
    fetch('/json/scripts.json')
      .then(response => response.json())
      .then(data => {
        if(this.mounted) {
          setTimeout(() => {
            this.setState({ scripts: data.scripts });
            if(!window.scrollY){
              window.scrollTo(0, 50);
              window.scrollTo(0, 0);
            }
          }, 100);
        }
      }
    );
    this.props.handleLanguage(this.props.language,'scripts');
  }

  componentWillUnmount(){
    this.mounted = false;
  }

  render() {
    const language = this.props.language;
    const intl = this.props.intl;
    return (
      <main id="scripts">
        <div className="section container">
          <div className="text-center">
            <h1><FormattedMessage id="scripts.title"/></h1>
            <h3><FormattedMessage id="scripts.subtitle"/></h3>
          </div>
          {!this.state.scripts.length && <Preloader/>}
          <div id="scripts">
            {this.state.scripts.map((item,i) =>
              <div className="animatable fadeInUp" key={i}>
                <div className="d-flex scripts">
                  {i%2===0 &&
                    <Link to={ intl.formatMessage({ id: 'nav.link.script' })+"/"+item.url} title={item.name} className="scripts--half scripts--image">
                      <LazyLoad height={300} width={450} offsetVertical={300} loaderImage imageProps={{
                        src: "/upload/scripts/"+item.url+"/"+item.url+".jpg",
                        alt: item.name,
                        ref: "image"
                      }} />
                    </Link>
                  }
                  <div className="scripts--description scripts--half text-center">
                    <Link to={ intl.formatMessage({ id: 'nav.link.script' })+"/"+item.url} title={item.name}><h2>{item.name}</h2></Link>
                    <hr />
                    <p>{item.description[language]}</p>
                    <br />
                    <Link to={ intl.formatMessage({ id: 'nav.link.script' })+"/"+item.url} title={item.name}><h4><FormattedMessage id="scripts.see"/></h4></Link>
                  </div>
                  {i%2===1 &&
                    <Link to={ intl.formatMessage({ id: 'nav.link.script' })+"/"+item.url} title={item.name} className="scripts--half scripts--image">
                      <LazyLoad height={300} width={450} offsetVertical={300} loaderImage imageProps={{
                        src: "/upload/scripts/"+item.url+"/"+item.url+".jpg",
                        alt: item.name,
                        ref: "image"
                      }} />
                    </Link>
                  }
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    );
  }
}

export default injectIntl(Scripts);
