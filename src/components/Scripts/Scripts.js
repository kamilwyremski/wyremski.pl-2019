import React, { Component } from "react";
import { Link } from "react-router-dom";
import { injectIntl, FormattedMessage } from "react-intl";
import Transitions from "../../Transition";
import scripts from "./scripts.json";

import "./Scripts.scss";

class Scripts extends Component {
  componentDidMount() {
    this.props.handleLanguage(this.props.language, "scripts");
  }

  render() {
    const language = this.props.language;
    const intl = this.props.intl;
    return (
      <main className="scripts">
        <Transitions>
          <section className="container" aria-labelledby="scripts-title">
            <div className="text-center section">
              <h1 className="display-4" id="scripts-title">
                <FormattedMessage id="scripts.title" />
              </h1>
              <h2 className="display-1">
                <FormattedMessage id="scripts.subtitle" />
              </h2>
            </div>
            <div id="scripts">
              {scripts.map((item, i) => (
                <div className={i < 2 ? "" : "animatable fadeInUp"} key={i}>
                  <div className="d-flex script">
                    {i % 2 === 0 && (
                      <Link
                        to={
                          intl.formatMessage({ id: "nav.link.script" }) +
                          "/" +
                          item.url
                        }
                        title={item.name}
                        className="scripts--half scripts--image"
                      >
                        <img
                          height="300"
                          width="450"
                          src={
                            "/upload/scripts/" +
                            item.url +
                            "/" +
                            item.url +
                            ".jpg"
                          }
                          alt={item.name}
                          ref="image"
                          className="img"
                          loading="lazy"
                        />
                      </Link>
                    )}
                    <div className="scripts--description scripts--half text-center">
                      <Link
                        to={
                          intl.formatMessage({ id: "nav.link.script" }) +
                          "/" +
                          item.url
                        }
                        title={item.name}
                      >
                        <h2>{item.name}</h2>
                      </Link>
                      <hr />
                      <p>{item.description[language]}</p>
                    </div>
                    {i % 2 === 1 && (
                      <Link
                        to={
                          intl.formatMessage({ id: "nav.link.script" }) +
                          "/" +
                          item.url
                        }
                        title={item.name}
                        className="scripts--half scripts--image"
                      >
                        <img
                          height="300"
                          width="450"
                          src={
                            "/upload/scripts/" +
                            item.url +
                            "/" +
                            item.url +
                            ".jpg"
                          }
                          alt={item.name}
                          ref="image"
                          className="img"
                          loading="lazy"
                        />
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </Transitions>
      </main>
    );
  }
}

export default injectIntl(Scripts);
