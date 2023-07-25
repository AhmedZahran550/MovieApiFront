
import React, { useEffect, useState } from 'react';
import Item from '../mediaItem/Item.jsx';
import  axios  from 'axios';
import Loading from './../../utils/Loading';

const Movie = () => {
 const [topRated, setTopRated] = useState([]);
 const [upcoming, setUpcoming] = useState([]);
 const [popular, setPopular] = useState([]);
 const [isloading, setloading] = useState(false);

 const getMovie =  async(media ,callBack)=>{
    try {
    const {data} =await axios.get( `https://api.themoviedb.org/3/movie/${media}?api_key=c636ed7787cc302d96bf88ccf334e0d8`);
     if (data) {
        callBack(data.results);
     }
    } catch (error) {
        console.log(error)
    }
 }

 useEffect(() => {
    try {
         setloading(true)
    getMovie('top_rated' ,setTopRated);
    getMovie('upcoming' ,setUpcoming);
    getMovie('popular' ,setPopular);
    } catch (error) {
        console.log(error);
    }finally{ 
         setloading(false)
        }
  
 },[]);

    return (
  <> { isloading?<Loading/>:  <>
        <div className="row my-5">
            <div className="col-xl-4 col-md-6  d-flex align-items-center">
                <div className='trending position-relative'>
                    <h2 className='h4'>Top Rated <br />Movies <br /> to watch Right Now</h2>
                    <span className="text-muted">the top rated movies on TMDB</span>
                </div>
            </div>
            {topRated?.slice(0,10).map((item ,index)=> <Item key={index} media_type={'movie'} item={item}/>)}
        </div>
{/* ============= */}
        <div className="row my-5">
        <div className="col-xl-4 col-md-6  d-flex align-items-center">
                <div className='trending position-relative'>
                    <h2 className='h4'>Upcoming <br />Movies<br /> to watch Right Now</h2>
                    <span className="text-muted">Upcoming movies in theatres</span>
                </div>
            </div>
            {upcoming?.slice(0,10).map((item ,index)=> <Item key={index} media_type={'movie'} item={item}/>)}
        </div>

 {/* ========== */}
        <div className="row my-5">
        <div className="col-xl-4 col-md-6  d-flex align-items-center">
                <div className='trending position-relative'>
                    <h2 className='h4'>popular <br />Movies <br /> to watch Right Now</h2>
                    <span className="text-muted">The current popular movies on TMDB</span>
                </div>
            </div>
            {popular?.slice(0,10).map((item ,index)=> <Item key={index} media_type={'movie'} item={item}/>)}
        </div>
      
        </>}</>  
    );


}

export default Movie;
