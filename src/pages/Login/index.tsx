import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { IAuth } from '../../@types';
import { useUserLogin } from '../../hooks/auth/useUserLogin';

const Login: React.FC = () => {
  const { mutate } = useUserLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'all',
  });

  const onSubmit = (values: IAuth) => {
    mutate(values);
  };

  return (
    <Card
      sx={{
        width: '400px',
        margin: '50px auto',
        padding: '40px',
        textAlign: 'center',
      }}
    >
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Typography sx={{ fontSize: 26, fontWeight: 700 }} gutterBottom>
          Войти в аккаунт
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <TextField
            id="outlined-basic"
            color="secondary"
            label="E-Mail"
            variant="outlined"
            margin="normal"
            type="email"
            error={Boolean(errors.email?.message)}
            helperText={errors.email?.message}
            {...register('email', { required: 'Введите E-mail' })}
            fullWidth
          >
            E-Mail
          </TextField>
          <TextField
            id="outlined-basic"
            color="secondary"
            variant="outlined"
            label="Пароль"
            margin="normal"
            error={Boolean(errors.password?.message)}
            helperText={errors.password?.message}
            {...register('password', { required: 'Введите пароль' })}
            fullWidth
          >
            Пароль
          </TextField>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              marginTop: '10px',
              justifyContent: 'space-between',
            }}
          >
            <Button
              color="secondary"
              variant="contained"
              sx={{ alignItems: 'center' }}
              size="large"
              type="submit"
            >
              Войти
            </Button>
            <Link
              to="/register"
              color="inherit"
              style={{
                alignItems: 'center',
                textDecoration: 'none',
                color: 'inherit',
              }}
            >
              Нет аккаунта?
            </Link>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default Login;
