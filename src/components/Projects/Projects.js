import React, { Component } from 'react';
import {FormattedMessage} from 'react-intl';
import LazyLoad from 'react-image-lazy-load';
import projects from './projects.json';

import './Projects.scss';

class Projects extends Component {
  constructor(props) {
    super();
    this.state = {
      projects: [],
    };
  }

  componentDidMount() {
    this.setState({ projects: projects });
    this.props.handleLanguage(this.props.language,'projects');
  }

  render() {
    const language = this.props.language;
    return (
      <main>
        <div className="projects">
          <div className="container section text-center">
            <h1 className="display-4"><FormattedMessage id="projects.title"/></h1>
            <br />
            <h3 className="display-1 content"><FormattedMessage id="projects.subtitle"/></h3>
          </div>
          <div className="d-flex projects--list">
            {this.state.projects.map((item,i) =>
              <a href={"http://" + item.url} title={item.name} target="_blank" rel="nofollow noopener noreferrer" key={i} className={ i<4 ? "project" : "project animatable fadeInUp"} itemScope itemType="http://schema.org/CollectionPage">
                <LazyLoad height={350} imageProps={{
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
        <div className="text-center section container projects--thankyou">
          <p>
            {this.state.projects.map((item,i,arr) => {
              if(arr.length - 1 === i)
              return <a href={"http://" + item.url} key={i} title={item.name} target="_blank" rel="nofollow noopener noreferrer">{item.name}</a>
              return <span key={i}><a href={"http://" + item.url} title={item.name} target="_blank" rel="nofollow noopener noreferrer">{item.name}</a>, </span>
            })}
          </p>
          <br />
          <p className="big"><FormattedMessage id="projects.thankyou"/></p>
          <p><FormattedMessage id="projects.thankyou2"/></p>
        </div>
      </main>
    );
  }
}

export default Projects;
