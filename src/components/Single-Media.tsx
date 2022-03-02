import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import useMountedState  from '../functions/use-mounted-state';
import { TypeToRender } from '../utils/interfaces';
import '../components-styles/Single-Media.css';
import { useDispatchState } from '../context-files/AppState';

const SingleMedia = () => {
  
  const API_KEY = process.env.REACT_APP_API_KEY;
  const history = useHistory<TypeToRender>();
  const dataFromRouter: TypeToRender = history.location.state;
  const [singleMediaUrlKey, setSingleMediaUrlKey] = useState('');
  const [isVideoAvailable, setIsVideoAvailable] = useState(true);
  const baseTrailerUrl = 'https://www.youtube.com/embed/';
  const imageBaseUrl = "https://image.tmdb.org/t/p/w500";
  const isMounted = useMountedState();
  const dispatch = useDispatchState();
  const buttonText = "< Back";   
  
  const fetchingSingleMedia = async() => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${dataFromRouter.id}/videos?api_key=${API_KEY}&language=en-US`);    
    const data = await response.json(); 

    if(isMounted()) {
      if(data.success && data.success === false) {
        setIsVideoAvailable(false);        
      } else if (data.success !== false && data.results.length) {
        setSingleMediaUrlKey(data.results[0].key);
      }
    } 
  } 

  useEffect(() => { 
    fetchingSingleMedia()
  }, []) // eslint-disable-line 

  const goBackOneStep = () => {
    dispatch({
      type: 'BACK_BUTTON_AND_IMAGE_CLICK',
      payload: true,
    });
    history.goBack();
  }; 

  return(     
    <div className={singleMediaUrlKey.length ? 'encompassingDivTrailer' : 'encompassingDivPoster'}>
      <div className='backButtonDiv'>
        <button onClick={goBackOneStep} 
          className='backButton'>
            {buttonText}
        </button>
      </div> 
      <div className={singleMediaUrlKey.length ? 'trailerDiv' : 'singleImgDiv'}> 
        {  
          singleMediaUrlKey && isVideoAvailable
            ?
              <iframe className='trailerAlone'                
                src={`${baseTrailerUrl}${singleMediaUrlKey}`}
                frameBorder='0'
                allow='autoplay; encrypted-media'
                allowFullScreen
                title='video'                      
              /> 
            :
              <img alt = 'CoverPoster' 
                  src = {dataFromRouter.poster_path === null ? '/defaultImg.jpg' : `${imageBaseUrl}${dataFromRouter.poster_path}`}                   
                  className = 'singleImgAlone'
              />                     
        }  
      </div>         
      <div className='titleAndOverviewDiv' >
        <div className = 'titleAloneDiv'> {dataFromRouter.name ? dataFromRouter.name : dataFromRouter.title} </div>        
        <div className="overviewAlone">{dataFromRouter.overview}</div>
      </div>        
    </div>         
  );  
}
export default SingleMedia;