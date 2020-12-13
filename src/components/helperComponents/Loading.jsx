import React from 'react';
import Loader from 'react-loading-components';

export const Loading = ({ height, bg }) => <div className="flex-center" style={{ height, backgroundColor: !bg && "rgba(0,0,0,0.6)", width: "100%" }}>
    <Loader type='circles' width={"100vw"} height={22} fill={"#fff"} />


</div>

Loading.defaultProps = {
    height: "100vh",
    fill: "#fff",
    height: 10
}
