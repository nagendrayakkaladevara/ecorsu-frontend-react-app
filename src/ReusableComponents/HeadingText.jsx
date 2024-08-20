import React from 'react';
import PropTypes from 'prop-types';
import '../App.css';

const styles = {
    fontSize: '15px',
    color: "rgb(255, 145, 48)",
    fontFamily: 'Roboto',
    margin: "0px"
}

const HeadingText = ({ text, className, ...props }) => {
    return <p className={`${className} FontFamliy`} style={styles} {...props}>{text}</p>;
};

HeadingText.propTypes = {
    text: PropTypes.string.isRequired,
    className: PropTypes.string
};

HeadingText.defaultProps = {
    className: ''
};

export default HeadingText;