import { useMutation } from '@tanstack/react-query';
import { useAuth } from '../../store';
import AuthService from '../../services/auth.service';
import { IAuth } from '../../@types';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const useUserRegistration = () => {
  const navigate = useNavigate();
  const { authUser, saveUser } = useAuth((state) => state);

  const { mutate } = useMutation(
    ['registerUser'],
    (data: IAuth) => AuthService.fetchUserRegistration(data),
    {
      onSuccess: ({ data }) => {
        localStorage.setItem('token', data.accessToken);
        authUser();
        saveUser(data);
        navigate('/');
        toast('Вы успешно зарегистрировались!');
      },
      onError: (err: any) => {
        toast.error(err.response.data.message);
      },
    }
  );

  return { mutate };
};
