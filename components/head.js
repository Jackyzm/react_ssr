import React from 'react';
import NextHead from 'next/head';
import { string } from 'prop-types';

const Head = (props) => {
    const {
        title = '', description = '', url = ''
    } = props;
    return (
        <NextHead>
            <meta charSet="UTF-8" />
            <meta
                name="description"
                content={ description }
            />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta property="og:url" content={ url } />
            <meta property="og:title" content={ title } />
            <meta
                property="og:description"
                content={ description }
            />
            <title>{ title }</title>
            <link rel="icon" href="/static/favicon.ico" />
        </NextHead>
    );
};


Head.propTypes = {
    title: string,
    description: string,
    url: string,
};

export default Head;
