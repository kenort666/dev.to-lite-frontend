import { Box, Grid, LinearProgress } from '@mui/material';
import Container from '@mui/material/Container';
import React from 'react';
import { IUser } from '../../@types';
import { Post } from '../../components/Post/Post';
import { SideComments } from '../../components/SideBlock/SideComments/SideComments';
import { TagsBlock } from '../../components/SideBlock/SideTags/TagsBlock';
import { useAllPosts } from '../../hooks/posts/useAllPosts';
import { useAuth } from '../../store';
import { useFindPosts } from '../../hooks/tags/useFindPosts';
import { useParams } from 'react-router-dom';

const Home: React.FC = () => {
  const { isLoading, posts } = useAllPosts();
  const { name: tagEndPoint } = useParams();
  const { res } = useFindPosts(String(tagEndPoint));
  const userData = useAuth((state) => state.user as IUser);

  if (isLoading) return <LinearProgress color="secondary" />;

  return (
    <Container maxWidth="lg">
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {tagEndPoint ? (
            res?.data.map((obj, index) => (
              <Post
                imageUrl={
                  obj.imageUrl ? `http://localhost:5000/api${obj.imageUrl}` : ''
                }
                viewsCount={obj.viewsCount}
                title={obj.title}
                text={obj.text}
                tags={obj.tags}
                createdAt={obj.createdAt}
                updatedAt={obj.updatedAt}
                _id={obj._id}
                user={obj.user}
                key={index}
                comments={obj.comments}
                isEditable={obj.user._id === userData.id}
              />
            ))
          ) : posts?.data.length ? (
            posts?.data.map((obj) => (
              <Post
                imageUrl={
                  obj.imageUrl ? `http://localhost:5000/api${obj.imageUrl}` : ''
                }
                viewsCount={obj.viewsCount}
                title={obj.title}
                text={obj.text}
                tags={obj.tags}
                createdAt={obj.createdAt}
                updatedAt={obj.updatedAt}
                _id={obj._id}
                user={obj.user}
                key={obj._id}
                comments={obj.comments}
                isEditable={obj.user._id === userData.id}
              />
            ))
          ) : (
            <h1 style={{ textAlign: 'center' }}>Посты отсутствуют!</h1>
          )}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock />
          <SideComments />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
