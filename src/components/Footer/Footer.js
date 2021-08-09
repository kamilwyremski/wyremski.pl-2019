import React, { Component } from 'react';
import {injectIntl, FormattedMessage} from 'react-intl';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookSquare, faLinkedin, faTwitterSquare, faPinterest, faGithub, faHackerrank, faFreeCodeCamp, faStackOverflow, faWhatsapp, faSkype } from '@fortawesome/free-brands-svg-icons'
import { faBlog, faShoppingBasket, faCode, faEnvelope } from '@fortawesome/free-solid-svg-icons';

import './Footer.scss';


class Footer extends Component {
  constructor({intl, ...props}) {
    super();
    this.state = {
      cookies_accepted: false
    };
    this.keyFunction = this.keyFunction.bind(this);
  }

  keyFunction(event){
    if(event.keyCode === 84) {
      this.closeCookie();
    }
  }

  componentDidMount() {
    this.setState({
      cookies_accepted: localStorage.cookies_accepted
    });
    document.addEventListener("keydown", this.keyFunction, false);
  }

  componentWillUnmount(){
    document.removeEventListener("keydown", this.keyFunction, false);
  }

  closeCookie = () => {
    this.setState({
      cookies_accepted: true
    });
    localStorage.cookies_accepted = true;
  }

  render() {
    const intl = this.props.intl;
    return (
      <>
        <footer className="footer">
          <div className="container d-flex">
            <div className="footer--top">
              <FormattedMessage id="footer.text" values={{
                p: chunks => <p>{chunks}</p>,
                a: chunks => <a href="https://sklep.itworksbetter.net/" title="IT Works Better" target="_blank" rel="nofollow noopener noreferrer">{chunks}</a>,
                breakingLine: <br />
              }}/>
            </div>
            <div className="footer--top text-center">
              <p><FontAwesomeIcon icon={faEnvelope} /> <a href="mailto:kamil@wyremski.pl" title={ intl.formatMessage({ id: 'footer.write_to_me' })}>kamil@wyremski.pl</a></p>
              <p><FontAwesomeIcon icon={faSkype} /> <a href="skype:kamil.wyremski" title={ intl.formatMessage({ id: 'footer.skype' })}>kamil.wyremski</a></p>
              <p><FontAwesomeIcon icon={faWhatsapp} /> <a href="tel:+48692413725" title={ intl.formatMessage({ id: 'footer.phone' })}>+48 692413725</a></p>
              <p><a href="https://blog.wyremski.pl/polityka-prywatnosci/" title={ intl.formatMessage({ id: 'privacy_policy' })} target="_blank" rel="noopener noreferrer"><FormattedMessage id="privacy_policy"/></a></p>
          	</div>
        		<div className="footer--top text-center">
        			<div itemScope itemType="http://schema.org/Organization" className="footer--social">
        				<link itemProp="url" href="https://wyremski.pl" />
        				<a href="https://www.facebook.com/wyremskipl/" title={ intl.formatMessage({ id: 'footer.facebook' })} target="_blank" rel="noopener noreferrer" itemProp="sameAs">
                  <FontAwesomeIcon icon={faFacebookSquare} />
                  <span className="sr-only"><FormattedMessage id="footer.facebook"/></span>
                </a>
        				<a href="https://linkedin.com/in/kamil-wyremski" title={ intl.formatMessage({ id: 'footer.linkedin' })} target="_blank" rel="noopener noreferrer" itemProp="sameAs">
                  <FontAwesomeIcon icon={faLinkedin} />
                  <span className="sr-only"><FormattedMessage id="footer.linkedin"/></span>
                </a>
                <a href="https://github.com/kamilwyremski" title={ intl.formatMessage({ id: 'footer.github' })} target="_blank" rel="noopener noreferrer" itemProp="sameAs">
                  <FontAwesomeIcon icon={faGithub} />
                  <span className="sr-only"><FormattedMessage id="footer.github"/></span>
                </a>
                <a href="https://www.hackerrank.com/kamil_wyremski" title={ intl.formatMessage({ id: 'footer.hackerrank' })} target="_blank" rel="noopener noreferrer" itemProp="sameAs">
                  <FontAwesomeIcon icon={faHackerrank} />
                  <span className="sr-only"><FormattedMessage id="footer.hackerrank"/></span>
                </a>
                <a href="https://www.freecodecamp.org/kamil.wyremski" title={ intl.formatMessage({ id: 'footer.freecodecamp' })} target="_blank" rel="publisher noopener noreferrer" itemProp="sameAs">
                  <FontAwesomeIcon icon={faFreeCodeCamp} />
                  <span className="sr-only"><FormattedMessage id="footer.freecodecamp"/></span>
                </a>
                <a href="https://www.codewars.com/users/kamilwyremski" title={ intl.formatMessage({ id: 'footer.codewars' })} target="_blank" rel="noopener noreferrer" itemProp="sameAs">
                  <FontAwesomeIcon icon={faCode} />
                  <span className="sr-only"><FormattedMessage id="footer.codewars"/></span>
                </a>
                <a href="https://stackoverflow.com/users/8337251/kamil-wyremski" title={ intl.formatMessage({ id: 'footer.stackoverflow' })} target="_blank" rel="noopener noreferrer" itemProp="sameAs">
                  <FontAwesomeIcon icon={faStackOverflow} />
                  <span className="sr-only"><FormattedMessage id="footer.stackoverflow"/></span>
                </a>
        				<a href="https://twitter.com/kamil_wyremski" title={ intl.formatMessage({ id: 'footer.twitter' })} target="_blank" rel="noopener noreferrer" itemProp="sameAs">
                  <FontAwesomeIcon icon={faTwitterSquare} />
                  <span className="sr-only"><FormattedMessage id="footer.twitter"/></span>
                </a>
        				<a href="https://pl.pinterest.com/kamilwyremski/" title={ intl.formatMessage({ id: 'footer.pinterest' })} target="_blank" rel="noopener noreferrer" itemProp="sameAs">
                  <FontAwesomeIcon icon={faPinterest} />
                  <span className="sr-only"><FormattedMessage id="footer.pinterest"/></span>
                </a>
        				<a href="https://blog.wyremski.pl" title={ intl.formatMessage({ id: 'footer.blog' })} target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faBlog} />
                  <span className="sr-only"><FormattedMessage id="footer.blog"/></span>
                </a>
                <a href="https://sklep.itworksbetter.net/" title={ intl.formatMessage({ id: 'footer.shop' })} target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faShoppingBasket} />
                  <span className="sr-only"><FormattedMessage id="footer.shop"/></span>
                </a>
              </div>
            </div>
          </div>
          <div className="container text-center footer--bottom">
            <p>Copyright © 2013 - 2021 by Kamil Wyremski. All rights reserved</p>
          </div>
        </footer>
        <div className={ this.state.cookies_accepted ? "cookies-message" : "cookies-message open"}>
          <p><FormattedMessage id="cookies_message"/></p>
          <p><FormattedMessage id="cookies_message.bottom"/> <a href="https://blog.wyremski.pl/polityka-prywatnosci/" title={ intl.formatMessage({ id: 'cookies_message.privacy_policy' })} target="_blank" rel="noopener noreferrer"><FormattedMessage id="cookies_message.privacy_policy"/></a></p>
          <button className="link accept-cookies-checkbox" onClick={this.closeCookie}><FormattedMessage id="cookies_message.accept"/></button>
        </div>
      </>
    );
  }
}

export default injectIntl(Footer);
