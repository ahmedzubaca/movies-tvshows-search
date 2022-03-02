import { removeTopRatedFromSearched } from './removeTopRatedFromSearched';

const API_KEY = process.env.REACT_APP_API_KEY;

export  const fetchMedia = async(media: string, search: string) => {
  
  const response = await fetch(
    `https://api.themoviedb.org/3/${media}/top_rated?api_key=${API_KEY}&language=en-US&page=1`);
  const data = await response.json();
  const topTenMedia = data.results.slice(0,10);  

  if(search.length >= 3) {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/${media}?api_key=${API_KEY}&query=${search}`);
    const data =  await response.json();
    const searchedData = data.results;        
    const searchedMedia = removeTopRatedFromSearched(topTenMedia, searchedData);     
    return searchedMedia;
   
  }
  return topTenMedia;  
}