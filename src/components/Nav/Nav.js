import React, { Component } from 'react';
import { Link, NavLink } from "react-router-dom";
import {FormattedMessage} from 'react-intl';
import { language, messages } from './../../Lang';
import './Nav.css';

class Nav extends Component {
  constructor(props) {
    super();
    this.state = {
      active_mobile_menu: false,
      nav_top: '20px'
    };
  }

  showHideMenu = () => {
    this.setState({
      active_mobile_menu: !this.state.active_mobile_menu
    });
  }

  onClickMenu = (event) => {
    this.showHideMenu();
    event.currentTarget.blur();
    window.scrollTo(0, 0);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);

    let nav_link_delay = 1;
    document.querySelectorAll("#nav--menu .hide").forEach(link => {
      setTimeout(
        function() {
          link.classList.remove("hide");
        }, 200*nav_link_delay);
      nav_link_delay++;
    })
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    let scrollTop = window.scrollY;
    if(scrollTop>20){
      scrollTop = 0;
    }else{
      scrollTop = 20 - scrollTop;
    }
    this.setState({
      nav_top: scrollTop+'px'
    });
  }

  render() {
    return(
      <nav id="nav" style={{top : this.state.nav_top}}>
        <div className="container d-flex" role="navigation" aria-label={messages[language]['nav.title.navigation']}>
          <Link to={messages[language]['nav.link.home']} className="navbar--brand" title="Kamil Wyremski - Web Designer">Kamil Wyremski</Link>
          <div id="nav--burger" 
            onClick={this.showHideMenu} 
            className={ this.state.active_mobile_menu ? "open" : "" }
            aria-controls="nav--menu" 
            aria-expanded={this.state.active_mobile_menu} 
            aria-label={messages[language]['nav.title.toogle']}>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <ul id="nav--menu" className={ this.state.active_mobile_menu ? "open d-flex" : "d-flex" }>
            <li className="hide">
              <NavLink to={messages[language]['nav.link.home']} className="nav--link" exact activeClassName='is-active' onClick={this.onClickMenu} title={messages[language]['nav.title.home']}>Home</NavLink>
            </li>
            <li className="hide">
              <NavLink to={messages[language]['nav.link.scripts']} className="nav--link" exact activeClassName='is-active' onClick={this.onClickMenu} title={messages[language]['nav.title.scripts']}><FormattedMessage id="nav.scripts"/></NavLink>
            </li>
            <li className="hide">
              <NavLink to={messages[language]['nav.link.projects']} className="nav--link" exact activeClassName='is-active' onClick={this.onClickMenu} title={messages[language]['nav.title.projects']}><FormattedMessage id="nav.projects"/></NavLink>
            </li>
            <li className="hide">
              <NavLink to={messages[language]['nav.link.contact']} className="nav--link" exact activeClassName='is-active' onClick={this.onClickMenu} title={messages[language]['nav.title.contact']}><FormattedMessage id="nav.contact"/></NavLink>
            </li>
            <li className="hide">
              <a href={language==='pl' ? '/en' : '/'} className="nav--link" id="nav--link-lang" title={messages[language]['nav.title.lang']}>{language==='pl' ? 'en' : 'pl'}&nbsp;&#9656;</a>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
};

export default Nav;
