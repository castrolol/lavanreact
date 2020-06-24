import React from 'react';

let _props;

export const getProps = () => _props;

export default props => {
    _props = props;

    return null;
};

