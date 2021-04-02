import React, { Component } from 'react';
import './Error404.scss';

class Error404 extends Component {

  componentDidMount() {
    console.log(this.props.language);
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
            <h3>Error 404</h3>
            <br />
            <p>The page you are looking for has been moved, deleted, or simply never existed.</p>
          </div>
        </div>
      </main>
    );
  }
}

export default Error404;
