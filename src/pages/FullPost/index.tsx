import { Container, LinearProgress } from '@mui/material';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { useParams } from 'react-router-dom';
import { IUser } from '../../@types';
import { Post } from '../../components/Post/Post';
import { PostComments } from '../../components/PostComments/PostComments';
import { useOnePost } from '../../hooks/posts/useOnePost';
import { useAuth } from '../../store';

export const FullPost: React.FC = () => {
  const { id } = useParams();
  const { post, isLoading } = useOnePost(String(id));
  const userData = useAuth((state) => state.user as IUser);

  if (!post || isLoading) {
    return <LinearProgress color="secondary" />;
  }

  return (
    <Container maxWidth="lg">
      <Post
        isFullPost
        createdAt={post.data.createdAt}
        imageUrl={
          post.data.imageUrl
            ? `http://localhost:5000/api${post.data.imageUrl}`
            : ''
        }
        tags={post.data.tags}
        text={post.data.text}
        title={post.data.title}
        updatedAt={post.data.updatedAt}
        viewsCount={post.data.viewsCount}
        _id={post.data._id}
        user={post.data.user}
        isEditable={userData.id === post.data._id}
      >
        <ReactMarkdown children={post.data.text} />
      </Post>
      <PostComments comments={post.data.comments} />
    </Container>
  );
};
