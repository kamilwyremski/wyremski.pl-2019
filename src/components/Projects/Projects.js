import React, { Component } from 'react';
import './Projects.css';
import {FormattedMessage} from 'react-intl';
import { language, messages, setMetaTags } from './../../Lang';
import LazyLoad from 'react-image-lazy-load';

class Projects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
    };
  }

  componentDidMount() {
    fetch('/json/projects.json')
      .then(response => response.json())
      .then(data => {
        this.setState({ projects: data.projects });
        window.scrollTo(0, 2);
      });
    let meta = {
      'title': messages[language]['projects.title']+' - '+messages[language]['home.title'],
      'description': messages[language]['projects.description'],
      'alternate_pl': messages['pl']['nav.link.projects'],
      'alternate_en': messages['en']['nav.link.projects']
    }
    setMetaTags(meta);
  }

  render() {
    return (
      <main>
        <div id="projects">
          <div className="container section text-center">
            <h1><FormattedMessage id="projects.title"/></h1>
            <h3><FormattedMessage id="projects.subtitle"/></h3>
          </div>
          <div className="d-flex" id="projects--list">
            {this.state.projects.map((item,i) =>
              <div key={i} className="project animatable fadeInUp" itemScope itemType="http://schema.org/Product">
                <a href={"http://" + item.url} title={item.name} target="_blank" rel="nofollow noopener noreferrer">
                  <LazyLoad height={350} offsetVertical={300} loaderImage imageProps={{
                    src: '/'+item.image,
                    alt: item.name,
                    ref: "image",
                    itemProp: "image"
                  }} />
                </a>
                <div className="project--description text-center">
                  <div>
                    <a href={"http://" + item.url} title={item.name} target="_blank" rel="nofollow noopener noreferrer"><h4 itemProp="name" className="text-uppercase">{item.name}</h4></a>
                    <p itemProp="description">{item.description[language]}</p>
                    <a href={"http://" + item.url} title={item.name} target="_blank" itemProp="url" rel="nofollow noopener noreferrer">{item.url}</a>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="container text-center section">
            <p>
              {this.state.projects.map((item,i,arr) => {
                if(arr.length - 1 === i)
                return <a href={"http://" + item.url} key={i} title={item.name} target="_blank" rel="nofollow noopener noreferrer">{item.name}</a>
                return <span key={i}><a href={"http://" + item.url} title={item.name} target="_blank" rel="nofollow noopener noreferrer">{item.name}</a>, </span>
              })}
            </p>
            <br />
            <p id="projects--thankyou"><FormattedMessage id="projects.thankyou"/></p>
            <p><FormattedMessage id="projects.thankyou2"/></p>
          </div>
        </div>
      </main>
    );
  }
}

export default Projects;
