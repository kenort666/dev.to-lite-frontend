import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { IUser } from '../../@types';
import { useUserLogout } from '../../hooks/auth/useUserLogout';
import { useAuth } from '../../store';
import { stringAvatar, stringToColor } from '../../utils/avatar/formatAvatars';
import styles from './Header.module.scss';

export const Header: React.FC = () => {
  let isAuth = useAuth((state) => state.isAuth);
  const user = useAuth((state) => state.user as IUser);

  const { mutate: logOut } = useUserLogout();

  const logoutUser = () => {
    if (window.confirm('Вы действительно хотите выйти?')) {
      logOut();
    }
  };

  return (
    <div style={{ backgroundColor: '#fff' }}>
      <AppBar position="static">
        <Container maxWidth="lg">
          <Toolbar>
            <Typography
              color="secondary"
              variant="h6"
              component="div"
              sx={{
                flexGrow: 1,
                fontWeight: 700,
                textDecoration: '',
                boxShadow: 'none',
              }}
            >
              <Link
                to="/"
                style={{ textDecoration: 'none', display: 'inline-flex' }}
              >
                <div className={styles.logo}>DEV.TO LITE</div>
              </Link>
            </Typography>

            {isAuth ? (
              <>
                <Box mr={1}>
                  <Link to="/writePost">
                    <Button
                      color="secondary"
                      variant="contained"
                      sx={{ marginright: 5 }}
                    >
                      Написать статью
                    </Button>
                  </Link>
                </Box>
                <Button onClick={logoutUser} color="error" variant="contained">
                  Выйти
                </Button>

                {user.hasOwnProperty('userAvatar') ? (
                  <Avatar
                    sx={{ marginLeft: 1 }}
                    src={`http://localhost:5000/api${user.userAvatar}`}
                  />
                ) : (
                  <Avatar
                    sx={{
                      bgcolor: stringToColor(user.name + ' ' + user.surname),
                      marginLeft: '10px',
                    }}
                    {...stringAvatar(user.name + ' ' + user.surname)}
                  />
                )}
              </>
            ) : (
              <>
                <Box mr={1}>
                  <Link to="/login">
                    <Button
                      color="secondary"
                      variant="outlined"
                      sx={{ marginright: 5 }}
                    >
                      Войти
                    </Button>
                  </Link>
                </Box>
                <Link to="/register">
                  <Button color="secondary" variant="contained">
                    Регистрация
                  </Button>
                </Link>
              </>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
};
