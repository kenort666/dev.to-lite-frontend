import { useMutation } from '@tanstack/react-query';
import { CommentService } from '../../../services/comments.service';
import { toast } from 'react-toastify';
import { queryClient } from '../../..';

export const useDeleteComment = () => {
  const { mutate } = useMutation(
    ['deleteComment'],
    (commentId: string) => CommentService.deleteComment(commentId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['post']);
        queryClient.invalidateQueries(['posts']);
        queryClient.invalidateQueries(['firstComments']);
        toast.success('Вы успешно удалили комментарий');
      },
      onError: (err) => {
        console.warn(err);
      },
    }
  );

  return { mutate };
};
