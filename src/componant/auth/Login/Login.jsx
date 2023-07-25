import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import joi from 'joi';
import useAuth from './../../../hooks/useAuth';



const Login = () => {
    //  useContext(AuthContext);
     const {saveUser} = useAuth()
    const router = useNavigate();
    const [Error, setError] = useState('');
    const [validationError, setValidationError] = useState({});
    const [isloading, setloading] = useState(false);
    const [user, setUser] = useState({
        email: '',
        password: '',
    });

    const getData = (e) => {
        const myUser = { ...user };
        myUser[e.target.name] = e.target.value;
        setUser(myUser);
    };


    const schema = joi.object({
        email: joi.string().required().email({ tlds: { allow: ['com', 'net'] } }),
        password: joi.string().pattern(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)).required().messages({ "string.pattern.base": `Minimum eight characters, at least one uppercase letter, one lowercase letter and one number`, }),
    });


    const sendData = async () => {
        try {
            setloading(true);
            const { data } = await axios.post('http://localhost:5000/auth/login', user);
            if (data.message === "done") {
                router('/');
                localStorage.setItem("token", data.token);
                saveUser();
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
                setValidationError(Errors);
            }
        } catch (error) {
            console.log(error);
        }

    };

    return (
        <>
            <form onSubmit={submit} className='mt-5 '>
                {Error && <div className="alert alert-danger text-center ">{Error}</div>}
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
                    {!isloading ? <><button className='btn btn-outline-info my-2'>Log In</button> <Link to={"/password/forget"}><span className='mx-2 fs-6 fw-lighter text-muted'> Forget Password...?</span></Link></> : <button class="btn btn-info" type="button" disabled>
                        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        Loading...
                    </button>}
                </div>

            </form>
        </>
    );

};

export default Login;
