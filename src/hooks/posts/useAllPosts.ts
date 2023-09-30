import { useQuery } from '@tanstack/react-query';
import { PostsService } from '../../services/posts.service';
import { queryClient } from '../..';

export const useAllPosts = () => {
  const { data: posts, isLoading } = useQuery(
    ['posts'],
    () => PostsService.fetchPosts(),
    {
      onError: (err: any) => {
        queryClient.invalidateQueries(['posts']);
        console.warn(err.message);
      },
    }
  );

  return { posts, isLoading };
};
