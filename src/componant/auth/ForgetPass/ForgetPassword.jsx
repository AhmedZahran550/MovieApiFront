import React, { useState } from 'react';
import joi from 'joi';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const ForgetPassword = () => {
  const [email, setEmail] = useState(null);
  const [code, setCode] = useState(null);
  const [Error, setError] = useState(null);
  const [validationError, setValidationError] = useState(null);
  const [isloading, setloading] = useState(false);
  const [message, setMessage] = useState(null);
  const router = useNavigate();


  const schema = {
    email: joi.string().required().email({ tlds: { allow: ['com', 'net'] } }).messages({
      'string.email': 'Enter A valid Email',
      "string.empty": 'Email is Required',
    }),
    code: joi.string().required().pattern(new RegExp('^[0-9]{4}$')).messages({
      'string.pattern.base': 'In-valid Code',
      "string.empty": 'Enter the Code First',
    }),
  };


  const sendData = () => {
    try {
      setloading(true);
      const sendEmail = async()=>{
           const { data } = await axios.post('http://localhost:5000/auth/forgetPass', { email });
      if (data.message) {
        setMessage(data.message); 
        setValidationError(undefined);
        setError(undefined);
      }
      if (data.Error) {
        setError(data.Error);
      }
      }
      const sendCode = async()=>{
      const { data } = await axios.post('http://localhost:5000/auth/code', { email , code });
      if (data.message === 'done') {
        setMessage(data.message);
        localStorage.setItem('authToken' , data.token)
        router('/password/reset')
      }
      if (data.Error) {
        setError(data.Error);
      }
      }
      if (message) {
        return sendCode() ;
      }
    sendEmail() ;
    } catch (error) {
      console.log(error);
    }
    finally {
      setloading(false);
    }

  };

  const submit = (e) => {
    try {
      e.preventDefault();
      setValidationError(undefined);
      setError(undefined);
      const validation = !message ? schema.email.validate(email): schema.code.validate(code);
      if (!validation.error) {
        sendData();
      }
      else {
        setValidationError(validation.error.message);
      }
    } catch (error) {
      console.log(error);
    }
  };



  return (
    <div className='row d-flex mt-5'>
      <div className='col-6 m-auto text-center'>
        <div className='h1 my-3 text-danger'>Rest Password</div>
        <form onSubmit={submit}>
      { !message &&  <>   
           <label htmlFor="email" className='mb-3 text-secondary' >Please Enter Your Email to Send Rest Password Code. </label>
            {Error && <div className="alert alert-danger text-center my-3 ">{Error}</div>}
            <input type="text" onChange={(e) => setEmail(e.target.value)} className='form-control my_input my-2' name='email' id='email' />
            {validationError && <div className="alert alert-danger text-center p-0 mt-1">{validationError}</div>}
            {!isloading ? <button type="submit" className='btn btn-outline-info my-2'>Send Email</button> : <button className="btn btn-info" type="button" disabled>
              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              Loading...
            </button>}
          </>}
      { message &&  <>   
           <label htmlFor="code" className='mb-3 text-secondary' >{message} </label>
            {Error && <div className="alert alert-danger text-center my-3 ">{Error}</div>}
            <input type={'text'}  onChange={(e) => setCode(e.target.value)} className='form-control my_input my-2' name='code' id='code' />
            {validationError && <div className="alert alert-danger text-center p-0 mt-1">{validationError}</div>}
            {!isloading ? <button type="submit" className='btn btn-outline-info my-2'>Check Code</button> : <button className="btn btn-info" type="button" disabled>
              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              Loading...
            </button>}
          </>}
        </form>
      </div>
    </div>
  );
};


export default ForgetPassword;
