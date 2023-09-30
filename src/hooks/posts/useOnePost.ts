import { useQuery } from '@tanstack/react-query';
import { PostsService } from '../../services/posts.service';
import { queryClient } from '../..';

export const useOnePost = (id: string) => {
  const {
    data: post,
    isLoading,
    isSuccess,
  } = useQuery(['post', id], () => PostsService.fetchOnePost(id), {
    onError: (err: any) => {
      alert(err.message);
    },
    enabled: !!id,
  });

  return { post, isLoading, isSuccess };
};
