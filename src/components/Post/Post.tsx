import {
  Visibility,
  Edit,
  Close,
  ChatBubbleOutline,
} from '@mui/icons-material';
import {
  Avatar,
  Box,
  IconButton,
  List,
  Tooltip,
  Typography,
} from '@mui/material';
import classNames from 'classnames';
import React from 'react';
import styles from './Post.module.scss';
import { Link } from 'react-router-dom';
import { IPost } from '../../@types';
import { useDeletePost } from '../../hooks/posts/useDeletePost';
import { formatDate, stringAvatar, stringToColor } from '../../utils';
import { useReadingTime } from 'react-hook-reading-time';

export const Post: React.FC<IPost> = ({
  isFullPost,
  children,
  tags,
  _id,
  createdAt,
  imageUrl,
  title,
  user,
  viewsCount,
  isEditable,
  comments,
  text,
}) => {
  const { mutate: deletePost } = useDeletePost();

  const { text: timeToRead } = useReadingTime(text);

  const onClickRemove = () => {
    if (window.confirm('Вы действительно хотите удалить статью?')) {
      deletePost(_id);
    }
  };

  return (
    <Box
      sx={[
        isFullPost
          ? {
              width: 1150,
              border: '1px solid #ffffff',
              borderRadius: '15px',
              overflow: 'hidden',
              marginBottom: '15px',
              marginTop: '30px',
            }
          : {
              width: 660,
              height: 535,
              border: '1px solid #ffffff',
              borderRadius: '15px',
              overflow: 'hidden',
              marginBottom: '15px',
              marginTop: '30px',
              '&:hover': {
                border: '1.4px solid darkblue',
              },
            },
      ]}
    >
      <Link
        to={`/posts/${_id}`}
        style={{ pointerEvents: isFullPost ? 'none' : 'visible' }}
      >
        <img
          className={classNames(styles.image, {
            [styles.imageFull]: isFullPost,
          })}
          src={imageUrl}
          alt={title}
        />
      </Link>

      <Box
        sx={{
          bgcolor: '#ffffff',
          padding: `${isFullPost ? '25px' : '20px'}`,
        }}
      >
        <Box p="10px" display="flex" justifyContent="space-between">
          <Box display="flex">
            {user.hasOwnProperty('userAvatar') ? (
              <Avatar
                sx={{ marginRight: '15px' }}
                src={`http://localhost:5000/api${user.userAvatar}`}
              />
            ) : (
              <Avatar
                sx={{
                  bgcolor: stringToColor(user.name + ' ' + user.surname),
                  marginRight: '15px',
                }}
                {...stringAvatar(user.name + ' ' + user.surname)}
              />
            )}

            <Box display="flex" flexDirection="column">
              <Box display="flex" marginBottom="5px" color="">
                <Box mr="5px" fontWeight="600">
                  {user?.name}
                </Box>
                <Box fontWeight="600">{user?.surname}</Box>
              </Box>
              <Box fontSize="15px" fontWeight="400" color="primary.dark">
                {formatDate(createdAt)}
              </Box>
            </Box>
          </Box>

          {isEditable ? (
            <Box display="flex">
              <Tooltip title="Редактировать статью">
                <IconButton href={`/posts/${_id}/edit`}>
                  <Edit color="secondary" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Удалить статью">
                <IconButton onClick={onClickRemove} color="error">
                  <Close />
                </IconButton>
              </Tooltip>
            </Box>
          ) : (
            ''
          )}
        </Box>

        <Typography
          variant="h4"
          color="initial"
          sx={{
            fontWeight: '700',
            marginLeft: '65px',
            marginBottom: '8px',
          }}
        >
          {isFullPost ? (
            title
          ) : (
            <Link
              style={{
                textDecoration: 'none',
                color: 'black',
              }}
              to={`/posts/${_id}`}
            >
              <Box sx={{ '&:hover': { color: '#4361ee' } }}>{title}</Box>
            </Link>
          )}
        </Typography>

        <List
          sx={{
            margin: '0 0 0 65px',
            fontSize: '15px',
            color: 'grey',
            display: 'flex',
          }}
        >
          {tags.map((name, i) => (
            <Link
              key={i}
              to={`/tags/${name}`}
              style={{
                marginRight: '15px',
                textDecoration: 'none',
                color: 'inherit',
                fontWeight: '400px',
              }}
            >
              <Box sx={{ '&:hover': { color: '#4361ee' } }}>
                #{name}
              </Box>
            </Link>
          ))}
        </List>
        <Box>{children}</Box>

        <Box
          sx={{
            display: `${isFullPost ? 'none' : 'flex'}`,
            justifyContent: 'space-between',
            alignItems: 'center',
            margin: '10px 0 20px 65px',
          }}
        >
          <Box display="flex">
            <Box display="flex" alignItems="center">
              <Visibility
                fontSize="small"
                sx={{ margin: '0 10px 0 0', color: 'grey' }}
              />
              <span style={{ color: 'grey' }}>{viewsCount}</span>
            </Box>
            <Box display="flex" alignItems="center">
              <ChatBubbleOutline
                fontSize="small"
                sx={{ margin: '0 10px 0 12px', color: 'grey' }}
              />
              <span style={{ color: 'grey' }}>{comments?.length}</span>
            </Box>
          </Box>
          <Box fontStyle="small" sx={{ color: 'grey' }}>
            {timeToRead}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
