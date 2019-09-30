import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.scss';
import './assets/css/fontello.css';
import './assets/css/fonts.css';
import { loadReCaptcha } from 'react-recaptcha-google'

import {IntlProvider} from "react-intl";
import { language, messages } from './Lang';

import Nav from './components/Nav/Nav';
import Home from './components/Home/Home';
import Scripts from './components/Scripts/Scripts';
import Script from './components/Script/Script';
import Projects from './components/Projects/Projects';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import Error404 from './components/Error404/Error404';

class App extends Component {

  componentDidMount() {
    window.addEventListener('scroll', this.doAnimations);
    this.doAnimations();
    loadReCaptcha();
  }

  doAnimations = (event) => {
    let offset = document.documentElement.scrollTop + window.innerHeight;
    document.querySelectorAll(".animatable").forEach(animatable => {
      if((animatable.offsetTop + 80) < offset) {
        animatable.classList.remove("animatable");
        animatable.classList.add("animated");
      }
    })
	};

  render() {
    return(
      <IntlProvider locale={language} messages={messages[language]}>
        <Router onUpdate={() => window.scrollTo(0, 0)}>
          <div>
            <Nav />
            <Switch>
              {["/", "/en"].map((path, index) =>
                <Route exact path={path} component={Home} key={index} />
              )}
              {[messages['pl']['nav.link.scripts'], messages['en']['nav.link.scripts']].map((path, index) =>
                <Route exact path={path} component={Scripts} key={index} />
              )}
              {[messages['pl']['nav.link.script'], messages['en']['nav.link.script']].map((path, index) =>
                <Route exact path={path+"/:script_slug(cuadro|demoty2|empresa2|festa2|holmes|motonotice|notice2)"} component={Script} key={index} />
              )}
              {[messages['pl']['nav.link.projects'], messages['en']['nav.link.projects']].map((path, index) =>
                <Route exact path={path} component={Projects} key={index} />
              )}
              {[messages['pl']['nav.link.contact'], messages['en']['nav.link.contact']].map((path, index) =>
                <Route exact path={path} component={Contact} key={index} />
              )}
              <Route component={Error404} status={404} notFound={true}/>
            </Switch>
            <Footer />
          </div>
        </Router>
      </IntlProvider>
    )
  }
};

export default App;
