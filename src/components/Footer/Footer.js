import React, { Component } from "react";
import { injectIntl, FormattedMessage } from "react-intl";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookSquare, faLinkedin, faXTwitter, faGithub, faHackerrank, faFreeCodeCamp, faStackOverflow } from "@fortawesome/free-brands-svg-icons";
import { faPenSquare, faShoppingBasket, faCode, faEnvelope } from "@fortawesome/free-solid-svg-icons";

import "./Footer.scss";

class Footer extends Component {
  render() {
    const intl = this.props.intl;
    return (
      <>
        <footer className="footer">
          <div className="container d-flex">
            <div className="footer--top">
              <FormattedMessage
                id="footer.text"
                values={{
                  p: (chunks) => <p>{chunks}</p>,
                  a: (chunks) => (
                    <a href="https://sklep.itworksbetter.net/" title="IT Works Better" target="_blank" rel="nofollow noopener noreferrer">
                      {chunks}
                    </a>
                  ),
                  breakingLine: <br />,
                }}
              />
            </div>
            <div className="footer--top text-center">
              <p>
                <FontAwesomeIcon icon={faEnvelope} />{" "}
                <a href="mailto:kamil@wyremski.pl" title={intl.formatMessage({ id: "footer.write_to_me" })}>
                  kamil@wyremski.pl
                </a>
              </p>
              <p>
                <a href="https://blog.wyremski.pl/polityka-prywatnosci/" title={intl.formatMessage({ id: "privacy_policy" })} target="_blank" rel="noopener noreferrer">
                  <FormattedMessage id="privacy_policy" />
                </a>
              </p>
            </div>
            <div className="footer--top text-center">
              <div itemScope itemType="http://schema.org/Organization" className="footer--social">
                <link itemProp="url" href="https://wyremski.pl" />
                <a href="https://www.facebook.com/wyremskipl/" title={intl.formatMessage({ id: "footer.facebook" })} target="_blank" rel="noopener noreferrer" itemProp="sameAs">
                  <FontAwesomeIcon icon={faFacebookSquare} />
                  <span className="sr-only">
                    <FormattedMessage id="footer.facebook" />
                  </span>
                </a>
                <a href="https://linkedin.com/in/kamil-wyremski" title={intl.formatMessage({ id: "footer.linkedin" })} target="_blank" rel="noopener noreferrer" itemProp="sameAs">
                  <FontAwesomeIcon icon={faLinkedin} />
                  <span className="sr-only">
                    <FormattedMessage id="footer.linkedin" />
                  </span>
                </a>
                <a href="https://github.com/kamilwyremski" title={intl.formatMessage({ id: "footer.github" })} target="_blank" rel="noopener noreferrer" itemProp="sameAs">
                  <FontAwesomeIcon icon={faGithub} />
                  <span className="sr-only">
                    <FormattedMessage id="footer.github" />
                  </span>
                </a>
                <a href="https://www.hackerrank.com/kamil_wyremski" title={intl.formatMessage({ id: "footer.hackerrank" })} target="_blank" rel="noopener noreferrer" itemProp="sameAs">
                  <FontAwesomeIcon icon={faHackerrank} />
                  <span className="sr-only">
                    <FormattedMessage id="footer.hackerrank" />
                  </span>
                </a>
                <a href="https://www.freecodecamp.org/kamil.wyremski" title={intl.formatMessage({ id: "footer.freecodecamp" })} target="_blank" rel="publisher noopener noreferrer" itemProp="sameAs">
                  <FontAwesomeIcon icon={faFreeCodeCamp} />
                  <span className="sr-only">
                    <FormattedMessage id="footer.freecodecamp" />
                  </span>
                </a>
                <a href="https://www.codewars.com/users/kamilwyremski" title={intl.formatMessage({ id: "footer.codewars" })} target="_blank" rel="noopener noreferrer" itemProp="sameAs">
                  <FontAwesomeIcon icon={faCode} />
                  <span className="sr-only">
                    <FormattedMessage id="footer.codewars" />
                  </span>
                </a>
                <a href="https://stackoverflow.com/users/8337251/kamil-wyremski" title={intl.formatMessage({ id: "footer.stackoverflow" })} target="_blank" rel="noopener noreferrer" itemProp="sameAs">
                  <FontAwesomeIcon icon={faStackOverflow} />
                  <span className="sr-only">
                    <FormattedMessage id="footer.stackoverflow" />
                  </span>
                </a>
                <a href="https://x.com/kamil_wyremski" title={intl.formatMessage({ id: "footer.x" })} target="_blank" rel="noopener noreferrer" itemProp="sameAs">
                  <FontAwesomeIcon icon={faXTwitter} />
                  <span className="sr-only">
                    <FormattedMessage id="footer.x" />
                  </span>
                </a>
                <a href="https://blog.wyremski.pl" title={intl.formatMessage({ id: "footer.blog" })} target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faPenSquare} />
                  <span className="sr-only">
                    <FormattedMessage id="footer.blog" />
                  </span>
                </a>
                <a href="https://sklep.itworksbetter.net/" title={intl.formatMessage({ id: "footer.shop" })} target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faShoppingBasket} />
                  <span className="sr-only">
                    <FormattedMessage id="footer.shop" />
                  </span>
                </a>
              </div>
            </div>
          </div>
          <div className="container text-center footer--bottom">
            <p>Copyright © 2013 - 2025 by Kamil Wyremski. All rights reserved</p>
          </div>
        </footer>
      </>
    );
  }
}

export default injectIntl(Footer);
