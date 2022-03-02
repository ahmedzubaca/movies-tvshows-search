import React from 'react';
import { useHistory} from 'react-router-dom';
import { TypeToRender } from '../utils/interfaces';
import '../components-styles/render-tvshows-movies.css';
import { useDispatchState } from '../context-files/AppState';

interface Props  {
  props: TypeToRender[]
}

const RenderTvShowsAndMovies: React.FC<Props> = ({props}) => {  
  const history = useHistory();
  const path = history.location.pathname;
  const dispatch = useDispatchState();
  const imageBaseUrl = "https://image.tmdb.org/t/p/w500"; 
  
  const handleImageClick = (data: TypeToRender) => { 
    dispatch({
      type: 'BACK_BUTTON_AND_IMAGE_CLICK',
      payload: false,
    });
    const title = data && data.name ? data.name.replace(/ /g, '-') : data.title.replace(/ /g, '-');
    history.push({
      pathname: `${path}/${title}`,
      state: {
        name: data.name ? data.name : data.title,
        id: data.id,
        poster_path: data.poster_path,
        overview: data.overview
      } 
    });        
  } 

  return (         
    <div className='imgAndTitleDiv'>
      { 
        props.map((item) => {
          return (
            <div key={item.id} >
              <div className='imgDiv'>                                                      
                <img alt = 'CoverPoster' 
                  src = { item.poster_path ? `${imageBaseUrl}${item.poster_path}` : 'defaultImg.jpg'  }
                  onClick={() => handleImageClick(item)}
                  className='imgAlone'
                />                                        
              </div>                
              <div>
                <div className="titleAlone"> { item.name ? item.name : item.title } </div>                                        
              </div>
          </div>
          )
        })          
      } 
    </div>
  );
}
export default React.memo(RenderTvShowsAndMovies); 