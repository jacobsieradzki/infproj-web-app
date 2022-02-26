import Button from 'components/Button/Button'
import { HOME_ROUTE } from 'constants/navigation'
import React, { useEffect, useState } from 'react'
import fetchMemberships from 'classroomapi/fetchMemberships'
import AppLayoutStyle from 'components/AppLayout/AppLayout.style'
import { CaptionUppercase, HorizontalStack, Spacer } from 'components/GlobalStyles'
import LoginPopup from 'components/User/LoginPopup'
import useAuthContext from 'contexts/AuthContext'
import CssBaseline from '@mui/material/CssBaseline';

const AppLayout: React.FC = ({ children }) => {

  const { authState, isLoggedIn, setMemberships, logOut } = useAuthContext();
  const { user = null } = authState;

  const [loginPopup, setLoginPopup] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      fetchMemberships(authState).then(x => {
        setMemberships(x);
        console.log(x);
      }).catch(e => {
        setMemberships([]);
        console.log(e);
      });
    } else {
      setMemberships([]);
    }
  }, [isLoggedIn]);

  return (
    <AppLayoutStyle.Page id={"page"}>
      <CssBaseline />

      <LoginPopup isOpen={loginPopup} closeModal={() => setLoginPopup(false)} />

      <AppLayoutStyle.Header>
        <a id={"logo"} href={HOME_ROUTE}>Classroom</a>
        <Spacer />

        <HorizontalStack gap={20} align={"center"}>
          {isLoggedIn && <CaptionUppercase>{user?.first_name} {user?.last_name}</CaptionUppercase>}
          {isLoggedIn ? (
            <Button onClick={() => logOut()} style={"secondary"} size={"sm"}>Log Out</Button>
          ) : (
            <Button onClick={() => setLoginPopup(true)} style={"secondary"} size={"sm"}>Login</Button>
          )}
        </HorizontalStack>
      </AppLayoutStyle.Header>

      <AppLayoutStyle.Content>
        {children}
      </AppLayoutStyle.Content>

    </AppLayoutStyle.Page>
  )
}

export default AppLayout