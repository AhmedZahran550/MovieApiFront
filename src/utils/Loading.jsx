import React from 'react';

const Loading = () => {
    return (
        <div className='fullBag d-flex justify-content-center '>
            <div class="spinner-border align-self-center text-info" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
    );
};

export default Loading;
