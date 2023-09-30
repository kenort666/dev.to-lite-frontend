import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { IAuth } from '../../@types';
import AuthService from '../../services/auth.service';
import { useAuth } from '../../store';
import { toast } from 'react-toastify';

export const useUserLogin = () => {
  const navigate = useNavigate();
  const { authUser, saveUser } = useAuth((state) => state);

  const { mutate, isSuccess } = useMutation(
    ['loginUser'],
    (data: IAuth) => AuthService.fetchUserLogin(data),
    {
      onSuccess: ({ data }) => {
        localStorage.setItem('token', data.accessToken);
        authUser();
        saveUser(data);
        navigate('/');
        toast('Вы успешно вошли в аккаунт!');
      },
      onError: (err: any) => {
        toast.error(err.response.data.message);
        console.warn(`Ошибка ${err}`);
      },
    }
  );

  return { mutate, isSuccess };
};
