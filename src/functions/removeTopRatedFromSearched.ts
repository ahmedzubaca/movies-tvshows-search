import { TypeToRender } from '../utils/interfaces';

export const removeTopRatedFromSearched = 
(topRated: TypeToRender[], searched: TypeToRender[]) => { 

  const filteredItem = searched.filter(x => !topRated.some(y => y.id === x.id));
  return filteredItem;  
}