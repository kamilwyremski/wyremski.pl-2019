import React, { Component } from 'react';
import './Home.scss';
import {injectIntl, FormattedMessage} from 'react-intl';
class Home extends Component {

	constructor() {
		super();
		this.state = {
			header_typed: ''
		}
	}

	componentDidMount() {
		this.props.handleLanguage(this.props.language,'home');
		const header_texts = this.props.intl.formatMessage({ id: 'home.header.types' }).split(' ');
		let header_types_counter = 0;
		let header_text_index = 0;
		let header_text_char = 0;
		let header_text_length = 0;
		let header_text = '';
		this.countdown = setInterval( () => {
			if(!header_text_length){
				header_text_length = header_texts[header_text_index].length
			}
			header_text_char = Math.floor(header_types_counter/4);
			if(header_text_char > header_text_length + 15){
				header_text_index++;
				if(header_text_index >= header_texts.length){
					header_text_index = 0;
				}
				header_text_length = header_types_counter = 0;
			}else if(header_text_char > header_text_length + 10){
				header_text = header_text.substring(0, header_text.length - 1);
				header_types_counter++;
			}else{
				header_text = header_texts[header_text_index].substring(0,header_text_char);
				header_types_counter++;
			}
			this.setState({
				header_typed: header_text
			})
		},70);
	}

	componentWillUnmount() {
		clearInterval(this.countdown);
	}

