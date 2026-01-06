import { Component } from "react";
import { injectIntl, FormattedMessage } from "react-intl";
import { useParams } from "react-router-dom";
import Lightbox from "react-18-image-lightbox";
import "react-18-image-lightbox/style.css";
import Transitions from "../../Transition";
import Error404 from "./../Error404/Error404";
import Preloader from "./../Preloader/Preloader.js";

import "./Script.scss";

class Script extends Component {
  constructor(props) {
    super(props);
    this.state = {
      script: false,
      script_name: this.props.params.script_slug,
      photoIndex: 0,
      lightboxIsOpen: false,
      script_error404: false,
    };
  }

  componentDidMount() {
    fetch("/api/scripts/" + this.state.script_name + ".json")
      .then((response) => response.json())
      .then((data) => {
        let meta = {
          messages: data,
          title: data[this.props.language]["title"],
          script_name: this.state.script_name,
          description: data[this.props.language]["description"],
          image:
            "/upload/scripts/" +
            this.state.script_name +
            "/" +
            this.state.script_name +
            ".jpg",
          image_width: 450,
          image_height: 300,
          favicon: "/upload/scripts/" + this.state.script_name + "/favicon.png",
        };
        this.props.handleLanguage(this.props.language, "script", meta);
        this.setState({ script: data.data });
        window.scrollTo(0, 0);
      })
      .catch((err) => {
        this.setState({ script_error404: true });
      });
  }

  createFunctions = () => {
    let functions = [];
    for (let i = 1; i <= this.state.script.functions; i++) {
      functions.push(
        <div className="functions" key={i}>
          <div className="animatable fadeInUp">
            <img
              height="250"
              width="200"
              src={
                "/upload/scripts/" + this.state.script_name + "/f" + i + ".jpg"
              }
              alt={
                this.props.intl.formatMessage({ id: "script.functions" }) + " " +
                this.props.intl.formatMessage({ id: "script.function." + i }).match(/<h3[^>]*>(.*?)<\/h3>/)?.[1] || ''
              }
              className="img"
              loading="lazy"
            />
            <FormattedMessage
              id={"script.function." + i}
              values={{
                h3: (chunks) => <h3 key={chunks}>{chunks}</h3>,
                p: (chunks) => <p key={chunks}>{chunks}</p>,
                strong: (chunks) => <strong key={chunks}>{chunks}</strong>,
              }}
            />
          </div>
        </div>
      );
    }
    return functions;
  };

  createGallery = () => {
    let gallery = [];
    for (let i = 1; i <= this.state.script.photos; i++) {
      gallery.push(
        <button
          className="gallery--photo"
          aria-label={
            this.props.intl.formatMessage({ id: "script.gallery" }) +
            " " +
            this.state.script_name
          }
          key={i}
          onClick={() =>
            this.setState({ lightboxIsOpen: true, photoIndex: i - 1 })
          }
        >
          <div className="animatable fadeInUp">
            <img
              width={i < 2 ? 750 : i < 8 ? 370 : 245}
              height={i < 2 ? 427 : i < 8 ? 211 : 140}
              src={
                "/upload/scripts/" +
                this.state.script_name +
                "/screenshots/" +
                i +
                "_thumb.jpg"
              }
              alt={this.state.script_name + " screenshot " + i}
              className="img"
              loading="lazy"
            />
          </div>
        </button>
      );
    }
    return gallery;
  };

  getImages = () => {
    let images = [];
    for (let i = 1; i <= this.state.script.photos; i++) {
      images.push(
        "/upload/scripts/" +
          this.state.script_name +
          "/screenshots/" +
          i +
          ".jpg"
      );
    }
    return images;
  };

  createListDomains = () => {
    let domains = [];
    if (this.state.script.list_domains !== undefined) {
      let arr_length = this.state.script.list_domains.length;
      for (let i = 0; i < arr_length; i++) {
        if (i === arr_length - 1) {
          domains.push(
            <span key={i}>
              <a
                href={"http://" + this.state.script.list_domains[i]}
                target="_blank"
                rel="nofollow noopener noreferrer"
                key={i}
              >
                {this.state.script.list_domains[i]}
              </a>
            </span>
          );
        } else {
          domains.push(
            <span key={i}>
              <a
                href={"http://" + this.state.script.list_domains[i]}
                target="_blank"
                rel="nofollow noopener noreferrer"
                key={i}
              >
                {this.state.script.list_domains[i]}
              </a>
              ,{" "}
            </span>
          );
        }
      }
    }
    return domains;
  };

