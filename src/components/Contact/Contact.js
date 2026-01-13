import React, { Component } from "react";
import { injectIntl, FormattedMessage } from "react-intl";
import ReCAPTCHA from "react-google-recaptcha";
import Preloader from "./../Preloader/Preloader.js";
import Transitions from "../../Transition";

import "./Contact.scss";

const recaptchaRef = React.createRef();

class Contact extends Component {
  constructor({ intl, ...props }) {
    super();
    this.state = {
      email: "",
      subject: "",
      message: "",
      rules: false,
      alertEmail: false,
      alertSubject: false,
      alertMessage: false,
      alertRules: false,
      alertCaptcha: false,
      verifyCaptcha: false,
      messageSend: false,
      messageNoSend: false,
      showPreloader: false,
      errorMessage: "",
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.verifyRecaptchaCallback = this.verifyRecaptchaCallback.bind(this);
  }

  componentDidMount() {
    this.props.handleLanguage(this.props.language, "contact");
    recaptchaRef.current.execute();
  }

  verifyRecaptchaCallback(recaptchaToken) {
    let data = new FormData();
    data.append("recaptchaToken", recaptchaToken);
    fetch("/contact.php", {
      method: "post",
      body: data,
    })
      .then((responseText) => responseText.json())
      .then((response) =>
        this.setState({
          verifyCaptcha: response.status,
          alertCaptcha: false,
        })
      );
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
    switch (name) {
      case "email":
        this.setState({ alertEmail: !this.validateEmail(value) });
        break;
      case "subject":
        this.setState({ alertSubject: !value });
        break;
      case "message":
        this.setState({ alertMessage: !value });
        break;
      case "rules":
        this.setState({ alertRules: !value });
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
      showPreloader: false,
    });
    if (!this.validateEmail(this.state.email)) {
      this.setState({ alertEmail: true });
      is_valid = false;
    }
    if (!this.state.subject) {
      this.setState({ alertSubject: true });
      is_valid = false;
    }
    if (!this.state.message) {
      this.setState({ alertMessage: true });
      is_valid = false;
    }
    if (!this.state.rules) {
      this.setState({ alertRules: true });
      is_valid = false;
    }
    this.setState({
      showPreloader: is_valid,
    });
    if (!this.state.verifyCaptcha) {
      this.setState({ alertCaptcha: true });
      is_valid = false;
    }
    if (is_valid) {
      const data = new FormData();
      data.append("email", this.state.email);
      data.append("subject", this.state.subject);
      data.append("message", this.state.message);
      fetch("/contact.php", {
        method: "post",
        body: data,
      })
        .then((responseText) => responseText.json())
        .then((response) => {
          if (response.status) {
            this.setState({
              messageSend: true,
              email: "",
              subject: "",
              message: "",
              rules: false,
              showPreloader: false,
            });
          } else {
            this.setState({
              messageNoSend: true,
              showPreloader: false,
            });
          }
        })
        .catch((error) => {
          console.error("Error sending message:", error.message, error);
          this.setState({
            messageNoSend: true,
            showPreloader: false,
            errorMessage: error.message || "An error occurred while sending the message",
          });
        });
    }else {
      this.setState({
        showPreloader: false,
      });
    }
    event.preventDefault();
  }

