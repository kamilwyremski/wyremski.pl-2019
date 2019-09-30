import React, { Component } from 'react';
import './Footer.scss';
import {FormattedMessage, FormattedHTMLMessage} from 'react-intl';
import { language, messages } from './../../Lang';

class Footer extends Component {
  constructor(props) {
    super();
    this.state = {
      show_privacy: false,
      cookies_accepted: false
    };
    this.escFunction = this.escFunction.bind(this);
  }

  componentDidMount() {
    this.setState({
      cookies_accepted: localStorage.cookies_accepted
    });
    document.addEventListener("keydown", this.escFunction, false);
  }

  escFunction(event){
    if(event.keyCode === 27) {
      this.closePrivacy();
    }
  }

  componentWillUnmount(){
    document.removeEventListener("keydown", this.escFunction, false);
  }

  clickOutsideModal = (event) => {
    if(event.target.id==="privacy_policy"){
      this.closePrivacy();
    }
  }

  closePrivacy = () => {
    this.setState({
      show_privacy: false
    });
    document.querySelector('body').classList.remove('modal-open');
  }

  onClickClosePrivacy = (event) => {
    this.closePrivacy();
    event.target.blur();
  }

  openPrivacy = () => {
    this.setState({
      show_privacy: true
    });
    document.querySelector('body').classList.add('modal-open');
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
              <p><button onClick={this.openPrivacy} className="link"><FormattedMessage id="privacy_policy"/></button></p>
          	</div>
        		<div className="footer--top text-center">
        			<div itemScope itemType="http://schema.org/Organization" id="footer--social">
        				<link itemProp="url" href="https://wyremski.pl" />
        				<a href="https://www.facebook.com/wyremskipl/" title={messages[language]['footer.facebook']} target="_blank" rel="noopener noreferrer" itemProp="sameAs">
                  <i className="icon-facebook-official"></i>
                  <span className="sr-only"><FormattedMessage id="footer.facebook"/></span>
                </a>
        				<a href="http://linkedin.com/in/kamil-wyremski" title={messages[language]['footer.linkedin']} target="_blank" rel="noopener noreferrer" itemProp="sameAs">
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
          <div className="container text-center">
            <p>Copyright © 2013 - 2019 by Kamil Wyremski. All rights reserved</p>
          </div>
        </footer>
        <div id="cookies-message" className={ this.state.cookies_accepted ? "" : "open"}>
          <span>
            <FormattedMessage id="cookies_message"/>
          </span>
          <button className="link" id="accept-cookies-checkbox" onClick={this.closeCookie}><FormattedMessage id="cookies_message.accept"/></button>
        </div>
        <div id="privacy_policy" onClick={this.clickOutsideModal} className={ this.state.show_privacy ? "open" : "" } role="dialog" aria-labelledby="privacy_policy_title">
          <div className="container">
            <div className="d-flex">
              <h3 id="privacy_policy_title"><FormattedMessage id="privacy_policy"/></h3>
              <button type="button" className="close link" onClick={this.onClickClosePrivacy} aria-label={messages[language]['privacy_policy.close']}><span aria-hidden="true">&times;</span></button>
            </div>
            <div><FormattedHTMLMessage id="privacy_policy.text" /></div>
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;
