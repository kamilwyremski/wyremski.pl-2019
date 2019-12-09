import React, { Component } from 'react';
import './Footer.scss';
import {FormattedMessage, FormattedHTMLMessage} from 'react-intl';
import { language, messages } from './../../Lang';

class Footer extends Component {
  constructor(props) {
    super();
    this.state = {
      cookies_accepted: false
    };
  }

  componentDidMount() {
    this.setState({
      cookies_accepted: localStorage.cookies_accepted
    });
  }

  closeCookie = () => {
    this.setState({
      cookies_accepted: true
    });
    localStorage.cookies_accepted = true;
  }

  render() {
    return (
      <div>
        <footer id="footer">
          <div className="container d-flex footer--top--box">
            <div className="footer--top">
              <p>Kamil Wyremski</p>
              <FormattedHTMLMessage id="footer.text"/>
            </div>
            <div className="footer--top text-center">
              <p><i className="icon-mail-alt" aria-hidden="true"></i> <a href="mailto:kamil.wyremski@gmail.com" title={messages[language]['footer.write_to_me']}>kamil.wyremski@gmail.com</a></p>
              <p><i className="icon-skype" aria-hidden="true"></i> <a href="skype:kamil.wyremski" title={messages[language]['footer.skype']}>kamil.wyremski</a></p>
              <p><i className="icon-whatsapp" aria-hidden="true"></i> <a href="tel:+51990600447" title={messages[language]['footer.phone']}>+51 990600447</a></p>
              <p><a href="https://blog.wyremski.pl/polityka-prywatnosci/" title={messages[language]['privacy_policy']} target="_blank" rel="noopener noreferrer"><FormattedMessage id="privacy_policy"/></a></p>
          	</div>
        		<div className="footer--top text-center">
        			<div itemScope itemType="http://schema.org/Organization" id="footer--social">
        				<link itemProp="url" href="https://wyremski.pl" />
        				<a href="https://www.facebook.com/wyremskipl/" title={messages[language]['footer.facebook']} target="_blank" rel="noopener noreferrer" itemProp="sameAs">
                  <i className="icon-facebook-official"></i>
                  <span className="sr-only"><FormattedMessage id="footer.facebook"/></span>
                </a>
        				<a href="https://linkedin.com/in/kamil-wyremski" title={messages[language]['footer.linkedin']} target="_blank" rel="noopener noreferrer" itemProp="sameAs">
                  <i className="icon-linkedin-squared"></i>
                  <span className="sr-only"><FormattedMessage id="footer.linkedin"/></span>
                </a>
        				<a href="https://twitter.com/kamil_wyremski" title={messages[language]['footer.twitter']} target="_blank" rel="noopener noreferrer" itemProp="sameAs">
                  <i className="icon-twitter-squared"></i>
                  <span className="sr-only"><FormattedMessage id="footer.twitter"/></span>
                </a>
        				<a href="https://pl.pinterest.com/kamilwyremski/" title={messages[language]['footer.pinterest']} target="_blank" rel="noopener noreferrer" itemProp="sameAs">
                  <i className="icon-pinterest-squared"></i>
                  <span className="sr-only"><FormattedMessage id="footer.pinterest"/></span>
                </a>
        				<a href="https://github.com/kamilwyremski" title={messages[language]['footer.github']} target="_blank" rel="noopener noreferrer" itemProp="sameAs">
                  <i className="icon-github-squared"></i>
                  <span className="sr-only"><FormattedMessage id="footer.github"/></span>
                </a>
        				<a href="https://www.youtube.com/channel/UCR1g4AKZ2Swr4YCApWQKkpQ" title={messages[language]['footer.youtube']} target="_blank" rel="noopener noreferrer" itemProp="sameAs">
                  <i className="icon-youtube-squared"></i>
                  <span className="sr-only"><FormattedMessage id="footer.youtube"/></span>
                </a>
                <a href="https://www.freecodecamp.org/kamil.wyremski" title={messages[language]['footer.freecodecamp']} target="_blank" rel="publisher noopener noreferrer" itemProp="sameAs">
                  <i className="icon-free-code-camp" style={{position: 'relative', left:'-3px'}}></i>
                  <span className="sr-only"><FormattedMessage id="footer.freecodecamp"/></span>
                </a>
        				<a href="https://stackoverflow.com/users/8337251/kamil-wyremski" title={messages[language]['footer.stackoverflow']} target="_blank" rel="noopener noreferrer" itemProp="sameAs">
                  <i className="icon-stackoverflow"></i>
                  <span className="sr-only"><FormattedMessage id="footer.stackoverflow"/></span>
                </a>
        				<a href="https://blog.wyremski.pl" title={messages[language]['footer.blog']} target="_blank" rel="noopener noreferrer">
                  <i className="icon-link-ext-alt"></i>
                  <span className="sr-only"><FormattedMessage id="footer.blog"/></span>
                </a>
                <a href="https://skrypty.sattel.pl" title={messages[language]['footer.shop']} target="_blank" rel="noopener noreferrer">
                  <i className="icon-shopping-basket" style={{fontSize: '0.85em',position: 'relative', top:'-3px'}}></i>
                  <span className="sr-only"><FormattedMessage id="footer.shop"/></span>
                </a>
              </div>
            </div>
          </div>
          <div className="container text-center footer--bottom">
            <p>Copyright © 2013 - 2020 by Kamil Wyremski. All rights reserved</p>
          </div>
        </footer>
        <div id="cookies-message" className={ this.state.cookies_accepted ? "" : "open"}>
          <p><FormattedMessage id="cookies_message"/></p>
          <p><FormattedMessage id="cookies_message.bottom"/> <a href="https://blog.wyremski.pl/polityka-prywatnosci/" title={messages[language]['cookies_message.privacy_policy']} target="_blank" rel="noopener noreferrer"><FormattedMessage id="cookies_message.privacy_policy"/></a></p>
          <button className="link" id="accept-cookies-checkbox" onClick={this.closeCookie}><FormattedMessage id="cookies_message.accept"/></button>
        </div>
      </div>
    );
  }
}

export default Footer;
