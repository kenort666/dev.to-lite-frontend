import React from 'react';
import { Box, Divider, Paper, Typography } from '@mui/material';
import { IPostDescComment } from '../../@types';
import { AddCommentForm } from '../AddCommentForm/AddCommentForm';
import { Comment } from './Comment';

export const PostComments: React.FC<{
  comments: IPostDescComment[] | undefined;
}> = ({ comments }) => {
  return (
    <Paper elevation={0} sx={{ padding: '35px', borderRadius: '12px' }}>
      <Typography variant="h6" color="initial">
        {comments?.length} комментариев
      </Typography>

      <AddCommentForm />

      {comments?.length ? (
        comments.map((obj) => (
          <Box key={obj._id}>
            <Comment
              user={obj.user}
              CommentText={obj.CommentText}
              createdAt={obj.createdAt}
              _id={obj._id}
            />
            <Divider sx={{ marginBottom: '5px' }} />
          </Box>
        ))
      ) : (
        <h3>Комментарии отсутстувуют!</h3>
      )}
    </Paper>
  );
};
