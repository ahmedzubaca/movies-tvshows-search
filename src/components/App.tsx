import React from 'react';
import SelectedMedia from './Search-Media';
import Searchfield from './Searchfield';
import AppStateProvider from '../context-files/AppState';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import SingleMedia from './Single-Media';
import '../components-styles/App.css';

function App() {
  
  return (
    <div className={'appContainerDiv'}>
      <AppStateProvider>                        
        <Router> 
          <Searchfield />                                 
            <Route exact path='/:category'> <SelectedMedia /> </Route>                                
            <Route exact path='/:category/:title'> <SingleMedia /> </Route>                                       
        </Router>
      </AppStateProvider>
    </div>
  );  
}
export default App;