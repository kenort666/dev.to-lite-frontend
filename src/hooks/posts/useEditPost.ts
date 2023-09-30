import { useMutation } from '@tanstack/react-query';
import { PostsService } from '../../services/posts.service';
import { ICreatePost } from '../../@types';
import { useNavigate } from 'react-router-dom';
import { queryClient } from '../..';
import { toast } from 'react-toastify';

export const useEditPost = () => {
  const navigate = useNavigate();

  const { mutate } = useMutation(
    ['createPost'],
    ({ id, fields }: { id: string; fields: ICreatePost }) =>
      PostsService.updatePost(id, fields),
    {
      onSuccess: ({ data }) => {
        queryClient.invalidateQueries(['posts']);
        navigate(`/posts/${data._id}`);
        toast('Вы успешно отредактировали статью!');
      },
      onError: (err) => {
        toast.error('Не удалось отредактировать статью!');
        console.warn(err);
      },
    }
  );

  return { mutate };
};
