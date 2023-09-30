import { useMutation } from '@tanstack/react-query';
import { PostsService } from '../../services/posts.service';
import { toast } from 'react-toastify';
import { queryClient } from '../..';

export const useDeletePost = () => {
  const { mutate } = useMutation(
    ['deletePost'],
    (id: string) => PostsService.deletePost(id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['posts']);
        toast.success('Статья удалена успешно!');
      },
      onError: (err) => {
        toast.error('Не удалось удалить статью!');
        console.warn(err);
      },
    }
  );

  return { mutate };
};
