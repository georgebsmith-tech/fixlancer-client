import React from 'react';

const Error = ({ error }) => {
    return (
        <section className="font13 padd10 border-smooth bd-red margin10-top margin10-bottom" >
            { error}
        </section>
    );
}

export default Error;
