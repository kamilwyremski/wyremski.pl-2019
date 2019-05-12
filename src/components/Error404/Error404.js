import React, { Component } from 'react';
import './Error404.css';
import { language, messages, setMetaTags } from './../../Lang';
import {FormattedMessage} from 'react-intl';

class Error404 extends Component {

  componentDidMount() {
    let meta = {
      'title': messages[language]['error404.title']+' - '+messages[language]['home.title'],
      'description': messages[language]['error404.title']
    }
    setMetaTags(meta);
  }

  render() {
    return (
      <main>
        <div id="error404">
          <div className="text-center section">
            <h1>4<span className="error404--tag">&lt;/&gt;</span>4</h1>
            <p id="error404--code"><span className="error404--color1">Error404</span>(){'{'}<br />&nbsp;&nbsp;<span className="error404--color2">message</span> = "<span className="error404--color3">page not found</span>";<br />{'}'};</p>
            <br /><br /><br />
            <h3><FormattedMessage id="error404.title"/></h3>
            <br />
            <p><FormattedMessage id="error404.description"/></p>
          </div>
        </div>
      </main>
    );
  }
}

export default Error404;
