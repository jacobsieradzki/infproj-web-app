import React, { useEffect, useState } from 'react'
import fetchMemberships from 'classroomapi/fetchMemberships'
import { Button } from '@mui/material'
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
      fetchMemberships(authState).then(x => setMemberships(x)).catch(e => setMemberships([]));
    } else {
      setMemberships([]);
    }
  }, [user]);

  return (
    <AppLayoutStyle.Page id={"page"}>
      <CssBaseline />

      <LoginPopup isOpen={loginPopup} closeModal={() => setLoginPopup(false)} />

      <AppLayoutStyle.Header>
        <h1>Classroom</h1>
        <Spacer />

        <HorizontalStack gap={8} align={"center"}>
          {isLoggedIn && <CaptionUppercase>{user?.first_name} {user?.last_name}</CaptionUppercase>}
          {isLoggedIn
            ? <Button onClick={() => logOut()} color={"error"}>Log Out</Button>
            : <Button onClick={() => setLoginPopup(true)} color={"secondary"}>Login</Button>}
        </HorizontalStack>
      </AppLayoutStyle.Header>

      <AppLayoutStyle.Content>
        {children}
      </AppLayoutStyle.Content>

    </AppLayoutStyle.Page>
  )
}

export default AppLayout