import React, { Component } from "react";
import { FormattedMessage, injectIntl } from "react-intl";
import Transitions from "../../Transition";
import projects from "./projects.json";
import "./Projects.scss";
import { useParams } from "react-router-dom";

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
                    alt={this.props.intl.formatMessage({ id: "projects.title" }) + " " +item.name}
                    ref={this.imageRef}
                    itemProp="image"
                    className="img"
                    loading={i > 3 ? "lazy" : "eager"}
                  />
                  <div className="project--description text-center">
                    <div>
                      <h3 itemProp="name" className="text-uppercase">
                        {item.name}
                      </h3>
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
            <h3 className="big">
              <FormattedMessage id="projects.thankyou" />
            </h3>
            <p>
              <FormattedMessage id="projects.thankyou2" />
            </p>
          </div>
        </Transitions>
      </main>
    );
  }
}

export default injectIntl((props) => (
  <Projects {...props} params={useParams()} />
));
