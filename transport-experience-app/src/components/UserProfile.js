// import './App.css';
import "primereact/resources/themes/vela-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { Button } from "primereact/button";
import { useHistory } from "react-router-dom";
import "./UserProfile.css";
import { InputText } from "primereact/inputtext";
import { useEffect, useState } from "react";
import { userActions } from "../actions";
import { useSelector, shallowEqual, useDispatch } from "react-redux";

const userListSelector = (state) => state.user.usersList;

function UserProfile(props) {
  const user = props;
  const [userEmail, setUserEmail] = useState(user.email);
  const [userUsername, setUserUsername] = useState(user.user);
  const [userPassword, setUserPassword] = useState(user.password);
  const dispatch = useDispatch();

  const history = useHistory();
  useEffect(() => {
    setUserEmail(user.email);
    setUserUsername(user.user);
    setUserPassword(user.password);
    console.log(userUsername);
  }, [dispatch]);

  const updateUser = () => {
    console.clear();
    // dispatch(userActions.updateUser(userUsername, userUsername.id));
  };
  const deleteUser = () => {
    console.clear();
    // dispatch(userActions.deleteUser(userUsername.id));
  };
  const goBack = () => {
    console.clear();
    history.push("/dashboard");
  };

  return (
    <>
      <Button
        label="Go back to dashboard"
        className="p-button-outlined back"
        onClick={goBack}
      />
      <p className="title">Profilul tau</p>
      <div className="lablesDiv">
        <span className="p-float-label input">
          <p className="labels">Username</p>
          <InputText
            value={userUsername.user}
            onChange={(e) => setUserUsername(e.target.value)}
            placeholder={userUsername.username}
          />
        </span>

        <span className="p-float-label input">
          <p className="labels">Email</p>
          <InputText
            value={userUsername.email}
            onChange={(e) => setUserUsername(e.target.value)}
            placeholder={userUsername.username}
          />
        </span>

        <span className="p-float-label input">
          <p className="labels"> Password</p>
          <InputText
            value={userUsername.password}
            onChange={(e) => setUserPassword(e.target.value)}
            placeholder={userUsername.password}
          />
        </span>
      </div>
      <div className="button footer">
        <Button
          label="Update your profile"
          className="p-button-outlined"
          onClick={updateUser}
        />
        <Button
          label="Delete your account"
          className="p-button-outlined"
          onClick={deleteUser}
        />
      </div>
    </>
  );
}

export default UserProfile;
