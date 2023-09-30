import { useMutation } from '@tanstack/react-query';
import { PostsService } from '../../services/posts.service';
import { ICreatePost, IErrorResponse } from '../../@types';
import { useNavigate } from 'react-router-dom';
import { queryClient } from '../..';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';

export const useCreatePost = () => {
  const navigate = useNavigate();

  const { mutate } = useMutation(
    ['createPost'],
    (data: ICreatePost) => PostsService.createPost(data),
    {
      onSuccess: ({ data }) => {
        queryClient.invalidateQueries(['posts']);
        queryClient.invalidateQueries(['firstComments']);
        queryClient.invalidateQueries(['postTags']);
        navigate(`/posts/${data._id}`);
        toast('Вы успешно создали статью!');
      },
      onError: (err: AxiosError<IErrorResponse>) => {
        err.response?.data.errors.forEach((err) => {
          toast.error(err.msg);
        });
      },
    }
  );

  return { mutate };
};