  render() {
    const { script, script_name, photoIndex, lightboxIsOpen, script_error404 } =
      this.state;
    const images = this.getImages();
    const list_domains = this.createListDomains();
    return (
      <main>
        {!script && !script_error404 && <Preloader />}
        {script && (
          <Transitions>
            <section className="script" aria-labelledby="script-title">
              <div className="script--up text-center">
                <div className="script--up--middle">
                  <h1 className="display-4" id="script-title">
                    <FormattedMessage id="script.header" />
                  </h1>
                  <h2 className="display-1">
                    <FormattedMessage id="script.subheader" />
                  </h2>
                  <img
                    src={"/upload/scripts/" + script_name + "/banner_top.png"}
                    alt={script_name}
                    width="994"
                    height="285"
                    className="img"
                  />
                </div>
              </div>
              <div className="section container">
                <div className="script--up--bottom">
                  <FormattedMessage
                    id="script.desc1"
                    values={{
                      h2: (chunks) => <h2 className="display-2" key={chunks}>{chunks}</h2>,
                      p: (chunks) => <p key={chunks}>{chunks}</p>,
                      strong: (chunks) => <strong key={chunks}>{chunks}</strong>,
                      breakingLine: <br />,
                    }}
                  />
                </div>
              </div>
              <div className="d-flex container text-center">
                <div className="features">
                  <img
                    height="100"
                    width="100"
                    src="/upload/scripts/clock.png"
                    alt="Clock"
                    className="img"
                    loading="lazy"
                  />
                  <FormattedMessage
                    id="script.feature.1"
                    values={{
                      h3: (chunks) => <h3 key={chunks}>{chunks}</h3>,
                      p: (chunks) => <p key={chunks}>{chunks}</p>,
                    }}
                  />
                </div>
                <div className="features">
                  <img
                    height="100"
                    width="100"
                    src="/upload/scripts/main-ok.png"
                    alt="OK"
                    className="img"
                    loading="lazy"
                  />
                  <FormattedMessage
                    id="script.feature.2"
                    values={{
                      h3: (chunks) => <h3 key={chunks}>{chunks}</h3>,
                      p: (chunks) => <p key={chunks}>{chunks}</p>,
                    }}
                  />
                </div>
                <div className="features">
                  <img
                    height="100"
                    width="100"
                    src="/upload/scripts/help.png"
                    alt="Help"
                    className="img"
                    loading="lazy"
                  />
                  <FormattedMessage
                    id="script.feature.3"
                    values={{
                      h3: (chunks) => <h3 key={chunks}>{chunks}</h3>,
                      p: (chunks) => <p key={chunks}>{chunks}</p>,
                    }}
                  />
                </div>
              </div>
              <br />
              <div className="text-center background-dark section">
                <h2 className="color-light display-3">
                  <FormattedMessage id="script.functions" />
                </h2>
                <div className="container d-flex">{this.createFunctions()}</div>
              </div>
              <div className="container text-center section">
                <h2 className="display-3">
                  <FormattedMessage id="script.requirements" />
                </h2>
                <div className="d-flex">
                  <div className="script--requirements">
                    <img
                      width="260"
                      height="200"
                      src="/upload/scripts/php8.png"
                      alt="Logo PHP"
                      className="img"
                      loading="lazy"
                    />
                    <h3>PHP</h3>
                    <p>
                      <FormattedMessage id="script.requirements.1" />
                    </p>
                  </div>
                  <div className="script--requirements">
                    <img
                      width="168"
                      height="200"
                      src="/upload/scripts/mysql.png"
                      alt="Logo MySQL"
                      className="img"
                      loading="lazy"
                    />
                    <h3>MySQL</h3>
                    <p>
                      <FormattedMessage id="script.requirements.2" />
                    </p>
                  </div>
                  <div className="script--requirements">
                    <img
                      width="188"
                      height="200"
                      src="/upload/scripts/crontab.png"
                      alt="Logo CronTab"
                      className="img"
                      loading="lazy"
                    />
                    <h3>CronTab</h3>
                    <p>
                      <FormattedMessage id="script.requirements.3" />
                    </p>
                  </div>
                </div>
                <p>
                  <FormattedMessage
                    id="script.requirements_bottom"
                    values={{
                      strong: (chunks) => <strong key={chunks}>{chunks}</strong>,
                    }}
                  />
                </p>
              </div>
              <div className="text-center color-light background-dark section script--admin--panel">
                <h2 className="display-3">
                  <FormattedMessage id="script.admin_panel" />
                </h2>
                <img
                  height="129"
                  width="345"
                  src="/upload/scripts/admin.png"
                  alt="Admin Panel created by Kamil Wyremski"
                  className="img"
                  loading="lazy"
                />
                <p className="content">
                  <FormattedMessage id="script.admin_panel_description" />
                </p>
              </div>
              <div className="container text-center section script--language">
                <h2 className="display-3">
                  <FormattedMessage id="script.language.title" />
                </h2>
                <img
                  height="286"
                  width="258"
                  src="/upload/scripts/language.png"
                  alt="Flags of countries in the world"
                  className="img"
                  loading="lazy"
                />
                <FormattedMessage
                  id="script.language.desc"
                  values={{
                    p: (chunks) => <p className="content" key={chunks}>{chunks}</p>,
                    strong: (chunks) => <strong key={chunks}>{chunks}</strong>,
                    breakingLine: <br />,
                  }}
                />
              </div>
              <div className="text-center section background-light script--gallery">
                <h2 className="display-3">
                  <FormattedMessage id="script.gallery" />
                </h2>
                <br />
                <div className="container script--gallery--photos">
                  {this.createGallery()}
                </div>
              </div>
              {lightboxIsOpen && (
                <Lightbox
                  mainSrc={images[photoIndex]}
                  nextSrc={images[(photoIndex + 1) % images.length]}
                  prevSrc={
                    images[(photoIndex + images.length - 1) % images.length]
                  }
                  onCloseRequest={() =>
                    this.setState({ lightboxIsOpen: false })
                  }
                  onMovePrevRequest={() =>
                    this.setState({
                      photoIndex:
                        (photoIndex + images.length - 1) % images.length,
                    })
                  }
                  onMoveNextRequest={() =>
                    this.setState({
                      photoIndex: (photoIndex + 1) % images.length,
                    })
                  }
                />
              )}
              <div className="text-center container section">
                <div className="content">
                  <h2 className="display-3">
                    <FormattedMessage id="script.demo.title" />
                  </h2>
                  <br />
                  <h3 className="display-1">
                    <FormattedMessage
                      id="script.demo.desc"
                      values={{
                        strong: (chunks) => <strong key={chunks}>{chunks}</strong>,
                        a: (chunks) => (
                          <a
                            href={"https://" + chunks}
                            target="_blank"
                            rel="noopener noreferrer"
                            title={script_name}
                            key={chunks}
                          >
                            {chunks}
                          </a>
                        ),
                      }}
                    />
                  </h3>
                  <br />
                  <p>
                    <FormattedMessage
                      id="script.demo.desc2"
                      values={{
                        strong: (chunks) => <strong key={chunks}>{chunks}</strong>,
                        a: (chunks) => (
                          <a
                            href={"https://" + chunks}
                            target="_blank"
                            rel="noopener noreferrer"
                            title={script_name}
                            key={chunks}
                          >
                            {chunks}
                          </a>
                        ),
                        breakingLine: <br />,
                      }}
                    />
                  </p>
                  {list_domains.length > 0 && (
                    <p>
                      <FormattedMessage id="script.demo.list" />{" "}
                      <strong>{list_domains}</strong>
                    </p>
                  )}
                  <p>
                    <FormattedMessage
                      id="script.demo.manual"
                      values={{
                        a: (chunks) => (
                          <a
                            href="https://blog.wyremski.pl/instrukcja-instalacji-i-konfiguracji-skryptow/"
                            title="Instrukcja instalacji i konfiguracji skryptów"
                            target="_blank"
                            rel="noopener noreferrer"
                            key={chunks}
                          >
                            {chunks}
                          </a>
                        ),
                        breakingLine: <br />,
                      }}
                    />
                  </p>
                </div>
              </div>
              <div className="text-center background-light script--info">
                <p className="display-1">
                  <FormattedMessage id="script.desc2" />
                </p>
              </div>
              <div className="text-center container section">
                <FormattedMessage
                  id="script.desc3"
                  values={{
                    h3: (chunks) => <h3 className="display-2" key={chunks}>{chunks}</h3>,
                    p: (chunks) => <p key={chunks}>{chunks}</p>,
                    breakingLine: <br />,
                  }}
                />
                <a
                  href={script.buy_url}
                  title={script_name}
                  className="script--buy"
                >
                  {script.free ? (
                    <FormattedMessage id="script.download" />
                  ) : (
                    <FormattedMessage id="script.buy" />
                  )}
                </a>
              </div>
            </section>
          </Transitions>
        )}
        {script_error404 && (
          <Error404
            language={this.props.language}
            handleLanguage={this.props.handleLanguage.bind(this)}
          />
        )}
      </main>
    );
  }
}

export default injectIntl((props) => (
  <Script {...props} params={useParams()} />
));
