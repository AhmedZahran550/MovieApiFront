
import './App.css';
import Home from '../componant/Home/Home.jsx';
import About from '../componant/About/About.jsx';
import Movie from '../componant/Movie/Movie.jsx';
import Login from '../componant/auth/Login/Login.jsx';
import Notfound from '../componant/Notfound/Notfound.jsx';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Layout from '../componant/Layout/Layout.jsx';
import Register from '../componant/auth/Register/Register.jsx';
import Protected from '../utils/routingGaurd/protected.route.jsx';
import Details from '../componant/Details/Details.jsx';
import ForgetPassword from '../componant/auth/ForgetPass/ForgetPassword.jsx';
import ResetPassword from '../componant/auth/ResetPassword/ResetPassword.jsx';
import AuthRouter from '../utils/routingGaurd/protected.auth.jsx';



function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout/>} path="/">
            <Route element={<Protected><Home /></Protected>} index />
            <Route element={<Login/>} path="login" />
            <Route element={<Register />} path="register" />
            <Route element={<ForgetPassword />} path="password/forget" />
            <Route element={<AuthRouter><ResetPassword/></AuthRouter>} path="password/reset" />
            <Route element={<Protected><Movie /></Protected>} path="movies" />
            <Route element={<Protected><About /></Protected>} path="About" />
            <Route element={<Protected><Details /></Protected>} path="details/:type/:id" />
            <Route element={<Notfound />} path="*" />
          </Route>
        </Routes>
      </BrowserRouter>
    </>

  );
}

export default App;
