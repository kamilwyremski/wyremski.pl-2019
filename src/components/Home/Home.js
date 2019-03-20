import React, { Component } from 'react';
import LazyLoad from 'react-image-lazy-load';
import './Home.css';
import {FormattedMessage, FormattedHTMLMessage} from 'react-intl';
import { language, messages } from './../../Lang';

class Home extends Component {

  constructor(props) {
    super();
    this.state = {
      header_typed: messages[language]['home.header.types'],
    };
  }

  componentDidMount() {
    let header_types_texts = messages[language]['home.header.types'].split(' ');
    let header_types_counter = 0;
    let header_text_index = 0;
    let header_text_char = 0;
    let header_text_length = 0;
    let header_text = '';
    this.countdown = setInterval( () => {
      if(!header_text_length){
        header_text_length = header_types_texts[header_text_index].length
			}
      header_text_char = Math.floor(header_types_counter/4);
			if(header_text_char>header_text_length + 15){
				header_text_index++;
				if(header_text_index>=header_types_texts.length){
					header_text_index = 0;
				}
				header_text_length = header_types_counter = 0;
			}else if(header_text_char>header_text_length + 10){
				header_text = header_text.substring(0, header_text.length - 1);
				header_types_counter++;
			}else{
				header_text = header_types_texts[header_text_index].substring(0,header_text_char);
				header_types_counter++;
			}
		  this.setState({
				header_typed: header_text
      })
    },70);
    window.scrollTo(0, 0);
  }

  componentWillUnmount() {
    clearInterval(this.countdown);
  }

