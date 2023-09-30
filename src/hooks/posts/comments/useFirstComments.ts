import { useQuery } from '@tanstack/react-query';
import { CommentService } from '../../../services/comments.service';

export const useFirstComments = () => {
  const {
    data: firstComments,
    isLoading,
    isSuccess,
  } = useQuery(['firstComments'], () => CommentService.getFirstComments(), {
    onError: (err) => {
      console.log(err);
    },
  });

  return { firstComments, isLoading, isSuccess };
};
