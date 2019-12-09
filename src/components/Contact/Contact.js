import React, { Component } from 'react';
import './Contact.scss';
import {FormattedMessage, FormattedHTMLMessage} from 'react-intl';
import ReCAPTCHA from "react-google-recaptcha";
import { language, messages, setMetaTags } from './../../Lang';

const recaptchaRef = React.createRef();

class Contact extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      email: '',
      subject: '',
      message: '',
      rules: false,
      alertEmail: false,
      alertSubject: false,
      alertMessage: false,
      alertRules: false,
      alertCaptcha: false,
      verifyCaptcha: false,
      messageSend: false,
      messageNoSend: false
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.verifyRecaptchaCallback = this.verifyRecaptchaCallback.bind(this);
  }

  componentDidMount() {
    let meta = {
      'title': messages[language]['contact.title']+' - '+messages[language]['home.title'],
      'description': messages[language]['contact.description'],
      'alternate_pl': messages['pl']['nav.link.contact'],
      'alternate_en': messages['en']['nav.link.contact']
    }
    setMetaTags(meta);
    recaptchaRef.current.execute();
  }

  verifyRecaptchaCallback(recaptchaToken) {
    var data = new FormData();
    data.append( "recaptchaToken", recaptchaToken );
    fetch('/contact.php', {
      method: 'post',
      body: data
    })
    .then((responseText) => responseText.json())
    .then((response) => this.setState({
      verifyCaptcha: response.status,
      alertCaptcha: false
    }));
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
    switch (name) {
      case "email":
        if(this.validateEmail(value)){
          this.setState({alertEmail: false});
        }else{
          this.setState({alertEmail: true});
        }
        break;
      case "subject":
        if(value){
          this.setState({alertSubject: false});
        }else{
          this.setState({alertSubject: true});
        }
        break;
      case "message":
        if(value){
          this.setState({alertMessage: false});
        }else{
          this.setState({alertMessage: true});
        }
        break;
      case "rules":
        if(value){
          this.setState({alertRules: false});
        }else{
          this.setState({alertRules: true});
        }
        break;
      default:
    }
  }

  handleSubmit(event) {
    event.target.blur();
    let is_valid = true;
    this.setState({
      alertEmail: false,
      alertSubject: false,
      alertMessage: false,
      alertRules: false,
      alertCaptcha: false,
      messageSend: false,
      messageNoSend: false,
      showPreloader: false
    })
    if(!this.validateEmail(this.state.email)){
      this.setState({alertEmail: true});
      is_valid = false;
    }
    if(!this.state.subject){
      this.setState({alertSubject: true});
      is_valid = false;
    }
    if(!this.state.message){
      this.setState({alertMessage: true});
      is_valid = false;
    }
    if(!this.state.rules){
      this.setState({alertRules: true});
      is_valid = false;
    }
    this.setState({
      showPreloader: is_valid
    })
    if(!this.state.verifyCaptcha){
      this.setState({alertCaptcha: true});
      is_valid = false;
    }
    if(is_valid){
      var data = new FormData();
      data.append( "email", this.state.email );
      data.append( "subject", this.state.subject );
      data.append( "message", this.state.message );
      fetch('/contact.php', {
        method: 'post',
        body: data
      })
      .then((responseText) => responseText.json())
      .then((response) => {
        if(response.status){
          this.setState({
            messageSend: true,
            email: '',
            subject: '',
            message: '',
            rules: false,
            showPreloader: false
          });
        }else{
          this.setState({
            messageNoSend: true,
            showPreloader: false
          });
        }
      });
    }
    event.preventDefault();
  }

  validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  onClickContactSubmit = (event) => {
    event.currentTarget.blur();
  }

  render() {
    return (
      <main>
        <div id="contact">
          <div className="container section">
            <div className="text-center">
              <h1><FormattedMessage id="contact.title"/></h1>
              <br />
              <p><FormattedHTMLMessage id="contact.subtitle"/></p>
            </div>
            <br />
            <form method="post" onSubmit={this.handleSubmit} id="contact--form">
              <input type="hidden" name="action" value="send_message" />
              <div className="row">
                <label htmlFor="contact--email" className="col-form-label"><FormattedMessage id="contact.email"/></label>
                <div className="col">
                  <input type="email" 
                    className="form-control" 
                    id="contact--email" 
                    name="email" 
                    placeholder="example@domain.com" 
                    value={this.state.email} 
                    onChange={this.handleInputChange}
                    aria-required="true"
                    aria-label={messages[language]['contact.email']}
                    aria-invalid={this.state.alertEmail}
                    aria-describedby="contact--alert--email"
                  />
                  <p className={this.state.alertEmail ? 'invalid-feedback' : 'hidden'} id="contact--alert--email"><FormattedMessage id="contact.alertEmail"/></p>
                  <p><FormattedMessage id="contact.email.info"/></p>
                </div>
              </div>
              <div className="row">
                <label htmlFor="contact--subject" className="col-form-label"><FormattedMessage id="contact.subject"/></label>
                <div className="col">
                  <input type="text" 
                    className="form-control" 
                    id="contact--subject" 
                    name="subject" 
                    value={this.state.subject} 
                    onChange={this.handleInputChange} 
                    aria-required="true" 
                    aria-label={messages[language]['contact.subject']}
                    aria-invalid={this.state.alertSubject}
                    aria-describedby="contact--alert--subject"
                  />
                  <p className={this.state.alertSubject ? 'invalid-feedback' : 'hidden'} id="contact--alert--subject"><FormattedMessage id="contact.alertSubject"/></p>
                </div>
              </div>
              <div className="row">
                <label htmlFor="contact--message" className="col-form-label"><FormattedMessage id="contact.message"/></label>
                <div className="col">
                  <textarea className="form-control" 
                    rows="4" 
                    name="message" 
                    id="contact--message" 
                    value={this.state.message} 
                    onChange={this.handleInputChange} 
                    aria-required="true" 
                    aria-label={messages[language]['contact.message']}
                    aria-invalid={this.state.alertMessage}
                    aria-describedby="contact--alert--message"
                  ></textarea>
                  <p className={this.state.alertMessage ? 'invalid-feedback' : 'hidden'} id="contact--alert--message"><FormattedMessage id="contact.alertMessage"/></p>
                </div>
              </div>
              <div className="row">
                <label className="col-form-label">&nbsp;</label>
                <div className="col">
                  <label className="label-checkbox">
                    <input type="checkbox" 
                      name="rules" 
                      checked={this.state.rules} 
                      onChange={this.handleInputChange} 
                      aria-label={messages[language]['contact.privacy']}
                      aria-invalid={this.state.alertRules}
                      aria-describedby="contact--alert--rules"
                    />
                    <span className="checkmark"></span> <FormattedMessage id="contact.privacy"/> <a href="https://blog.wyremski.pl/polityka-prywatnosci/" title={messages[language]['contact.privacy.link']} target="_blank" rel="noopener noreferrer"><FormattedMessage id="contact.privacy.link"/></a>
                  </label>
                  <p className={this.state.alertRules ? 'invalid-feedback' : 'hidden'} id="contact--alert--rules"><FormattedMessage id="contact.alertRules"/></p>
                </div>
              </div>
              <div className="row">
                <label className="col-form-label">&nbsp;</label>
                <div className="col">
                  <button name="contact--submit" type="submit" className="btn btn-primary" onClick={this.onClickContactSubmit}><FormattedMessage id="contact.send"/></button>
                  <div className={this.state.showPreloader ? '' : 'hidden'} >
                    <div className="preloader d-flex" id="contact--preloader">
                      <div className="cssload-container">
                        <div className="cssload-loading"><i></i><i></i><i></i><i></i></div>
                      </div>
                    </div>
                  </div>
                  <p className={this.state.alertCaptcha ? 'invalid-feedback' : 'hidden'}><FormattedMessage id="contact.alertCaptcha"/></p>
                  <br />
                  <h4 className={this.state.messageSend ? 'alert-success' : 'hidden'} role="alert"><FormattedMessage id="contact.messageSend"/></h4>
                  <h4 className={this.state.messageNoSend ? 'alert-danger' : 'hidden'} role="alert"><FormattedMessage id="contact.messageNoSend"/></h4>
                </div>
              </div>
              <ReCAPTCHA
                ref={recaptchaRef}
                size="invisible"
                sitekey="6Ld66YAUAAAAACgwCy8Nv91JIeiXb4lzQnEKLvey"
                onChange={this.verifyRecaptchaCallback}
              />
            </form>
          </div>
        </div>
      </main>
    );
  }
}

export default Contact;
