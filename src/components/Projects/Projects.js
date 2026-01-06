import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import Transitions from "../../Transition";
import projects from "./projects.json";
import "./Projects.scss";

class Projects extends Component {

  constructor(props) {
    super(props);
    this.imageRef = React.createRef();
  }

  componentDidMount() {
    this.props.handleLanguage(this.props.language, "projects");
  }

  render() {
    const language = this.props.language;
    return (
      <main>
        <Transitions>
          <section className="projects" aria-labelledby="projects-title">
            <div className="container section text-center">
              <h1 className="display-4" id="projects-title">
                <FormattedMessage id="projects.title" />
              </h1>
              <h2 className="display-1 content">
                <FormattedMessage id="projects.subtitle" />
              </h2>
            </div>
            <div className="d-flex projects--list">
              {projects.map((item, i) => (
                <a
                  href={"http://" + item.url}
                  title={item.name}
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  key={i}
                  className={i < 8 ? "project" : "project animatable fadeInUp"}
                  itemScope
                  itemType="http://schema.org/CollectionPage"
                >
                  <img
                    height="350"
                    width="350"
                    src={"/upload/projects/" + item.image}
                    alt={item.name}
                    ref={this.imageRef}
                    itemProp="image"
                    className="img"
                    loading={i > 3 ? "lazy" : "eager"}
                  />
                  <div className="project--description text-center">
                    <div>
                      <h4 itemProp="name" className="text-uppercase">
                        {item.name}
                      </h4>
                      <p itemProp="description">{item.description[language]}</p>
                      <p className="project--description--link">{item.url}</p>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </section>
          <div className="text-center section container projects--thankyou">
            <p>
              {projects.map((item, i, arr) => {
                if (arr.length - 1 === i)
                  return (
                    <a
                      href={"http://" + item.url}
                      key={i}
                      title={item.name}
                      target="_blank"
                      rel="nofollow noopener noreferrer"
                    >
                      {item.name}
                    </a>
                  );
                return (
                  <span key={i}>
                    <a
                      href={"http://" + item.url}
                      title={item.name}
                      target="_blank"
                      rel="nofollow noopener noreferrer"
                    >
                      {item.name}
                    </a>
                    ,{" "}
                  </span>
                );
              })}
            </p>
            <br />
            <p className="big">
              <FormattedMessage id="projects.thankyou" />
            </p>
            <p>
              <FormattedMessage id="projects.thankyou2" />
            </p>
          </div>
        </Transitions>
      </main>
    );
  }
}

export default Projects;
