import React, { Component } from 'react';
import { Link } from "react-router-dom";
import {injectIntl,FormattedMessage} from 'react-intl';
import LazyLoad from 'react-image-lazy-load';
import scripts from './scripts.json';

import './Scripts.scss';

class Scripts extends Component {
  constructor({intl, ...props}) {
    super();
    this.state = {
      scripts: []
    };
  }

  componentDidMount() {
    this.setState({ scripts: scripts });
    this.props.handleLanguage(this.props.language,'scripts');
  }

  render() {
    const language = this.props.language;
    const intl = this.props.intl;
    return (
      <main className="scripts">
        <div className="container">
          <div className="text-center section">
            <h1 className="display-4"><FormattedMessage id="scripts.title"/></h1>
            <h3 className="display-1"><FormattedMessage id="scripts.subtitle"/></h3>
          </div>
          <div id="scripts">
            {this.state.scripts.map((item,i) =>
              <div className={ i<2 ? "" : "animatable fadeInUp"} key={i}>
                <div className="d-flex script">
                  {i%2===0 &&
                    <Link to={ intl.formatMessage({ id: 'nav.link.script' })+"/"+item.url} title={item.name} className="scripts--half scripts--image">
                      <LazyLoad height={300} width={450} imageProps={{
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
