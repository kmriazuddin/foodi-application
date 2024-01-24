import React from 'react';

const TitleAndSubtitle = ({ title, subtitle, description, textPosition }) => {
    return (
        <div className={textPosition ? 'text-center' : 'text-start'}>
            <p className='text-lg font-medium uppercase text-red tracking-wide'>{subtitle}</p>
            <h2 className='text-4xl md:text-5xl font-bold my-2 leading-snug md:leading-snug'>{title}</h2>
            <p className='text-secondary leading-[30px]'>{description}</p>
        </div>
    );
};

export default TitleAndSubtitle;