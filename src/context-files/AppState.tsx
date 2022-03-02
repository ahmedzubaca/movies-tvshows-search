import React, { createContext, useContext, useReducer } from 'react';
import { InputChangeAction, TvButtonAction, MovieButtonAction, BackButtonAndImageClick } from './Actions';


interface AppStateValue {
  search: string;
  media: string;
  showSearchField: boolean, 
}

const initAppState: AppStateValue = {
  search: '',
  media: 'tv',
  showSearchField: true,  
}

export const AppStateContext = createContext(initAppState);
export const AppDispatchContext = createContext<React.Dispatch<
  InputChangeAction | TvButtonAction | MovieButtonAction |
  BackButtonAndImageClick> | undefined>(undefined);

const reducer = (state: AppStateValue, action: 
InputChangeAction | TvButtonAction | MovieButtonAction |BackButtonAndImageClick) => {
  switch(action.type) {
    case 'INPUT_CHANGE':
      const inputSearch = action.payload;
      return {
        ...state, search: inputSearch
      }
    case 'MOVIE_BUTTON_CLICK':
      const movieSelection = action.payload;
      return {
        ...state, media: movieSelection
      }
    case 'TV_BUTTON_CLICK':
      const tvSelection = action.payload;
      return {
        ...state, media: tvSelection
      }
    case 'BACK_BUTTON_AND_IMAGE_CLICK':
      const isDisplayed = action.payload;
      return {
        ...state, showSearchField: isDisplayed,
      }
      default: return state;
  }
}

export const useDispatchState = () => {
  const dispatch = useContext(AppDispatchContext);
  if(!dispatch) {
    throw new Error('Dispatch error')
  }
  return dispatch;
}

const AppStateProvider: React.FC = ({children}) => {

  const [state, dispatch] = useReducer(reducer, initAppState);
  return(
    <AppStateContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>
        {children}
      </AppDispatchContext.Provider>
    </AppStateContext.Provider>
  )  
}
export default AppStateProvider;