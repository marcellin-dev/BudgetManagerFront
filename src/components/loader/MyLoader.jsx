import React from 'react';

const MyLoader = ({color}) => {
    return (
        <div className={`spinner-border text-${color ? color : 'secondary'}`} role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    );
};

export default MyLoader;