// import './App.css';
import FeedBackList from './components/FeedBackList'
import Login from './components/Login'
import {useState} from 'react'
import "primereact/resources/themes/vela-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import {HashRouter as Router, Route, Switch } from 'react-router-dom'
import FeedBackListReader from './components/FeedBackListReader';
import UserProfile from './components/UserProfile';


function App() {
   
  const [user, setUser] = useState({user: 'username', email: 'email', password: 'pass', id:''})
  const changeUser = (user)=>{
    setUser(user)
  }
  return (
   <Router>
     <Switch>
      <Route path='/' exact>
        <Login user={user} onUserChange={changeUser}/>
      </Route>
      <Route path='/dashboard' exact>
       <FeedBackList user={user}/>
      </Route>
      <Route path='/frontpage' exact>
       <FeedBackListReader/>
      </Route>
      <Route path='/user' exact>
        <UserProfile user={user}/>
      </Route>
    </Switch>
   </Router>
  )
}

export default App;
