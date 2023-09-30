import { useQuery } from '@tanstack/react-query';
import { PostsService } from '../../services/posts.service';
import { queryClient } from '../..';

export const usePostTags = () => {
  const {
    data: tags,
    isLoading,
    isSuccess,
  } = useQuery(['postTags'], () => PostsService.fetchTagsFromPosts(), {
    onError: (err: any) => {
      queryClient.invalidateQueries(['posts']);
      alert(err.message);
    },
  });

  return { tags, isLoading, isSuccess };
};
