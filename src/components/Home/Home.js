import React, { Component } from 'react';
import './Home.scss';
import {injectIntl, FormattedMessage} from 'react-intl';

class Home extends Component {

	constructor({intl, ...props}) {
		super();
		this.state = {
			header_typed: ''
		}
	}

	componentDidMount() {
		let header_types_texts = this.props.intl.formatMessage({ id: 'home.header.types' }).split(' ');
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
		this.props.handleLanguage(this.props.language,'home');
	}

	componentWillUnmount() {
		clearInterval(this.countdown);
	}

	render() {
		const intl = this.props.intl;
		return (
			<main>
				<header className="home--header">
					<div className="home--header--inside">
						<h1 className="display-4">Kamil Wyremski</h1>
						<p className="home--header--typed">{this.state.header_typed}<span className="home--header--typed-cursor">|</span></p>
						<h3 className="display-1"><FormattedMessage id="home.header.text" values={{breakingLine: <br />}}/></h3>
					</div>
				</header>
				<section className="container section">
					<div className="text-center">
						<h2 className="display-3"><FormattedMessage id="home.introduction.header"/></h2>
						<br />
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
				<section className="section home--about_me">
					<div className="container" itemScope itemType="http://schema.org/Person">
						<h2 className="display-3" itemProp="name">Kamil Wyremski</h2>
						<h4 className="display-1" itemProp="jobTitle"><FormattedMessage id="home.about_me.title"/></h4>
						<p><FormattedMessage id="home.about_me.brand"
							values={{
								span: chunks => <span itemProp="brand">{chunks}</span>
							}}
							/></p>
						<div className="d-none">
							<span itemProp="email">kamil@wyremski.pl</span>
							<span itemProp="url">https://wyremski.pl</span>
							<span itemProp="birthDate">1988</span>
							<span itemProp="homeLocation">Poland, Września</span>
						</div>
						<a href="https://www.facebook.com/wyremskipl/" title={ intl.formatMessage({ id: 'footer.facebook' })} target="_blank" rel="noopener noreferrer">
							<i className="icon-facebook-official" aria-hidden="true"></i>
							<span className="sr-only"><FormattedMessage id="footer.facebook"/></span>
						</a>
						<a href="https://github.com/kamilwyremski" title={ intl.formatMessage({ id: 'footer.github' })} target="_blank" rel="noopener noreferrer" itemProp="sameAs">
							<i className="icon-github-squared" aria-hidden="true"></i>
							<span className="sr-only"><FormattedMessage id="footer.github"/></span>
						</a>
						<a href="skype:kamil.wyremski" title={ intl.formatMessage({ id: 'footer.skype' })}>
							<i className="icon-skype" aria-hidden="true"></i>
							<span className="sr-only"><FormattedMessage id="footer.skype"/></span>
						</a>
						<a href="mailto:kamil@wyremski.pl" title={ intl.formatMessage({ id: 'footer.write_to_me' })}>
							<i className="icon-mail-alt" aria-hidden="true"></i>
							<span className="sr-only"><FormattedMessage id="footer.write_to_me"/></span>
						</a>
						<a href="http://blog.wyremski.pl" title={ intl.formatMessage({ id: 'footer.blog' })} target="_blank" rel="noopener noreferrer" aria-hidden="true">
							<i className="icon-link-ext-alt"></i>
							<span className="sr-only"><FormattedMessage id="footer.blog"/></span>
						</a>
					</div>
				</section>
				<section className="background-light">
					<div className="container section">
						<div className="text-center content">
							<h2 className="display-3"><FormattedMessage id="home.skills.title"/></h2>
							<br />
							<p><FormattedMessage id="home.skills.description"/></p>
							<br />
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
				<section className="container section">
					<div className="text-center content">
						<h2 className="display-3"><FormattedMessage id="home.technologies.title"/></h2>
						<br />
						<p><FormattedMessage id="home.technologies.description"/></p>
						<br />
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
							<p><FormattedMessage id="home.technologies.4.desc"
								values={{
									a: chunks => <a href="http://blog.wyremski.pl/o-wordpress-ie/" title="Wordpress" target="_blank" rel="noopener noreferrer">{chunks}</a>
								}}
							/></p>
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
							<h4 className="display-1">jQuery</h4>
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
							<p><FormattedMessage id="home.technologies.12.desc"
								values={{
									a: chunks => <a href="http://blog.wyremski.pl/wprowadzenie-do-node-js/" title="Wprowadzenie do node.js" target="_blank" rel="noopener noreferrer">{chunks}</a>
								}}
							/></p>
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
