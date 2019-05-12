import React, { Component } from 'react';
import './Contact.css';
import {FormattedMessage, FormattedHTMLMessage} from 'react-intl';
import { ReCaptcha } from 'react-recaptcha-google';
import { language, messages, setMetaTags } from './../../Lang';

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
    this.onLoadRecaptcha = this.onLoadRecaptcha.bind(this);
    this.verifyCallback = this.verifyCallback.bind(this);
  }

  componentDidMount() {
    if (this.captchaDemo) {
      this.captchaDemo.reset();
      this.captchaDemo.execute();
    }
    let meta = {
      'title': messages[language]['contact.title']+' - '+messages[language]['home.title'],
      'description': messages[language]['contact.description'],
      'alternate_pl': messages['pl']['nav.link.contact'],
      'alternate_en': messages['en']['nav.link.contact']
    }
    setMetaTags(meta);
    window.scrollTo(0, 0);
  }

  onLoadRecaptcha() {
    if (this.captchaDemo) {
      this.captchaDemo.reset();
      this.captchaDemo.execute();
    }
  }

  verifyCallback(recaptchaToken) {
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
    let is_valid = true;
    this.setState({
      alertEmail: false,
      alertSubject: false,
      alertMessage: false,
      alertRules: false,
      alertCaptcha: false,
      messageSend: false,
      messageNoSend: false
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
            rules: false
          });
        }else{
          this.setState({
            messageNoSend: true
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
                <label htmlFor="email" className="col-form-label"><FormattedMessage id="contact.email"/></label>
                <div className="col">
                  <input type="email" className="form-control" id="email" name="email" placeholder="example@domain.com" value={this.state.email} onChange={this.handleInputChange}/>
                  <p className={this.state.alertEmail ? 'invalid-feedback' : 'hidden'}><FormattedMessage id="contact.alertEmail"/></p>
                  <p><FormattedMessage id="contact.email.info"/></p>
                </div>
              </div>
              <div className="row">
                <label htmlFor="subject" className="col-form-label"><FormattedMessage id="contact.subject"/></label>
                <div className="col">
                  <input type="text" className="form-control" id="subject" name="subject" value={this.state.subject} onChange={this.handleInputChange}/>
                  <p className={this.state.alertSubject ? 'invalid-feedback' : 'hidden'}><FormattedMessage id="contact.alertSubject"/></p>
                </div>
              </div>
              <div className="row">
                <label htmlFor="message" className="col-form-label"><FormattedMessage id="contact.message"/></label>
                <div className="col">
                  <textarea className="form-control" rows="4" name="message" id="message" value={this.state.message} onChange={this.handleInputChange}></textarea>
                  <p className={this.state.alertMessage ? 'invalid-feedback' : 'hidden'}><FormattedMessage id="contact.alertMessage"/></p>
                </div>
              </div>
              <div className="row">
                <label className="col-form-label">&nbsp;</label>
                <div className="col">
                  <label className="label-checkbox"><input type="checkbox" name="rules" checked={this.state.rules} onChange={this.handleInputChange}/><span className="checkmark"></span> <FormattedMessage id="contact.privacy"/></label>
                  <p className={this.state.alertRules ? 'invalid-feedback' : 'hidden'}><FormattedMessage id="contact.alertRules"/></p>
                </div>
              </div>
              <div className="row">
                <label className="col-form-label">&nbsp;</label>
                <div className="col">
                  <button name="submit" type="submit" className="btn btn-primary"><FormattedMessage id="contact.send"/></button>
                  <p className={this.state.alertCaptcha ? 'invalid-feedback' : 'hidden'}><FormattedMessage id="contact.alertCaptcha"/></p>
                  <br />
                  <h4 className={this.state.messageSend ? 'alert-success' : 'hidden'}><FormattedMessage id="contact.messageSend"/></h4>
                  <h4 className={this.state.messageNoSend ? 'alert-danger' : 'hidden'}><FormattedMessage id="contact.messageNoSend"/></h4>
                </div>
              </div>
              <ReCaptcha
                ref={(el) => {this.captchaDemo = el;}}
                size="invisible"
                render="explicit"
                sitekey="6Ld66YAUAAAAACgwCy8Nv91JIeiXb4lzQnEKLvey"
                onloadCallback={this.onLoadRecaptcha}
                verifyCallback={this.verifyCallback}
              />
            </form>
          </div>
        </div>
      </main>
    );
  }
}

export default Contact;
