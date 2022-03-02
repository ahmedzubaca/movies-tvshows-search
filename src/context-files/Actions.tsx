interface Action<T> {
  type: T
}

export interface InputChangeAction extends Action<'INPUT_CHANGE'> {
  payload: string;
}

export interface TvButtonAction extends Action<'TV_BUTTON_CLICK'> {
  payload: string;
}

export interface MovieButtonAction extends Action<'MOVIE_BUTTON_CLICK'> {
  payload: string;
}

export interface BackButtonAndImageClick extends Action<'BACK_BUTTON_AND_IMAGE_CLICK'> {
  payload: boolean;  
}