import React, { useContext, useEffect, useState } from 'react';
import { AppStateContext, useDispatchState } from '../context-files/AppState';
import { useHistory } from 'react-router-dom';
import '../components-styles/SearchField.css';

const Searchfield = () => {

  const [value, setValue] = useState('');  
  const dispatch = useDispatchState();
  const isDisplayed  = useContext(AppStateContext).showSearchField;
  const media  = useContext(AppStateContext).media;  
  const history = useHistory(); 

  const handleMoviesButonClick = () => {
    dispatch({
      type: 'MOVIE_BUTTON_CLICK',
      payload: 'movie',      
    });
    history.push('/top-ten-movies');
  }

  const handleTvButonClick = () => {
   dispatch({
     type: 'TV_BUTTON_CLICK',
     payload: 'tv',    
   });
   history.push('/top-ten-tvshows');  
  }

  const handleInputChange = (e:React.ChangeEvent<HTMLInputElement> ) => {
    setValue(e.target.value);   
    dispatch({
      type: 'INPUT_CHANGE',
      payload: e.target.value,     
    });

    if(e.target.value.length >= 3) {      
      if(media === 'tv') {
        history.push(`/searched-tvshows`)
      } else if(media === 'movie') {
        history.push(`/searched-movies`)
      }     
    }      
  }

  useEffect(()=> {
    history.push('/top-ten-tvshows');    
  },[]) //eslint-disable-line react-hooks/exhaustive-deps
  
  if(isDisplayed) {  
    return (       
      <div className='buttonsAndInputDiv'>
        <div className={'buttonsDiv'}>
          <button 
            className={`movieButton ${media === 'movie' ? 'activeButton' : ''}`} 
            type = 'button'
            onClick={handleMoviesButonClick}
            > Movies 
          </button>
          <button 
            className={`tvButton ${media === 'tv' ? 'activeButton' : ''}`}
            type = 'button'
            onClick={handleTvButonClick}
            > TV Shows 
          </button>
        </div>                
        <input  
          type = 'text'
          value={value}          
          onChange={handleInputChange}               
          placeholder = 'Search for Movies/TV Shows'                       
          className={'inputField'}
        />
      </div>              
    );
  }
  return null;
}
export default Searchfield;