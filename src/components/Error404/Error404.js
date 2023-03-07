import React from 'react';
import './Error404.scss';

const Error404  = () => {
  return <main>
    <section className="error404" aria-labelledby="error-title">
      <div className="text-center section">
        <h1 id="error-title">4<span className="error404--tag">&lt;/&gt;</span>4</h1>
        <p className="error404--code"><span className="error404--color1">Error404</span>(){'{'}<br />&nbsp;&nbsp;<span className="error404--color2">message</span> = "<span className="error404--color3">page not found</span>";<br />{'}'};</p>
        <br /><br /><br />
        <h3>Error 404</h3>
        <br />
        <p>The page you are looking for has been moved, deleted, or simply never existed.</p>
      </div>
    </section>
  </main>
}

export default Error404;

