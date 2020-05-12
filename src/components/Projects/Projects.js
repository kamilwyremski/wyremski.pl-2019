import React, { Component } from 'react';
import {FormattedMessage} from 'react-intl';
import LazyLoad from 'react-image-lazy-load';
import Preloader from './../Preloader/Preloader.js';

import './Projects.scss';

class Projects extends Component {
  constructor(props) {
    super();
    this.state = {
      projects: [],
    };
  }

  componentDidMount() {
    this.mounted = true;
    fetch('/json/projects.json')
      .then(response => response.json())
      .then(data => {
        if(this.mounted) {
          setTimeout(() => {
            this.setState({ projects: data.projects });
            if(!window.scrollY){
              window.scrollTo(0, 50);
              window.scrollTo(0, 0);
            }
          }, 100);
        }
      });
    this.props.handleLanguage(this.props.language,'projects');
  }

  componentWillUnmount(){
    this.mounted = false;
  }

  render() {
    const language = this.props.language;
    return (
      <main>
        <div id="projects">
          <div className="container section text-center">
            <h1><FormattedMessage id="projects.title"/></h1>
            <h3><FormattedMessage id="projects.subtitle"/></h3>
          </div>
          {!this.state.projects.length && <Preloader/>}
          <div id="projects--list" className="d-flex">
            {this.state.projects.map((item,i) =>
              <a href={"http://" + item.url} title={item.name} target="_blank" rel="nofollow noopener noreferrer" key={i} className="project" itemScope itemType="http://schema.org/CollectionPage">
                <LazyLoad height={350} offsetVertical={300} loaderImage imageProps={{
                  src: '/upload/projects/'+item.image,
                  alt: item.name,
                  ref: "image",
                  itemProp: "image"
                }} />
                <div className="project--description text-center">
                  <div>
                    <h4 itemProp="name" className="text-uppercase">{item.name}</h4>
                    <p itemProp="description">{item.description[language]}</p>
                    <p className="project--description--link">{item.url}</p>
                  </div>
                </div>
              </a>
            )}
          </div>
        </div>
        <div className="text-center section container" id="projects--thankyou--box">
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
      </main>
    );
  }
}

export default Projects;
