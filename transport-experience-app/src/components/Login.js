// import { useParams } from 'react-router-dom';
import { useState, useEffect,useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { useHistory } from 'react-router-dom';
import React from 'react';
import './Login.css';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { useSelector, shallowEqual, useDispatch } from 'react-redux'
import { userActions } from '../actions'
import { Toast } from "primereact/toast";

const userListSelector = state => state.user.usersList;

function Login(props) {

  const clientId = '434716652166-ppknk86m7bblshij8q1ooejioch6vuo6.apps.googleusercontent.com';
  const {user, onUserChange} = props
  const [userEmail, setUserEmail] = useState(user.email)
  const [userUsername, setUserUsername] = useState(user.username)
  const [userPassword, setUserPassword] = useState(user.password)

  const [username, setUsername] = useState([]);
  const [password, setPassword] = useState([]);
  const [existingEmail, setExistingEmail] = useState([]);
  const [existingPassword, setExistingPassword] = useState([]);
  const [correctUser,setCorrectUser] = useState([]);
  const [email, setEmail] = useState([]);
  const history = useHistory();
  const toast = useRef(null);
  const userList = useSelector(userListSelector, shallowEqual)
  // let [userList, setUserList] = useState([]);
  const dispatch = useDispatch()
  
  useEffect(() => {
    // console.log(this.state.user.userList)
    // setCorrectUser(false)
    dispatch(userActions.getUsers())
    // userList = dispatch(userActions.getUsers())
    console.log(userList)
  }, [dispatch])

  const handleRegister = () => {
    let v = true;
      userList.map((us) => { 
        if(us.email === existingEmail) {
          v = false;
          toast.current.show({
            severity: "error",
            summary: "Error",
            detail: "Choose different username!",
            life: 3000,
          });
        }})
        if(v === true)
        dispatch(userActions.addUser({username, password, email}));
        userList.push({username, password, email});
        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "User created!",
          life: 3000,
        });
        setUsername("")
        setPassword("")
        setEmail("")
      
  };
  const handleLogin = () => {
    setCorrectUser(false)
    if (existingEmail && existingPassword){
      userList.map((us) => { 
        if(us.password === existingPassword && us.email === existingEmail) {
          setCorrectUser(true)
          setUsername(us.username)
          setPassword(us.password)
          setEmail(us.email)
          onUserChange({username, password, email})
        }})
      console.log("the users:")
      console.log(userList)
      // usersList.find(element => element.email === existingEmail )
      if(correctUser === true){
        history.push('/dashboard');
        setCorrectUser(false)
      }
      else{
        console.log('Incorrect credentials')
        toast.current.show({
          severity: "error",
          summary: "Incorrect credentials",
          detail: "Email and password don't match",
          life: 3000,
        });
      }
    }
  };

  const handleEnterWithoutAccount = () => {
    history.push('/frontpage');
  };
  const [showloginButton, setShowloginButton] = useState(true);
    const [showlogoutButton, setShowlogoutButton] = useState(false);
    const onLoginSuccess = (res) => {
        console.log('Login Success:', res.profileObj);
        setShowloginButton(false);
        setShowlogoutButton(true);
        history.push('/dashboard');
    };

    const onLoginFailure = (res) => {
        console.log('Login Failed:', res);
    };

    const onSignoutSuccess = () => {
        alert('You have been logged out successfully');
        console.clear();
        setShowloginButton(true);
        setShowlogoutButton(false);
    };


  return (
    <div className='root'>
      <Toast ref={toast} />
      <link rel='stylesheet' href='Login.css'></link>
      <div className='form' id='loginForm'>
        <div className='p-mb-3 p-text-center p-text-capitalize p-text-bold centerText'>
         <p className="formTitle">Sign In</p>
        </div>
        <br />
        <br />
        <div>
          <span className='p-float-label input'>
            <InputText
              id='existingEmail'
              value={existingEmail}
              onChange={(e) => setExistingEmail(e.target.value)}
            />
            <label htmlFor='existingEmail' className='input'>Email</label>
          </span>
          <span className='p-float-label input'>
            <Password
              value={existingPassword}
              onChange={(e) => setExistingPassword(e.target.value)}
              toggleMask
            />
          </span>
        </div>
        <br />
        <br />
        <div className='centerText'>
          <Button
            label='Login'
            className='p-button-outlined centerText'
            onClick={handleLogin}
          />
        </div>

        <div  className='externLogin'>
        { showloginButton ?
                <GoogleLogin
                    clientId={clientId}
                    buttonText='Sign In'
                    onSuccess={onLoginSuccess}
                    onFailure={onLoginFailure}
                    cookiePolicy={'single_host_origin'}
                    isSignedIn={true}
                /> : null}

            { showlogoutButton ?
                <GoogleLogout
                    clientId={clientId}
                    buttonText='Sign Out'
                    onLogoutSuccess={onSignoutSuccess}
                    className='externLogin'
                >
                </GoogleLogout> : null
            }
        </div>
      </div>
      <div className='form'>
        <div className='p-mb-3 p-text-center p-text-capitalize p-text-bold centerText'>
        <p className="formTitle">Register New User</p> 
        </div>
        <br />
        <br />
        <div>
          <span className='p-float-label input'>
            <InputText
              id='newUsername'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label htmlFor='newUsername'>New Username</label>
          </span>
          <span className='p-float-label input'>
            <InputText
              id='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor='email' className='labels'>Email</label>
          </span>

          <span className='p-float-label input'>
            <Password
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              toggleMask
            />
          </span>
        </div>
        <br />
        <br />
        <div className='centerText'>
          <Button
            label='Register'
            className='p-button-outlined'
            onClick={handleRegister}
          />
        </div>
        <div className='centerText footer'>
          <Button
            label='Enter without creating account'
            className='p-button-outlined'
            onClick={handleEnterWithoutAccount}
          />
        </div>
      </div>
      <div>
        {/* {
          usersList.map(e => <div> {e.username} has the passoword {e.password}</div>)
        } */}
      </div>
    </div>
  );
}

export default Login;