  render() {
    return (
      <main id="home">
        <header id="header">
      		<div id="header--inside">
      			<h1>Kamil Wyremski</h1>
      			<h2 id="header--typed"><span id="header--typed--text">{this.state.header_typed}</span><span id="header--typed--cursor">|</span></h2>
      			<h4><FormattedHTMLMessage id="home.header.text"/></h4>
      		</div>
        </header>
        <section className="container section" id="home--introduction">
        	<div className="text-center">
        		<h2><FormattedMessage id="home.introduction.header"/></h2>
        		<br />
        		<h4><FormattedHTMLMessage id="home.introduction.subheader"/></h4>
        	</div>
        	<div id="home--introductio--text">
            <FormattedHTMLMessage id="home.introduction.text"/>
        	</div>
        </section>
        <section id="home--about_me" className="section">
      		<div className="container d-flex" itemScope itemType="http://schema.org/Person">
            <LazyLoad height={170} width={170} offsetVertical={300} loaderImage imageProps={{
              src: '/upload/images/kamil_wyremski.jpg',
              alt: "Kamil Wyremski",
              ref: "image",
              className: "img-fluid",
              itemProp: "image"
            }} />
      			<div id="home--about_me--desc">
      				<h2 itemProp="name">Kamil Wyremski</h2>
      				<h4 itemProp="jobTitle"><FormattedMessage id="home.about_me.title"/></h4>
      				<p><FormattedHTMLMessage id="home.about_me.brand"/></p>
      				<div className="d-none">
      					<span itemProp="email">kamil.wyremski@gmail.com</span>
      					<span itemProp="url">https://wyremski.pl</span>
      					<span itemProp="birthDate">1988</span>
      					<span itemProp="homeLocation">Poland, Września</span>
      				</div>
      				<a href="https://www.facebook.com/wyremskipl/" title="My profile on Facebook" target="_blank" rel="noopener noreferrer"><i className="icon-facebook-official"></i></a>
							<a href="https://github.com/kamilwyremski" title="My profile on GitHub" target="_blank" rel="noopener noreferrer" itemProp="sameAs"><i className="icon-github-squared"></i></a>
      				<a href="skype:kamil.wyremski" title="Call me by Skype!"><i className="icon-skype"></i></a>
      				<a href="mailto:kamil.wyremski@gmail.com" title="Write to me!"><i className="icon-mail-alt"></i></a>
      				<a href="http://blog.wyremski.pl" title="My blog" target="_blank" rel="noopener noreferrer"><i className="icon-link-ext-alt"></i></a>
      			</div>
      		</div>
      	</section>
        <section id="home--skills" className="background-light">
        	<div className="container section">
            <div className="text-center">
        			<h2><FormattedMessage id="home.skills.title"/></h2>
        			<br />
        			<p><FormattedMessage id="home.skills.description"/></p>
        		</div>
        	  <div className="d-flex" id="home--skills--box">
        			<div className="home--skills animatable fadeInUp">
        				<div className="home--skills--image"></div>
        				<h4><FormattedMessage id="home.skills.1.title"/></h4>
        				<p><FormattedHTMLMessage id="home.skills.1.desc"/></p>
        			</div>
        			<div className="home--skills animatable fadeInUp">
        				<div className="home--skills--image"></div>
      					<h4><FormattedMessage id="home.skills.2.title"/></h4>
      					<p><FormattedHTMLMessage id="home.skills.2.desc"/></p>
      				</div>
        			<div className="home--skills animatable fadeInUp">
        				<div className="home--skills--image"></div>
        				<h4><FormattedMessage id="home.skills.3.title"/></h4>
        				<p><FormattedHTMLMessage id="home.skills.3.desc"/></p>
        			</div>
        			<div className="home--skills animatable fadeInUp">
        				<div className="home--skills--image"></div>
        				<h4><FormattedMessage id="home.skills.4.title"/></h4>
        				<p><FormattedHTMLMessage id="home.skills.4.desc"/></p>
        			</div>
        			<div className="home--skills animatable fadeInUp">
        				<div className="home--skills--image"></div>
        				<h4><FormattedMessage id="home.skills.5.title"/></h4>
        				<p><FormattedHTMLMessage id="home.skills.5.desc"/></p>
        			</div>
        			<div className="home--skills animatable fadeInUp">
        				<div className="home--skills--image"></div>
        				<h4><FormattedMessage id="home.skills.6.title"/></h4>
        				<p><FormattedHTMLMessage id="home.skills.6.desc"/></p>
        			</div>
        			<div className="home--skills animatable fadeInUp">
        				<div className="home--skills--image"></div>
        				<h4><FormattedMessage id="home.skills.7.title"/></h4>
        				<p><FormattedHTMLMessage id="home.skills.7.desc"/></p>
        			</div>
        			<div className="home--skills animatable fadeInUp">
        				<div className="home--skills--image"></div>
        				<h4><FormattedMessage id="home.skills.8.title"/></h4>
        				<p><FormattedHTMLMessage id="home.skills.8.desc"/></p>
        			</div>
        		</div>
        	</div>
        </section>
        <section id="home--technologies" className="container section">
        	<div className="text-center">
        		<h2><FormattedMessage id="home.technologies.title"/></h2>
        	   <br />
        		<p><FormattedMessage id="home.technologies.description"/>"</p>
        	</div>
        	<div className="d-flex" id="home--technologies--box">
        		<div className="home--technologies animatable fadeInUp">
        			<div className="home--technologies--image"></div>
        			<h4>PHP</h4>
        			<p><FormattedHTMLMessage id="home.technologies.1.desc"/></p>
        		</div>
      			<div className="home--technologies animatable fadeInUp">
      				<div className="home--technologies--image"></div>
      				<h4>JavaScript</h4>
      				<p><FormattedHTMLMessage id="home.technologies.2.desc"/></p>
      			</div>
      			<div className="home--technologies animatable fadeInUp">
      				<div className="home--technologies--image"></div>
      				<h4>Symfony</h4>
      				<p><FormattedHTMLMessage id="home.technologies.3.desc"/></p>
      			</div>
      			<div className="home--technologies animatable fadeInUp">
      				<div className="home--technologies--image"></div>
      				<h4>Wordpress</h4>
      				<p><FormattedHTMLMessage id="home.technologies.4.desc"/></p>
      			</div>
      			<div className="home--technologies animatable fadeInUp">
      				<div className="home--technologies--image"></div>
      				<h4>Prestashop</h4>
      				<p><FormattedHTMLMessage id="home.technologies.5.desc"/></p>
      			</div>
      			<div className="home--technologies animatable fadeInUp">
      				<div className="home--technologies--image"></div>
      				<h4>Twitter Bootstrap</h4>
      				<p><FormattedHTMLMessage id="home.technologies.6.desc"/></p>
      			</div>
      			<div className="home--technologies animatable fadeInUp">
      				<div className="home--technologies--image"></div>
      				<h4>jQuery</h4>
      				<p><FormattedHTMLMessage id="home.technologies.7.desc"/></p>
      			</div>
      			<div className="home--technologies animatable fadeInUp">
      				<div className="home--technologies--image"></div>
      				<h4>Angular</h4>
      				<p><FormattedHTMLMessage id="home.technologies.8.desc"/></p>
      			</div>
      			<div className="home--technologies animatable fadeInUp">
      				<div className="home--technologies--image"></div>
      				<h4>HTML</h4>
      				<p><FormattedHTMLMessage id="home.technologies.9.desc"/></p>
      			</div>
      			<div className="home--technologies animatable fadeInUp">
      				<div className="home--technologies--image"></div>
      				<h4>CSS</h4>
      				<p><FormattedHTMLMessage id="home.technologies.10.desc"/></p>
      			</div>
      			<div className="home--technologies animatable fadeInUp">
      				<div className="home--technologies--image"></div>
      				<h4>Adobe Photoshop</h4>
      				<p><FormattedHTMLMessage id="home.technologies.11.desc"/></p>
      			</div>
      			<div className="home--technologies animatable fadeInUp">
      				<div className="home--technologies--image"></div>
      				<h4>NodeJS</h4>
      				<p><FormattedHTMLMessage id="home.technologies.12.desc"/></p>
      			</div>
      			<div className="home--technologies animatable fadeInUp">
      				<div className="home--technologies--image"></div>
      				<h4>React</h4>
      				<p><FormattedHTMLMessage id="home.technologies.13.desc"/></p>
      			</div>
      			<div className="home--technologies animatable fadeInUp">
      				<div className="home--technologies--image"></div>
      				<h4>Linux</h4>
      				<p><FormattedHTMLMessage id="home.technologies.14.desc"/></p>
      			</div>
      			<div className="home--technologies animatable fadeInUp">
      				<div className="home--technologies--image"></div>
      				<h4>MySQL</h4>
      				<p><FormattedHTMLMessage id="home.technologies.15.desc"/></p>
      			</div>
      			<div className="home--technologies animatable fadeInUp">
      				<div className="home--technologies--image"></div>
      				<h4>GIT</h4>
      				<p><FormattedHTMLMessage id="home.technologies.16.desc"/></p>
      			</div>
        	</div>
        </section>
      </main>
    );
  }
}

export default Home;
