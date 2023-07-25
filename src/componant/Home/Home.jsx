
import React, { useEffect, useState } from 'react';
import Item from '../mediaItem/Item.jsx';
import  axios  from 'axios';
import Loading from './../../utils/Loading';


const Home = () => {
 const [movies, setMovie] = useState([]);
 const [TV, setTv] = useState([]);
 const [people, setPeople] = useState([]);
 const [isloading, setloading] = useState(false);

 const getTrending =  async(media ,callBack)=>{
    try {
    const {data} =await axios.get( `https://api.themoviedb.org/3/trending/${media}/day?api_key=c636ed7787cc302d96bf88ccf334e0d8`);
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
    getTrending('movie' ,setMovie);
    getTrending('tv' ,setTv);
    getTrending('person' ,setPeople);
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
                    <h2 className='h4'>Trending <br />Movies <br /> to watch Right Now</h2>
                    <span className="text-muted">most watched movies by days</span>
                </div>
            </div>
            {movies?.slice(0,10).map((item ,index)=> <Item key={index} item={item}/>)}
        </div>
{/* ============= */}
        <div className="row my-5">
        <div className="col-xl-4 col-md-6  d-flex align-items-center">
                <div className='trending position-relative'>
                    <h2 className='h4'>Trending <br />TVs<br /> to watch Right Now</h2>
                    <span className="text-muted">most watched TVs by days</span>
                </div>
            </div>
            {TV?.slice(0,10).map((item ,index)=> <Item key={index} item={item}/>)}
        </div>

 {/* ========== */}
        <div className="row my-5">
        <div className="col-xl-4 col-md-6  d-flex align-items-center">
                <div className='trending position-relative'>
                    <h2 className='h4'>Trending <br />People <br /> to watch Right Now</h2>
                    <span className="text-muted">most watched People by days</span>
                </div>
            </div>
            {people?.slice(0,10).map((item ,index)=> <Item key={index} item={item}/>)}
        </div>
      
        </>}</>  
    );
}

export default Home;
