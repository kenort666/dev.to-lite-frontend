import { useMutation } from '@tanstack/react-query';
import { PostsService } from '../../../services/posts.service';
import { queryClient } from '../../..';
import { toast } from 'react-toastify';
import { CommentService } from '../../../services/comments.service';

export const useUserComment = () => {
  const { mutate } = useMutation(
    ['userComments'],
    ({
      pageId,
      user,
      CommentText,
    }: {
      pageId: string;
      user: string;
      CommentText: string;
    }) => CommentService.postComment(pageId, user, CommentText),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['post']);
        queryClient.invalidateQueries(['posts']);
        queryClient.invalidateQueries(['firstComments']);
        toast.success('Комментарий опубликован!');
      },
      onError: (err) => {
        toast.error('Не удалось опубликовать комментарий!');
        console.warn(err);
      },
    }
  );

  return { mutate };
};
