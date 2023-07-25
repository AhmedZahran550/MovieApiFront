import React from 'react';
import { Link } from 'react-router-dom';

export default function Item({ item , media_type =''}) {
    return (
        <div className='col-md-3 col-sm-6 col-xl-2 my-2'>
            <Link to={`/details/${item.media_type || media_type }/${item.id}`}>
            <div className='movie position-relative pointer '>
                    <img
                        className="w-100"
                        src={`https://image.tmdb.org/t/p/original${item.poster_path ?item.poster_path:item.profile_path}`}
                        alt=""
                    />
                    <h3 className='h6 my-2'>{item.title} {item.name}</h3>
                  {item.vote_average ?<div className="position-absolute top-0 end-0 text-white bg-info p-2">{item.vote_average?.toFixed(1)}</div>:
                  <div className="position-absolute top-0 end-0 text-white bg-info p-2">{item.popularity?.toFixed()}</div>}
            </div>
            </Link>
            
          
        </div>
    );
}
