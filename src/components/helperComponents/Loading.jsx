import React from 'react';
import Loader from 'react-loading-components';

export const Loading = ({ height, message, fill, size }) => <div className="flex-center" style={{ height }}>
    <Loader type='circles' width={"100vw"} height={size} fill={fill} />
    {
        message && <div className="font20 margin20-top">{message}...</div>
    }

</div>

Loading.defaultProps = {
    height: "100vh",
    fill: "47739e",
    height: 50
}
