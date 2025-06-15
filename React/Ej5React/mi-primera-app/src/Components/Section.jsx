import React from 'react';

const Section = ({ id, title, link, subtitle, author, img }) => (
    <div id={id}>
        <h3>{title}:</h3>
        <a href={link}>{title}</a>
        <h4>{subtitle}</h4>
        <p>{author}</p>
        <img src={img} alt="foto_libro" id="foto_libro" />
    </div>
);

export default Section;