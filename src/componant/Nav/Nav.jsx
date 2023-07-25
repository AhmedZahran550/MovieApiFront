import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from './../../Context/AuthContext';


const Nav = () => {

  const {user ,logOut} = useContext(AuthContext);
  const router = useNavigate();

  return (

    <nav className="navbar navbar-expand-lg px-3 navbar-dark bg-transparent">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bolder fs-3 pointer" to="/">Noxe</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">

          {user && <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link pointer" aria-current="page" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link pointer" to="/movies ">Movies</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link pointer" to="/tv ">Tvs</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link pointer" to="/people">People</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link pointer" to="/about ">About</Link>
            </li>
          </ul>}


          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {!user ? <>
              <li className="nav-item">
                <Link className="nav-link pointer" aria-current="page" to="register">Register</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link pointer" to="login">Login</Link>
              </li>
            </>
              : <li className="nav-item">
                <button className="nav-link btn bg-transparent pointer " onClick={() => { logOut(); router('/login'); }}>LogOut</button>
              </li>}
          </ul>

        </div>
      </div>
    </nav>

  );
};

export default Nav;
