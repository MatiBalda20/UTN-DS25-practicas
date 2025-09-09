import React from 'react';

const Section = ({ id, title, link, subtitle, author, img }) => {
    return (
        <div
        id={id}
        className="w-64 bg-white shadow-md rounded-lg p-4 flex flex-col items-center text-center hover:shadow-xl transition"
        >
        <h3 className="text-lg font-bold mb-2">{title}:</h3>
        <a href={link} className="text-blue-600 underline mb-1">{title}</a>
        <h4 className="font-semibold text-sm mb-1">{subtitle}</h4>
        <p className="text-sm text-gray-700 mb-2">{author}</p>
        <img
            src={img}
            alt={`Foto de ${subtitle}`}
            className="h-40 object-cover rounded"
        />
        </div>
    );
};

export default Section;