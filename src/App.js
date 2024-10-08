import React, { Component } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import "./App.scss";
import { IntlProvider } from "react-intl";
import { messages } from "./Lang";
import Meta from "./components/Meta/Meta";
import Nav from "./components/Nav/Nav";
import Home from "./components/Home/Home";
import Scripts from "./components/Scripts/Scripts";
import Script from "./components/Script/Script";
import Projects from "./components/Projects/Projects";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";
import Error404 from "./components/Error404/Error404";

class App extends Component {
  constructor() {
    super();
    this.state = {
      language: "pl",
      component: "home",
      alternate_slug: "",
      messages: messages,
      meta: "",
    };
  }

  componentDidMount() {
    window.addEventListener("scroll", this.doAnimations);
    this.doAnimations();
  }

  handleLanguage(lang, component = "home", data = {}) {
    if (data.messages !== undefined) {
      let m = {};
      m.pl = { ...messages.pl, ...data.messages.pl };
      m.en = { ...messages.en, ...data.messages.en };
      this.setState({
        messages: m,
      });
    }

    this.setState({
      language: lang,
      component: component,
      alternate_slug: data.script_name || "",
      meta: data,
    });
  }

  componentDidUnMount() {
    window.removeEventListener("scroll", this.doAnimations);
  }

  doAnimations = () => {
    let offset = document.documentElement.scrollTop + window.innerHeight;
    document.querySelectorAll(".animatable").forEach((animatable) => {
      if (animatable.offsetTop + 80 < offset) {
        animatable.classList.remove("animatable");
        animatable.classList.add("animated");
      }
    });
  };

  createRoute(t) {
    let routes = [];
    Object.keys(messages).forEach(function (lang, index) {
      routes.push(<Route path={messages[lang]["nav.link.home"]} key={index + lang + "home"} element={<Home language={lang} handleLanguage={t.handleLanguage.bind(t)} />} />);
      routes.push(<Route path={messages[lang]["nav.link.scripts"]} key={index + lang + "scripts"} element={<Scripts language={lang} handleLanguage={t.handleLanguage.bind(t)} />} />);
      routes.push(<Route path={messages[lang]["nav.link.script"] + "/:script_slug"} key={index + lang + "script"} element={<Script language={lang} handleLanguage={t.handleLanguage.bind(t)} />} />);
      routes.push(<Route path={messages[lang]["nav.link.projects"]} key={index + lang + "projects"} element={<Projects language={lang} handleLanguage={t.handleLanguage.bind(t)} />} />);
      routes.push(<Route path={messages[lang]["nav.link.contact"]} key={index + lang + "contact"} element={<Contact language={lang} handleLanguage={t.handleLanguage.bind(t)} />} />);
    });
    return routes;
  }

  render() {
    console.info("%cKamil Wyremski\n%cFull Stack Web Developer", "font-family: Montserrat, sans-serif; font-size: 24px; font-weight: bold;", "font-family: Montserrat, sans-serif; font-size: 14px;");

    return (
      <IntlProvider locale={this.state.language} messages={this.state.messages[this.state.language]} key={this.state.language}>
        <Meta language={this.state.language} component={this.state.component} meta={this.state.meta}></Meta>
        <Router onUpdate={() => window.scrollTo(0, 0)}>
          <div>
            <Nav language={this.state.language} component={this.state.component} alternate_slug={this.state.alternate_slug} />
            <AnimatePresence mode="wait">
              <Routes>
                {this.createRoute(this)}
                <Route path="*" status={404} notFound={true} element={<Error404 />} />
              </Routes>
            </AnimatePresence>
            <Footer />
          </div>
        </Router>
      </IntlProvider>
    );
  }
}

export default App;
