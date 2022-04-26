import Button from 'components/Button/Button'
import { ABOUT_ROUTE, HOME_ROUTE } from 'constants/navigation'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import fetchMemberships from 'classroomapi/fetchMemberships'
import AppLayoutStyle from 'components/AppLayout/AppLayout.style'
import { CaptionUppercase, HorizontalStack, Spacer } from 'components/GlobalStyles'
import LoginPopup from 'components/User/LoginPopup'
import useAuthContext from 'contexts/AuthContext'
import CssBaseline from '@mui/material/CssBaseline';

const AppLayout: React.FC = ({ children }) => {

  const router = useRouter();
  const { authState, isLoggedIn, setMemberships, logOut, setPopup } = useAuthContext();
  const { user = null, popup } = authState;

  const closeLoginPopup = () => setPopup(false);

  useEffect(() => {
    if (isLoggedIn && setMemberships) {
      fetchMemberships(authState)
        .then(x => setMemberships(x))
        .catch(e => setMemberships([]));
    } else {
      setMemberships([]);
    }
  }, [isLoggedIn]);

  let showUser = router.pathname != "/about";
  let href = router.pathname == HOME_ROUTE ? ABOUT_ROUTE : HOME_ROUTE;

  return (
    <AppLayoutStyle.Page id={"page"}>
      <CssBaseline />

      <LoginPopup isOpen={popup} closeModal={closeLoginPopup} />

      <AppLayoutStyle.Header>
        <a id={"logo"} href={href}>Classroom</a>
        <Spacer />

        {showUser && <HorizontalStack gap={20} align={'center'}>
          {isLoggedIn && <CaptionUppercase>{user?.first_name} {user?.last_name}</CaptionUppercase>}
          {isLoggedIn ? (
            <Button onClick={() => logOut()} style={'secondary'} size={'sm'}>Log Out</Button>
          ) : (
            <Button onClick={() => setPopup(true)} style={'secondary'} size={'sm'}>Login</Button>
          )}
        </HorizontalStack>}
      </AppLayoutStyle.Header>

      <AppLayoutStyle.Content>
        {children}
      </AppLayoutStyle.Content>

    </AppLayoutStyle.Page>
  )
}

export default AppLayout