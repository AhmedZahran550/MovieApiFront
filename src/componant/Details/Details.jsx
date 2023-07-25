import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Loading from '../../utils/Loading.jsx';

export default function Details() {
    const [media, setMedia] = useState({});
    const [isloading, setloading] = useState(false);
    const { id, type } = useParams();


    useEffect(() => {
        try {
            setloading(true);
        const getDetails = async () => {
            const { data } = await axios.get(`https://api.themoviedb.org/3/${type}/${id}?api_key=c636ed7787cc302d96bf88ccf334e0d8`);
            setMedia(data);
        };
        getDetails();
        } catch (error) {
            console.log(error?.message);
        }finally{
            setloading(false);
        }
       


    }, [id , type]);



    return (
     <> {isloading?<Loading/>: <div className='row my-5'>
            <div className="col-md-4">
                <div>
                    <img
                        className="w-100"
                        src={`https://image.tmdb.org/t/p/original${media.poster_path ? media.poster_path : media.profile_path}`}
                        alt=""
                    />
                </div>
            </div>

            <div className="col-md-8">
                <div className="d-flex flex-column py-3">
                    <h2 className='h2 fw-lighter mb-1'>{media.title}{media.name}</h2>
                    <p className='text-muted '>{media.tagline}</p>
                    <div className='mt-2'>
                        <ul className='d-flex list-inline'>
                           {media.genres?.map((genre, index)=><li key={index} className='genres mx-2 p-1 rounded-1'>{genre.name}</li>)}
                        </ul>
                    </div>
                   {media?.birthday&& <div className='fw-lighter fs-6 mt-3'> <p>Birthday: <span>{media?.birthday}</span> </p> </div>}
                   {media?.place_of_birth&& <div className='fw-lighter fs-6 mt-3'> <p>place of birth: <span>{media?.place_of_birth}</span> </p> </div>}
                   {media?.deathday&& <div className='fw-lighter fs-6 mt-3'> <p>Deathday: <span>{media?.deathday}</span> </p> </div>}
                  {media?.vote_average && <> <div className='fw-lighter fs-6 mt-3'> <p>Vote : <span>{media?.vote_average}</span> </p> </div>
                    <div className='fw-lighter fs-6 mt-3'> <p>Vote count: <span>{media?.vote_count}</span> </p> </div></> }
                    <div className='fw-lighter fs-6 mt-3'> <p>Popularity: <span>{media?.popularity}</span> </p> </div>
                   {media?.release_date&& <div className='fw-lighter fs-6 mt-3'> <p>Release date: <span>{media?.release_date}</span> </p> </div>}
                   {media?.number_of_seasons&& <div className='fw-lighter fs-6 mt-3'> <p>Seasons: <span>{media?.number_of_seasons}</span> </p> </div>}
                    <p className='text-muted my-2'>{media.overview}{media.biography}</p>

                   { media.homepage&&<div><a href={media.homepage} rel="noreferrer" target='_blank' className='btn my_button rounded-2'>Watch ON NetFlex</a></div>}
                </div>
            </div>



        </div>}</> 
    );
}
