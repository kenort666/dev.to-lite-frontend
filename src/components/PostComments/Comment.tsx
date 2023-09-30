import CloseIcon from '@mui/icons-material/Close';
import { Avatar, Box, IconButton, Tooltip } from '@mui/material';
import React from 'react';
import { IUser, IPostDescComment } from '../../@types';
import { useDeleteComment } from '../../hooks/posts/comments/useDeleteComment';
import { useAuth } from '../../store';
import { stringAvatar, stringToColor } from '../../utils/avatar/formatAvatars';
import { formatDate } from '../../utils/date/formatDate';

export const Comment: React.FC<IPostDescComment> = ({
  CommentText,
  createdAt,
  user,
  _id: commentId,
}) => {
  const { mutate } = useDeleteComment();
  const authUser = useAuth((state) => state.user as IUser);

  const deleteComment = () => {
    return commentId ? mutate(commentId) : null;
  };

  return (
    <>
      <Box>
        <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '25px' }}>
          {user.hasOwnProperty('userAvatar') ? (
            <Avatar src={`http://localhost:5000/api${user.userAvatar}`} />
          ) : (
            <Avatar
              sx={{
                bgcolor: stringToColor(user.name + ' ' + user.surname),
              }}
              {...stringAvatar(user.name + ' ' + user.surname)}
            />
          )}
          <b style={{ margin: '0 5px 0 15px' }}>{user.name}</b>
          <b style={{ margin: '0 10px 0 0' }}>{user.surname}</b>
          <div style={{ fontSize: '13px', lineHeight: '20px', color: 'gray' }}>
            {formatDate(createdAt)}
          </div>
          <Box display="flex" justifyContent="space-between">
            {user._id === authUser.id ? (
              <Tooltip title="Удалить комментарий">
                <IconButton onClick={deleteComment} color="error">
                  <CloseIcon />
                </IconButton>
              </Tooltip>
            ) : (
              ''
            )}
          </Box>
        </Box>
        <Box sx={{ fontSize: '18px', margin: '15px 0 20px 0' }}>
          {CommentText}
        </Box>
      </Box>
    </>
  );
};
