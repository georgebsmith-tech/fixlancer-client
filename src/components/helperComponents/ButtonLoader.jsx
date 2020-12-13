import React from 'react';
import Loader from 'react-loading-components';

export const ButtonLoader = ({ height, bg }) =>
    <Loader type='circles' width={"100%"} height={22} fill={"#fff"} />




ButtonLoader.defaultProps = {
    height: "100vh",
    fill: "#fff",
    height: 10
}
