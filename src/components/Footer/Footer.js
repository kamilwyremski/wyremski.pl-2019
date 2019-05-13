import React, { Component } from 'react';
import './Footer.css';
import {FormattedMessage, FormattedHTMLMessage} from 'react-intl';

class Footer extends Component {
  constructor(props) {
    super();
    this.state = {
      show_privacy: false,
      cookies_accepted: false
    };
  }

  componentDidMount() {
    this.setState({
      cookies_accepted: localStorage.cookies_accepted
    });
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
        	<div className="container d-flex" id="footer--top">
        		<div className="footer--top">
        			<p>Kamil Wyremski</p>
        			<FormattedHTMLMessage id="footer.text"/>
        		</div>
        		<div className="footer--top text-center">
        			<p><i className="icon-mail-alt"></i> <a href="mailto:kamil.wyremski@gmail.com" title="Write to me">kamil.wyremski@gmail.com</a></p>
        			<p><i className="icon-skype"></i> <a href="skype:kamil.wyremski" title="Call to me by Skype">kamil.wyremski</a></p>
              <p><i className="icon-whatsapp"></i> <a href="tel:+51990600447" title="Call to me by WhatsApp">+51 990600447</a></p>
              <p><button onClick={this.openPrivacy} className="link"><FormattedMessage id="privacy_policy"/></button></p>
          	</div>
        		<div className="footer--top text-center">
        			<div itemScope itemType="http://schema.org/Organization" id="footer--social">
        				<link itemProp="url" href="https://wyremski.pl" />
        				<a href="https://www.facebook.com/wyremskipl/" title="My profile on Facebook" target="_blank" rel="noopener noreferrer" itemProp="sameAs"><i className="icon-facebook-official"></i></a>
        				<a href="http://linkedin.com/in/kamil-wyremski" title="View my profile on Linkedin!" target="_blank" rel="noopener noreferrer" itemProp="sameAs"><i className="icon-linkedin-squared"></i></a>
        				<a href="https://twitter.com/kamil_wyremski" title="My profile on Twitter" target="_blank" rel="noopener noreferrer" itemProp="sameAs"><i className="icon-twitter-squared"></i></a>
        				<a href="https://pl.pinterest.com/kamilwyremski/" title="My profile on Pinterest" target="_blank" rel="noopener noreferrer" itemProp="sameAs"><i className="icon-pinterest-squared"></i></a>
        				<a href="https://github.com/kamilwyremski" title="My profile on GitHub" target="_blank" rel="noopener noreferrer" itemProp="sameAs"><i className="icon-github-squared"></i></a>
        				<a href="https://www.youtube.com/channel/UCR1g4AKZ2Swr4YCApWQKkpQ" title="My profile on Youtube" target="_blank" rel="noopener noreferrer" itemProp="sameAs"><i className="icon-youtube-squared"></i></a>
                <a href="https://www.freecodecamp.org/kamil.wyremski" title="My profile on Free Code Camp" target="_blank" rel="publisher noopener noreferrer" itemProp="sameAs"><i className="icon-free-code-camp" style={{position: 'relative', left:'-3px'}}></i></a>
        				<a href="https://stackoverflow.com/users/8337251/kamil-wyremski" title="My profile on StackOverflow" target="_blank" rel="noopener noreferrer" itemProp="sameAs"><i className="icon-stackoverflow"></i></a>
        				<a href="https://blog.wyremski.pl" title="View my blog!" target="_blank" rel="noopener noreferrer"><i className="icon-link-ext-alt"></i></a>
                <a href="https://skrypty.sattel.pl" title="Online shop with web scripts" target="_blank" rel="noopener noreferrer"><i className="icon-shopping-basket" style={{fontSize: '0.85em',position: 'relative', top:'-3px'}}></i></a>
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
        <div id="privacy_policy" onClick={this.clickOutsideModal} className={ this.state.show_privacy ? "open" : "" }>
          <div id="privacy_policy--inside" className="container">
            <div className="d-flex">
    	        <h3><FormattedMessage id="privacy_policy"/></h3>
              <button type="button" className="close link" onClick={this.closePrivacy}><span aria-hidden="true">&times;</span></button>
            </div>
        		<div><FormattedHTMLMessage id="privacy_policy.text" /></div>
        	 </div>
        </div>
      </div>
    );
  }
}

export default Footer;
