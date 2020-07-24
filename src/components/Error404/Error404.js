import React, { Component } from 'react';
import './Error404.scss';
import {FormattedMessage} from 'react-intl';

class Error404 extends Component {

  constructor(props) {
    super();
  }

  componentDidMount() {
    this.props.handleLanguage(this.props.language,'error404');
  }

  render() {
    return (
      <main>
        <div className="error404">
          <div className="text-center section">
            <h1>4<span className="error404--tag">&lt;/&gt;</span>4</h1>
            <p className="error404--code"><span className="error404--color1">Error404</span>(){'{'}<br />&nbsp;&nbsp;<span className="error404--color2">message</span> = "<span className="error404--color3">page not found</span>";<br />{'}'};</p>
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
