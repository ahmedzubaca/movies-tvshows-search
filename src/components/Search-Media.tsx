import React, { useContext, useEffect, useState } from 'react';
import { fetchMedia } from '../functions/fech-media';
import RenderTvShowsAndMovies from './Render-tvshows-movies';
import { TypeToRender } from '../utils/interfaces';
import { AppStateContext } from '../context-files/AppState';
import useMountedState  from '../functions/use-mounted-state';

const SelectedMedia: React.FC = () => { 
  
  const [propsToRender, setPropsToRender] = useState<TypeToRender[]>([]); 
  const isMounted = useMountedState();   
  const state = useContext(AppStateContext);
  const search = state.search;
  const media = state.media;
  
  useEffect(() => { 
    const getSearchedMedia = fetchMedia(media, search); 
    getSearchedMedia.then(res => {
      if (isMounted()) {
        if(search.length >=3) {
          const timeout = setTimeout(() => {
            setPropsToRender(res)
          }, 1000);
          return () => {
            clearTimeout(timeout);
          }
        } else {
          setPropsToRender(res)
        }          
      } 
    })  
  }, [media, search]) // eslint-disable-line react-hooks/exhaustive-deps  
        
  return(  
    <div>
      <RenderTvShowsAndMovies props={propsToRender} /> 
    </div>        
  )
};
export default SelectedMedia;