import React, { useContext } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './Pages/Login';
import Profile from './Pages/Profile';
import "./main.css";
import { myContext } from './Pages/Context';
import Register from './Pages/Register';

function App() {
  const ctx = useContext(myContext);

  
  return (
    <BrowserRouter>
      <Switch>
        {
            ctx ? (
              <>
                <Route path='/profile' exact component={Profile}></Route>  
              </>
            ) : (
              <>
                <Route path='/' exact component={Login}></Route>  
                <Route path='/register' exact component={Register}></Route>  
              </>  
            )
        }
    </Switch>
    </BrowserRouter>
  );
}
export default App;
