import axios from 'axios';
import React, { useState } from 'react';
import joi from 'joi';
import VerifyMessage from '../../../utils/verifyMessage.jsx';
export default function Register() {
  const [isloading, setloading] = useState(false);
  const [message, setMessage] = useState(null);
  const [Error, setError] = useState('');
  const [validationError, setValidationError] = useState({});
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    age: 0,
    email: '',
    password: '',
    cpassword: ''
  });

  const getData = (e) => {
    const myUser = { ...user };
    myUser[e.target.name] = e.target.value;
    setUser(myUser);
  };


  const schema = joi.object({
    first_name: joi.string().required(),
    last_name: joi.string().required(),
    email: joi.string().required().email({ tlds: { allow: ['com', 'net'] } }),
    age: joi.number().min(12).required().messages({ "number.min": "You must be at least 12 years old" }),
    password: joi.string().pattern(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)).required().messages({ "string.pattern.base": `Minimum eight characters, at least one uppercase letter, one lowercase letter and one number`, }),
    cpassword: joi.string().valid(joi.ref('password')).required().messages({ "any.only": `confirm password miss match`, }),

  });


  const sendData = async () => {
    try {
      setloading(true);
      const { data } = await axios.post('http://localhost:5000/auth/signup', user);
      if (data.message === "done") {
        setMessage('An Email Verification Message send to you Check Your Mail');
      }
      if (data.Error) {
        setError(data.Error);
      }
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
      const validation = schema.validate(user, { abortEarly: false });
      if (!validation.error) {
        sendData();
      }
      else {
        let Errors = {};
        validation.error.details.map((err) => {
          return Errors[err.context.label] = err.message;
        });
        setValidationError(validation.error.details);
      }
    } catch (error) {
      console.log(error);
    }

  };

  return (
    <>
      {message ? <VerifyMessage message={message} /> :
        <form onSubmit={submit} className='py-5  '>
          {Error && <div className="alert alert-danger text-center ">{Error}</div>}
          <div>
            <label htmlFor="first_name">First Name: </label>
            <input onChange={getData} type="text" className='form-control my_input my-2 ' name='first_name' id='first_name' />
            {validationError?.first_name && <div className="alert alert-danger text-center p-0 mt-1">{validationError?.first_name}</div>}
          </div>
          <div>
            <label htmlFor="last_name">last Name: </label>
            <input onChange={getData} type="text" className='form-control my_input my-2' name='last_name' id='last_name' />
            {validationError?.last_name && <div className="alert alert-danger text-center p-0 mt-1">{validationError?.last_name}</div>}
          </div>
          <div>
            <label htmlFor="age">age: </label>
            <input onChange={getData} type={'number'} className='form-control my_input my-2' name='age' id='age' />
            {validationError?.age && <div className="alert alert-danger text-center p-0 mt-1">{validationError?.age}</div>}
          </div>
          <div>
            <label htmlFor="email">Email: </label>
            <input onChange={getData} type="email" className='form-control my_input my-2' name='email' id='email' />
            {validationError?.email && <div className="alert alert-danger text-center p-0 mt-1">{validationError?.email}</div>}
          </div>
          <div>
            <label htmlFor="password">password: </label>
            <input onChange={getData} type="password" className='form-control my_input my-2' name='password' id='password' />
            {validationError?.password && <div className="alert alert-danger text-center p-0 mt-1">{validationError?.password}</div>}
          </div>
          <div>
            <label htmlFor="cpassword">confirm password: </label>
            <input onChange={getData} type="password" className='form-control my_input my-2' name='cpassword' id='cpassword' />
            {validationError?.cpassword && <div className="alert alert-danger text-center p-0 mt-1">{validationError?.cpassword}</div>}
          </div>
          <div>
            {!isloading ? <><button className='btn btn-outline-info my-2'>Register</button> </> : <button class="btn btn-info" type="button" disabled>
              <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              Loading...
            </button>}
          </div>

        </form>}
    </>
  );
}
