import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { IAuth } from '../../@types';
import { useUserRegistration } from '../../hooks/auth/useUserRegistration';
import ImgService from '../../services/img.service';
import { toast } from 'react-toastify';

const Register: React.FC = () => {
  const [userAvatar, setUserAvatar] = React.useState('');
  const inputFileRef = React.useRef<HTMLInputElement>(null);

  const { mutate: registerUser } = useUserRegistration();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      surname: '',
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  const onSubmit = (values: IAuth) => {
    if (userAvatar) {
      registerUser({ ...values, userAvatar });
    } else {
      registerUser({ ...values });
    }
  };

  const handleChangeFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const formData = new FormData();
      if (!e.target.files) throw new Error('Отсутствует файл изображения!');
      const file = e.target.files[0];
      formData.append('image', file);
      const { data } = await ImgService.uploadImg(formData);
      setUserAvatar(data.url);
    } catch (err) {
      console.warn(err);
      toast.error('Ошибка при загрузке файла!');
    }
  };

  const onClickRemoveImage = () => {
    setUserAvatar('');
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
          Создание аккаунта
        </Typography>
        <Box>
          <Box
            flexDirection="column"
            display="flex"
            alignItems="center"
            justifyContent="center"
            marginBottom="15px"
          >
            <Avatar
              sx={{
                width: '80px',
                height: '80px',
                cursor: 'pointer',
                title: 'Загрузить аватар',
                marginBottom: '15px',
              }}
              src={userAvatar ? `http://localhost:5000/api${userAvatar}` : ''}
            />
            <Box display="flex">
              <Button
                color="secondary"
                variant="contained"
                onClick={() => inputFileRef.current?.click()}
              >
                Загрузить аватар (опционально)
              </Button>
              <input
                type="file"
                hidden
                onChange={handleChangeFile}
                ref={inputFileRef}
              />
              {userAvatar && (
                <Button
                  variant="contained"
                  color="error"
                  onClick={onClickRemoveImage}
                  sx={{ marginLeft: '10px' }}
                >
                  Удалить
                </Button>
              )}
            </Box>
          </Box>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ display: 'flex', flexDirection: 'column' }}
          >
            <TextField
              id="outlined-basic"
              color="secondary"
              label="Имя"
              variant="outlined"
              margin="normal"
              error={Boolean(errors.name?.message)}
              helperText={errors.name?.message}
              {...register('name', { required: 'Введите имя' })}
            >
              Имя
            </TextField>
            <TextField
              id="outlined-basic"
              color="secondary"
              label="Фамилия"
              variant="outlined"
              margin="normal"
              error={Boolean(errors.surname?.message)}
              helperText={errors.surname?.message}
              {...register('surname', { required: 'Введите фамилию' })}
            >
              Фамилия
            </TextField>
            <TextField
              id="outlined-basic"
              color="secondary"
              label="E-Mail"
              variant="outlined"
              margin="normal"
              type="email"
              error={Boolean(errors.email?.message)}
              helperText={errors.email?.message}
              {...register('email', { required: 'Введите e-mail' })}
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
            >
              Пароль
            </TextField>
            <Button
              color="secondary"
              variant="contained"
              sx={{ marginTop: 2 }}
              size="large"
              type="submit"
            >
              Регистрация
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default Register;
