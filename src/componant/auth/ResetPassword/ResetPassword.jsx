import axios from 'axios';
import joi from 'joi';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function ResetPassword() {
    const router = useNavigate()
    const [isloading, setloading] = useState(false);
    const [Error, setError] = useState('');
    const [validationError, setValidationError] = useState([]);
    const [password, setPassword] = useState({
      password: '',
      cpassword: ''
    });
  
    const getData = (e) => {
      const myPassword = { ...password };
      myPassword[e.target.name] = e.target.value;
      setPassword(myPassword);
    };
  
  
    const schema = joi.object({
      password: joi.string().pattern(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)).required().messages({ "string.pattern.base": `Minimum eight characters, at least one uppercase letter, one lowercase letter and one number`, "string.empty": 'Password is Required', }),
      cpassword: joi.string().valid(joi.ref('password')).required().messages({ "any.only": `confirm password miss match`, }),
    });
  
  
    const sendData = async () => {
      try {
        console.log(password);
        setloading(true);
        const token = localStorage.getItem("authToken");
        const { data } = await axios.patch('http://localhost:5000/auth/RestPass', password,{
          headers: { authorization: `Bearer ${token}` }
        });
        if (data.message === "done") {
          localStorage.removeItem('authToken');
          alert("Your Password Reset IS Done")
          router('/login');
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
        const validation = schema.validate(password, { abortEarly: false });
        if (!validation.error) {
          sendData();
        }
        else {
          let Errors = {};
          validation.error.details.map((err) => {
            return Errors[err.context.label] = err.message;
          });
          setValidationError(Errors);
        }
      } catch (error) {
        console.log(error);
      }
  
    };
  
    return (
      <>
      
          <form onSubmit={submit} className='py-5  '>
            <div><p className='h2 text-primary'>Enter a New Password To Reset Your Password </p></div>
            {Error && <div className="alert alert-danger text-center ">{Error}</div>}
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
              {!isloading ? <><button className=' my-3 btn btn-outline-info px-5'>Reset</button> </> : <button className="btn btn-info" type="button" disabled>
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                Loading...
              </button>}
            </div>
  
          </form>
      </>
    );
}
