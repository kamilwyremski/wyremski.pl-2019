import React, { Component } from 'react';
import { Link } from "react-router-dom";
import {FormattedMessage} from 'react-intl';
import { language, messages, setMetaTags } from './../../Lang';
import './Scripts.scss';
import LazyLoad from 'react-image-lazy-load';

class Scripts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scripts: [],
    };
  }

  componentDidMount() {
    fetch('/json/scripts.json')
      .then(response => response.json())
      .then(data => {
        setTimeout(() => {
          this.setState({ scripts: data.scripts });
          if(!window.scrollY){
            window.scrollTo(0, 50);
            window.scrollTo(0, 0);
          }
        }, 100);
      }
    );
    let meta = {
      'title': messages[language]['scripts.title']+' - '+messages[language]['home.title'],
      'description': messages[language]['scripts.description'],
      'alternate_pl': messages['pl']['nav.link.scripts'],
      'alternate_en': messages['en']['nav.link.scripts']
    }
    setMetaTags(meta);
  }

  render() {
    return (
      <main>
        <div className="section container">
          <div className="section text-center">
            <h1><FormattedMessage id="scripts.title"/></h1>
            <h3><FormattedMessage id="scripts.subtitle"/></h3>
          </div>
          {!this.state.scripts.length &&
            <div className="preloader d-flex">
              <div className="cssload-container">
                <div className="cssload-loading"><i></i><i></i><i></i><i></i></div>
              </div>
            </div>
          }
          <div id="scripts">
            {this.state.scripts.map((item,i) =>
              <div className="animatable fadeInUp" key={i}>
                <div className="d-flex scripts" itemScope itemType="http://schema.org/Product">
                  {i%2===0 &&
                    <Link to={messages[language]['nav.link.script']+"/"+item.url} title={item.name} className="scripts--half scripts--image">
                      <LazyLoad height={300} width={450} offsetVertical={300} loaderImage imageProps={{
                        src: "/upload/scripts/"+item.url+"/"+item.url+".jpg",
                        alt: item.name,
                        ref: "image",
                        itemProp: "image"
                      }} />
                    </Link>
                  }
                  <div className="scripts--description scripts--half text-center">
                    <Link to={messages[language]['nav.link.script']+"/"+item.url} title={item.name}><h2 itemProp="name">{item.name}</h2></Link>
                    <hr />
                    <p itemProp="description">{item.description[language]}</p>
                    <br />
                    <Link to={messages[language]['nav.link.script']+"/"+item.url} title={item.name} itemProp="url"><h4><FormattedMessage id="scripts.see"/></h4></Link>
                  </div>
                  {i%2===1 &&
                    <Link to={messages[language]['nav.link.script']+"/"+item.url} title={item.name} className="scripts--half scripts--image">
                      <LazyLoad height={300} width={450} offsetVertical={300} loaderImage imageProps={{
                        src: "/upload/scripts/"+item.url+"/"+item.url+".jpg",
                        alt: item.name,
                        ref: "image",
                        itemProp: "image"
                      }} />
                    </Link>
                  }
                </div>
                <div itemProp="aggregateRating" itemScope itemType="http://schema.org/AggregateRating" className="script--rating">
                  <span itemProp="ratingValue">{item.ratingValue}</span>
                  <span itemProp="bestRating">5</span>
                  <span itemProp="ratingCount">{item.ratingCount}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    );
  }
}

export default Scripts;