	render() {
		return (
			<main>
				<header className="home--header" aria-labelledby="main-title">
					<div className="home--header--inside">
						<h1 className="display-4" id="main-title">Kamil Wyremski</h1>
						<p className="home--header--typed">{this.state.header_typed}<span className="home--header--typed-cursor">|</span></p>
						<h2 className="display-1"><FormattedMessage id="home.header.text" values={{breakingLine: <br />}}/></h2>
					</div>
				</header>
				<section className="container section" aria-labelledby="introduction-title">
					<div className="text-center">
						<h2 className="display-3" id="introduction-title"><FormattedMessage id="home.introduction.header"/></h2>
						<h3 className="display-1"><FormattedMessage id="home.introduction.subheader" values={{breakingLine: <br />}}/></h3>
					</div>
					<div className="home--introduction--text">
						<FormattedMessage id="home.introduction.text" 
							values={{
								p: chunks => <p>{chunks}</p>
							}}
						/>
					</div>
				</section>
				<section className="section home--about_me" aria-labelledby="about-me-title">
					<div className="container">
						<h2 className="display-3">Kamil Wyremski</h2>
						<h3 className="display-1" id="about-me-title"><FormattedMessage id="home.about_me.title"/></h3>
						<p><FormattedMessage id="home.about_me.brand"/></p>
					</div>
				</section>
				<section className="background-light" aria-labelledby="skills-title">
					<div className="container section">
						<div className="text-center content mb-2">
							<h2 className="display-3" id="skills-title"><FormattedMessage id="home.skills.title"/></h2>
							<p><FormattedMessage id="home.skills.description"/></p>
						</div>
						<div className="d-flex home--skills">
							<div className="home--skill animatable fadeInUp">
								<div className="home--skill--image"></div>
								<h4 className="display-1"><FormattedMessage id="home.skills.1.title"/></h4>
								<p><FormattedMessage id="home.skills.1.desc"
									values={{
										a: chunks => <a href="http://blog.wyremski.pl/poprawne-wyswietlanie-strony/" target="_blank" title="Standard W3C" rel="noopener noreferrer">{chunks}</a>
									}}
								/></p>
							</div>
							<div className="home--skill animatable fadeInUp">
								<div className="home--skill--image"></div>
								<h4 className="display-1"><FormattedMessage id="home.skills.2.title"/></h4>
								<p><FormattedMessage id="home.skills.2.desc"
									values={{
										a: chunks => <a href="http://blog.wyremski.pl/optymalizacja-strony-www/" target="_blank" title="Strony www zgodne z SEO" rel="noopener noreferrer">{chunks}</a>
									}}
								/></p>
							</div>
							<div className="home--skill animatable fadeInUp">
								<div className="home--skill--image"></div>
								<h4 className="display-1"><FormattedMessage id="home.skills.3.title"/></h4>
								<p><FormattedMessage id="home.skills.3.desc"/></p>
							</div>
							<div className="home--skill animatable fadeInUp">
								<div className="home--skill--image"></div>
								<h4 className="display-1"><FormattedMessage id="home.skills.4.title"/></h4>
								<p><FormattedMessage id="home.skills.4.desc"/></p>
							</div>
							<div className="home--skill animatable fadeInUp">
								<div className="home--skill--image"></div>
								<h4 className="display-1"><FormattedMessage id="home.skills.5.title"/></h4>
								<p><FormattedMessage id="home.skills.5.desc"/></p>
							</div>
							<div className="home--skill animatable fadeInUp">
								<div className="home--skill--image"></div>
								<h4 className="display-1"><FormattedMessage id="home.skills.6.title"/></h4>
								<p><FormattedMessage id="home.skills.6.desc"/></p>
							</div>
							<div className="home--skill animatable fadeInUp">
								<div className="home--skill--image"></div>
								<h4 className="display-1"><FormattedMessage id="home.skills.7.title"/></h4>
								<p><FormattedMessage id="home.skills.7.desc"/></p>
							</div>
							<div className="home--skill animatable fadeInUp">
								<div className="home--skill--image"></div>
								<h4 className="display-1"><FormattedMessage id="home.skills.8.title"/></h4>
								<p><FormattedMessage id="home.skills.8.desc"/></p>
							</div>
						</div>
					</div>
				</section>
				<section className="container section" aria-labelledby="technologies-title">
					<div className="text-center content mb-2">
						<h2 className="display-3" id="technologies-title"><FormattedMessage id="home.technologies.title"/></h2>
						<p><FormattedMessage id="home.technologies.description"/></p>
					</div>
					<div className="d-flex home--technologies">
						<div className="home--technologie animatable fadeInUp">
							<div className="home--technologie--image"></div>
							<h4 className="display-1">PHP</h4>
							<p><FormattedMessage id="home.technologies.1.desc"/></p>
						</div>
						<div className="home--technologie animatable fadeInUp">
							<div className="home--technologie--image"></div>
							<h4 className="display-1">JavaScript</h4>
							<p><FormattedMessage id="home.technologies.2.desc"/></p>
						</div>
						<div className="home--technologie animatable fadeInUp">
							<div className="home--technologie--image"></div>
							<h4 className="display-1">Symfony</h4>
							<p><FormattedMessage id="home.technologies.3.desc"
								values={{
									a: chunks => <a href="http://blog.wyremski.pl/framework-symfony/" title="Symfony framework" target="_blank" rel="noopener noreferrer">{chunks}</a>
								}}
							/></p>
						</div>
						<div className="home--technologie animatable fadeInUp">
							<div className="home--technologie--image"></div>
							<h4 className="display-1">Wordpress</h4>
							<p><FormattedMessage id="home.technologies.4.desc"/></p>
						</div>
						<div className="home--technologie animatable fadeInUp">
							<div className="home--technologie--image"></div>
							<h4 className="display-1">Prestashop</h4>
							<p><FormattedMessage id="home.technologies.5.desc"/></p>
						</div>
						<div className="home--technologie animatable fadeInUp">
							<div className="home--technologie--image"></div>
							<h4 className="display-1">Twitter Bootstrap</h4>
							<p><FormattedMessage id="home.technologies.6.desc"
								values={{
									a: chunks => <a href="http://blog.wyremski.pl/framework-bootstrap/" title="Twitter Bootstrap" target="_blank" rel="noopener noreferrer">{chunks}</a>
								}}
							/></p>
						</div>
						<div className="home--technologie animatable fadeInUp">
							<div className="home--technologie--image"></div>
							<h4 className="display-1">VUE</h4>
							<p><FormattedMessage id="home.technologies.7.desc"/></p>
						</div>
						<div className="home--technologie animatable fadeInUp">
							<div className="home--technologie--image"></div>
							<h4 className="display-1">Angular</h4>
							<p><FormattedMessage id="home.technologies.8.desc"/></p>
						</div>
						<div className="home--technologie animatable fadeInUp">
							<div className="home--technologie--image"></div>
							<h4 className="display-1">HTML</h4>
							<p><FormattedMessage id="home.technologies.9.desc"/></p>
						</div>
						<div className="home--technologie animatable fadeInUp">
							<div className="home--technologie--image"></div>
							<h4 className="display-1">CSS</h4>
							<p><FormattedMessage id="home.technologies.10.desc"/></p>
						</div>
						<div className="home--technologie animatable fadeInUp">
							<div className="home--technologie--image"></div>
							<h4 className="display-1">Adobe Photoshop</h4>
							<p><FormattedMessage id="home.technologies.11.desc"/></p>
						</div>
						<div className="home--technologie animatable fadeInUp">
							<div className="home--technologie--image"></div>
							<h4 className="display-1">NodeJS</h4>
							<p><FormattedMessage id="home.technologies.12.desc"/></p>
						</div>
						<div className="home--technologie animatable fadeInUp">
							<div className="home--technologie--image"></div>
							<h4 className="display-1">React</h4>
							<p><FormattedMessage id="home.technologies.13.desc"/></p>
						</div>
						<div className="home--technologie animatable fadeInUp">
							<div className="home--technologie--image"></div>
							<h4 className="display-1">Linux</h4>
							<p><FormattedMessage id="home.technologies.14.desc"/></p>
						</div>
						<div className="home--technologie animatable fadeInUp">
							<div className="home--technologie--image"></div>
							<h4 className="display-1">MySQL</h4>
							<p><FormattedMessage id="home.technologies.15.desc"/></p>
						</div>
						<div className="home--technologie animatable fadeInUp">
							<div className="home--technologie--image"></div>
							<h4 className="display-1">GIT</h4>
							<p><FormattedMessage id="home.technologies.16.desc"/></p>
						</div>
					</div>
				</section>
			</main>
		);
	}
}

export default injectIntl(Home);
