import {
  Avatar,
  Box,
  CircularProgress,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography,
} from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { useFirstComments } from '../../../hooks/posts/comments/useFirstComments';
import {
  stringAvatar,
  stringToColor,
} from '../../../utils/avatar/formatAvatars';

export const SideComments: React.FC = () => {
  const { firstComments, isLoading } = useFirstComments();

  return (
    <Paper sx={{ margin: '25px 30px 0 0', padding: '15px 0 0 15px' }}>
      <Typography variant="h6" ml="8px">
        Комментарии
      </Typography>
      {isLoading ? (
        <Box display="flex" justifyContent="center" alignItems="center">
          <CircularProgress color="inherit" />
        </Box>
      ) : firstComments?.data.length ? (
        firstComments?.data.map((data) => (
          <Link
            to={`/posts/${data._id}`}
            style={{ textDecoration: 'none', color: '#000' }}
            key={data._id}
          >
            <ListItem divider alignItems="flex-start">
              <ListItemAvatar>
                {data.user.hasOwnProperty('userAvatar') ? (
                  <Avatar
                    src={`http://localhost:5000/api${data.user.userAvatar}`}
                  />
                ) : (
                  <Avatar
                    sx={{
                      bgcolor: stringToColor(
                        data.user.name + ' ' + data.user.surname
                      ),
                    }}
                    {...stringAvatar(data.user.name + ' ' + data.user.surname)}
                  />
                )}
              </ListItemAvatar>
              <ListItemText
                primary={data.user.name + ' ' + data.user.surname}
                secondary={data.comment.CommentText}
              ></ListItemText>
            </ListItem>
          </Link>
        ))
      ) : (
        <Box padding="5px 0 15px 0" ml="8px">
          Комменатрии отсутствуют!
        </Box>
      )}
    </Paper>
  );
};
