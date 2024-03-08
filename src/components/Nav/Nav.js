import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import { injectIntl, FormattedMessage } from "react-intl";
import { messages } from "./../../Lang";
import "./Nav.scss";

class Nav extends Component {
  constructor({ intl, ...props }) {
    super();
    this.state = {
      active_mobile_menu: false,
      nav_top: "20px",
      alternate_url: "",
    };
  }

  showHideMenu = () => {
    this.setState({
      active_mobile_menu: !this.state.active_mobile_menu,
    });
  };

  onClickMenu = (event) => {
    this.showHideMenu();
    event.currentTarget.blur();
    window.scrollTo(0, 0);
  };

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);

    let nav_link_delay = 1;
    document.querySelectorAll("#navbar--menu .hide").forEach((link) => {
      setTimeout(function () {
        link.classList.remove("hide");
      }, 200 * nav_link_delay);
      nav_link_delay++;
    });
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll = () => {
    let scrollTop = window.scrollY;
    if (scrollTop > 20) {
      scrollTop = 0;
    } else {
      scrollTop = 20 - scrollTop;
    }
    this.setState({
      nav_top: scrollTop + "px",
    });
  };

  static getDerivedStateFromProps(props, state) {
    if (
      props.language !== state.language ||
      props.component !== state.component ||
      props.meta !== state.meta
    ) {
      let alternate_url = "";
      let component = props.component;
      if (props.component === "error404") {
        component = "home";
      }

      if (props.language === "pl") {
        alternate_url = messages["en"]["nav.link." + component];
      } else if (props.language === "en") {
        alternate_url = messages["pl"]["nav.link." + component];
      }
      if (props.alternate_slug) {
        alternate_url = alternate_url + "/" + props.alternate_slug;
      }
      return {
        alternate_url: alternate_url,
      };
    }
  }

  render() {
    const intl = this.props.intl;
    const language = this.props.language;
    return (
      <nav
        style={{ top: this.state.nav_top }}
        className={
          this.state.nav_top === "0px"
            ? "navbar shadow d-print-none"
            : "navbar d-print-none"
        }
      >
        <div
          className="container d-flex"
          role="navigation"
          aria-label={intl.formatMessage({ id: "nav.title.navigation" })}
        >
          <Link
            to={intl.formatMessage({ id: "nav.link.home" })}
            className="navbar--brand"
            title="Kamil Wyremski - Web Designer"
            rel="home"
          >
            Kamil Wyremski <small>Full Stack Web Developer</small>
          </Link>
          <button
            className={
              this.state.active_mobile_menu
                ? "open navbar--burger"
                : "navbar--burger"
            }
            onClick={this.showHideMenu}
            aria-controls="navbar--menu"
            aria-expanded={this.state.active_mobile_menu}
            aria-label={intl.formatMessage({ id: "nav.title.toogle" })}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          <ul
            id="navbar--menu"
            className={
              this.state.active_mobile_menu
                ? "open d-flex navbar--menu"
                : "d-flex navbar--menu"
            }
          >
            <li className="hide">
              <NavLink
                to={intl.formatMessage({ id: "nav.link.home" })}
                className={({ isActive }) =>
                  "nav--link" + (isActive ? " is-active" : "")
                }
                onClick={this.onClickMenu}
                title={intl.formatMessage({ id: "nav.title.home" })}
                rel="home"
              >
                <FormattedMessage id="nav.home" />
              </NavLink>
            </li>
            <li className="hide">
              <NavLink
                to={intl.formatMessage({ id: "nav.link.scripts" })}
                className={({ isActive }) =>
                  "nav--link" + (isActive ? " is-active" : "")
                }
                onClick={this.onClickMenu}
                title={intl.formatMessage({ id: "nav.title.scripts" })}
              >
                <FormattedMessage id="nav.scripts" />
              </NavLink>
            </li>
            <li className="hide">
              <NavLink
                to={intl.formatMessage({ id: "nav.link.projects" })}
                className={({ isActive }) =>
                  "nav--link" + (isActive ? " is-active" : "")
                }
                onClick={this.onClickMenu}
                title={intl.formatMessage({ id: "nav.title.projects" })}
              >
                <FormattedMessage id="nav.projects" />
              </NavLink>
            </li>
            <li className="hide">
              <NavLink
                to={intl.formatMessage({ id: "nav.link.contact" })}
                className={({ isActive }) =>
                  "nav--link" + (isActive ? " is-active" : "")
                }
                onClick={this.onClickMenu}
                title={intl.formatMessage({ id: "nav.title.contact" })}
              >
                <FormattedMessage id="nav.contact" />
              </NavLink>
            </li>
            <li className="hide">
              <a
                href={this.state.alternate_url}
                className="nav--link"
                onClick={this.changeLanguage}
                title={language === "pl" ? "en" : "pl"}
                hrefLang={language === "pl" ? "en" : "pl"}
                rel="alternate"
              >
                {language === "pl" ? "en" : "pl"}&nbsp;&#9656;
              </a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default injectIntl(Nav);
