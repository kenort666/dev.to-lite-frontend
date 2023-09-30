import { useQuery } from '@tanstack/react-query';
import { queryClient } from '../..';
import { PostsService } from '../../services/posts.service';

export const useFindPosts = (tag: string) => {
  const { data: res, isLoading } = useQuery(
    ['findPosts', tag],
    () => PostsService.findPostsByTags(tag),
    {
      onError: (err: any) => {
        queryClient.invalidateQueries(['posts']);
        alert(err.message);
      },
    }
  );

  return { res, isLoading };
};
