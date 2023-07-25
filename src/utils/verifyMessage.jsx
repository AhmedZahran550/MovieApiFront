import React from 'react';

export default function VerifyMessage({message}) {
  return (
    <div>
      <div className='fullBag d-flex justify-content-center '>
        <div class="alert alert-success text-info h2 text-center align-self-center p-4" role="alert">
          Welcome <br />
          <br />
          {message}
        </div>
      </div>
    </div>
  );
}
