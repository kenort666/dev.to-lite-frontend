import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import AuthService from '../../services/auth.service';
import { useAuth } from '../../store';

export const useUserLogout = () => {
  const logoutFromAcc = useAuth((state) => state.logoutUser);

  const { mutate } = useMutation(
    ['logoutUser'],
    () => AuthService.fetchUserLogout(),
    {
      onSuccess: () => {
        localStorage.removeItem('token');
        logoutFromAcc();
        toast('Вы успешно вышли из аккаунта!');
      },
      onError: (err: any) => {
        toast.error(err.response.data.message);
        console.warn(`Ошибка ${err}`);
      },
    }
  );

  return { mutate };
};