  validateEmail(email) {
    let re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  onClickContactSubmit = (event) => {
    event.currentTarget.blur();
  };

  render() {
    const intl = this.props.intl;
    return (
      <main style={{minHeight: "100%"}}>
        <Transitions>
          <section className="contact" aria-labelledby="contact-title">
            <div className="container section">
              <div className="text-center">
                <h1 className="display-4" id="contact-title">
                  <FormattedMessage id="contact.title" />
                </h1>
                <p>
                  <FormattedMessage
                    id="contact.subtitle"
                    values={{
                      a: (chunks) => (
                        <a
                          href="mailto:kamil@wyremski.pl"
                          title={intl.formatMessage({
                            id: "footer.write_to_me",
                          })}
                          key={chunks}
                        >
                          {chunks}
                        </a>
                      ),
                    }}
                  />
                </p>
              </div>
              <br />
              <form method="post" onSubmit={this.handleSubmit}>
                <input type="hidden" name="action" value="send_message" />
                <div className="row">
                  <label htmlFor="contact--email" className="col-form-label">
                    <FormattedMessage id="contact.email" />
                  </label>
                  <div className="col">
                    <input
                      type="email"
                      className="form-control"
                      id="contact--email"
                      name="email"
                      placeholder="example@domain.com"
                      value={this.state.email}
                      onChange={this.handleInputChange}
                      aria-required="true"
                      aria-label={intl.formatMessage({ id: "contact.email" })}
                      aria-invalid={this.state.alertEmail}
                      aria-describedby="contact--alert--email"
                    />
                    <p
                      className={
                        this.state.alertEmail ? "invalid-feedback" : "d-none"
                      }
                      id="contact--alert--email"
                    >
                      <FormattedMessage id="contact.alertEmail" />
                    </p>
                    <p className="small">
                      <FormattedMessage id="contact.email.info" />
                    </p>
                  </div>
                </div>
                <div className="row">
                  <label htmlFor="contact--subject" className="col-form-label">
                    <FormattedMessage id="contact.subject" />
                  </label>
                  <div className="col">
                    <input
                      type="text"
                      className="form-control"
                      id="contact--subject"
                      name="subject"
                      value={this.state.subject}
                      onChange={this.handleInputChange}
                      aria-required="true"
                      aria-label={intl.formatMessage({ id: "contact.subject" })}
                      aria-invalid={this.state.alertSubject}
                      aria-describedby="contact--alert--subject"
                    />
                    <p
                      className={
                        this.state.alertSubject ? "invalid-feedback" : "d-none"
                      }
                      id="contact--alert--subject"
                    >
                      <FormattedMessage id="contact.alertSubject" />
                    </p>
                  </div>
                </div>
                <div className="row">
                  <label htmlFor="contact--message" className="col-form-label">
                    <FormattedMessage id="contact.message" />
                  </label>
                  <div className="col">
                    <textarea
                      className="form-control"
                      rows="4"
                      name="message"
                      id="contact--message"
                      value={this.state.message}
                      onChange={this.handleInputChange}
                      aria-required="true"
                      aria-label={intl.formatMessage({ id: "contact.message" })}
                      aria-invalid={this.state.alertMessage}
                      aria-describedby="contact--alert--message"
                    ></textarea>
                    <p
                      className={
                        this.state.alertMessage ? "invalid-feedback" : "d-none"
                      }
                      id="contact--alert--message"
                    >
                      <FormattedMessage id="contact.alertMessage" />
                    </p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-form-label"></div>
                  <div className="col">
                    <p className="small">
                      This site is protected by reCAPTCHA and the Google{" "}
                      <a
                        href="https://policies.google.com/privacy"
                        target="_blank"
                        rel="nofollow noopener noreferrer"
                        title="reCAPTCHA Privacy Policy"
                      >
                        Privacy Policy
                      </a>{" "}
                      and{" "}
                      <a
                        href="https://policies.google.com/terms"
                        target="_blank"
                        rel="nofollow noopener noreferrer"
                        title="reCAPTCHA Terms of Service"
                      >
                        Terms of Service
                      </a>{" "}
                      apply.
                    </p>
                    <p
                      className={
                        this.state.alertCaptcha ? "invalid-feedback" : "d-none"
                      }
                    >
                      <FormattedMessage id="contact.alertCaptcha" />
                    </p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-form-label"></div>
                  <div className="col">
                    <label className="label-checkbox">
                      <input
                        type="checkbox"
                        name="rules"
                        checked={this.state.rules}
                        onChange={this.handleInputChange}
                        aria-label={intl.formatMessage({
                          id: "contact.privacy",
                        })}
                        aria-invalid={this.state.alertRules}
                        aria-describedby="contact--alert--rules"
                      />
                      <span className="checkmark"></span>{" "}
                      <FormattedMessage id="contact.privacy" />{" "}
                      <a
                        href="https://blog.wyremski.pl/polityka-prywatnosci/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FormattedMessage id="contact.privacy.link" />
                      </a>
                    </label>
                    <p
                      className={
                        this.state.alertRules ? "invalid-feedback" : "d-none"
                      }
                      id="contact--alert--rules"
                    >
                      <FormattedMessage id="contact.alertRules" />
                    </p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-form-label"></div>
                  <div className="col">
                    <button
                      name="contact--submit"
                      type="submit"
                      className="btn btn-primary"
                      onClick={this.onClickContactSubmit}
                    >
                      <FormattedMessage id="contact.send" />
                    </button>
                    {this.state.showPreloader && <Preloader />}
                    <br />
                    <p
                      className={
                        this.state.messageSend ? "alert-success" : "d-none"
                      }
                      role="alert"
                    >
                      <FormattedMessage id="contact.messageSend" />
                    </p>
                    <p
                      className={
                        this.state.messageNoSend ? "alert-danger" : "d-none"
                      }
                      role="alert"
                    >
                      {this.state.errorMessage ? (
                        <>
                          <FormattedMessage id="contact.messageNoSend" />
                          <br />
                          <strong>{this.state.errorMessage}</strong>
                        </>
                      ) : (
                        <FormattedMessage id="contact.messageNoSend" />
                      )}
                    </p>
                  </div>
                </div>
                <ReCAPTCHA
                  ref={recaptchaRef}
                  size="invisible"
                  sitekey="6LdiG0AaAAAAAFnJHwh9T4Ns4QwkKmGBJEZonNdh"
                  onChange={this.verifyRecaptchaCallback}
                />
              </form>
            </div>
          </section>
        </Transitions>
      </main>
    );
  }
}

export default injectIntl(Contact);
