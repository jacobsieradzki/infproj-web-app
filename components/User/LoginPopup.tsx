import { fetchUser } from 'classroomapi/useGetUser'
import Button from 'components/Button/Button'
import Loader from 'components/Loader/Loader'
import useAuthContext from 'contexts/AuthContext'
import User from 'models/User'
import React, { useEffect, useState } from 'react'
import { Spacer } from 'components/GlobalStyles'
import Popup, { PopupProps } from 'components/Popup/Popup'
import LoginPopupStyles from 'components/User/LoginPopup.style'
import TextField from '@mui/material/TextField';

type LoginPopupProps = {

}

export const LoginPopup: React.FC<PopupProps & LoginPopupProps> = ({ isOpen, closeModal }) => {

  const { setUser, setCredentials } = useAuthContext();

  useEffect(() => {
    if (!isOpen) {
      setLoading(false);
      setError(false);
      _setUsername("");
      _setPassword("");
    }
  }, [isOpen]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [username, _setUsername] = useState("");
  const [password, _setPassword] = useState("");

  const setUsername = (str: string) => {
    if (!loading) _setUsername(str);
  }

  const setPassword = (str: string) => {
    if (!loading) _setPassword(str);
  }

  const onLogin = () => {
    if (loading) return;
    if (username?.length > 0 && username?.length > 0) {
      setError(null);
      setLoading(true);
      fetchUser(username, password).then(onLoginCompleted).catch(onLoginError);
    } else {
      setError("Invalid username and password.");
    }
  }

  const onLoginCompleted = (user: User) => {
    setLoading(false);
    setUser(user);
    setCredentials({ username, password });
    closeModal();
  }

  const onLoginError = error => {
    setLoading(false);
    console.log(error);
    setError("Something went wrong - please try again later. (" + error + ")");
  }

  return (
    <Popup isOpen={isOpen} closeModal={closeModal} title={"Login"}>
      <LoginPopupStyles.Layout>
        <Spacer />

        <div className={"text-field"}>
          <TextField fullWidth
            variant={"outlined"}
            margin={"dense"}
            label={"Username"}
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </div>

        <div className={"text-field"}>
          <TextField fullWidth
            variant={"outlined"}
            margin={"dense"}
            label={"Password"}
            type={"password"}
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>

        {error && <span className={'error'}>{error}</span>}

        <Spacer />

        {!loading ? (
          <div className={'buttons'}>
            <Button onClick={closeModal} style={"inverse-neutral"}>
              Close
            </Button>
            <Spacer />
            <Button onClick={onLogin} style={"inverse"} variant={"filled"}>
              Login
            </Button>
          </div>
        ) : (
          <div className={'buttons'}>
            <Spacer /><Loader size={24} color={"var(--background-color)"} /><Spacer />
          </div>
        )}

      </LoginPopupStyles.Layout>
    </Popup>
  )
}

export default LoginPopup