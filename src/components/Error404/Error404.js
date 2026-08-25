import React from 'react';
import './Error404.scss';

const Error404  = () => {
  return <main>
    <section className="error404" aria-labelledby="error-title">
      <div className="text-center section">
        <h1 id="error-title">4<span className="error404--tag">&lt;/&gt;</span>4</h1>
        <p className="error404--code"><span className="error404--color1">error404</span>(){'{'}<br />&nbsp;&nbsp;const <span className="error404--color2">message</span> = "<span className="error404--color3">page not found</span>";<br />&nbsp;&nbsp;return <span className="error404--color2">message</span>;<br />{'}'};</p>
        <br /><br /><br />
        <h3>Error 404</h3>
        <br />
        <p>The page you are looking for has been moved, deleted, or simply never existed.</p>
        <br />
        <nav aria-label="Site navigation" className="error404--nav">
          <ul>
            <li><a href="/en">Homepage</a></li>
            <li><a href="/en/scripts">Web Scripts</a></li>
            <li><a href="/en/projects">My Projects</a></li>
            <li><a href="/en/contact">Contact</a></li>
          </ul>
        </nav>
      </div>
    </section>
  </main>
}

export default Error404;

