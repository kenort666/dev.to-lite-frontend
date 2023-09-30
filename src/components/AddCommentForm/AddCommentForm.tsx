import { Button, Input } from '@mui/material';
import React from 'react';
import { useUserComment } from '../../hooks/posts/comments/useUserComment';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../store';
import { IUser } from '../../@types';

export const AddCommentForm: React.FC = () => {
  const { id: pageId } = useParams();
  const [clicked, setClicked] = React.useState(false);
  const [CommentText, setCommentText] = React.useState('');
  const { id: user } = useAuth((state) => state.user as IUser);

  const { mutate: addComment } = useUserComment();

  const onAddComment = () => {
    setClicked(false);
    if (pageId && CommentText) {
      addComment({ pageId, user, CommentText });
    }
    setCommentText('');
  };

  return (
    <div
      style={{
        position: 'relative',
        padding: '10px 12px 13px 14px',
        backgroundColor: '#f7f7f7',
        border: '1px solid rgba(0,0,0,.03)',
        borderRadius: '10px',
        marginTop: '15px',
      }}
    >
      <Input
        onChange={(e) => setCommentText(e.target.value)}
        value={CommentText}
        sx={{
          '&::before': {
            display: 'none',
          },
          '&::after': {
            display: 'none',
          },
          cursor: 'pointer',
        }}
        fullWidth
        multiline
        minRows={clicked ? 5 : 1}
        onFocus={() => setClicked(true)}
        placeholder="Написать комментарий..."
      />

      {clicked && (
        <Button
          variant="contained"
          color="secondary"
          onClick={onAddComment}
          sx={{
            marginTop: '15px',
          }}
        >
          Опубликовать
        </Button>
      )}
    </div>
  );
};
