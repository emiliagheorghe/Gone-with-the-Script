// import './App.css';
import FeedBackList from './components/FeedBackList'
import Login from './components/Login'
import "primereact/resources/themes/vela-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import {HashRouter as Router, Route, Switch } from 'react-router-dom'
import FeedBackListReader from './components/FeedBackListReader';


function App() {
  return (
   <Router>
     <Switch>
      <Route path='/' exact>
        <Login/>
      </Route>
      <Route path='/dashboard' exact>
       <FeedBackList/>
      </Route>
      <Route path='/frontpage' exact>
       <FeedBackListReader/>
      </Route>
      {/* <Route path='/*' exact>
        <Error/>
      </Route> */}
    </Switch>
   </Router>
  )
}

export default App;
