import { type FC } from 'react';
import {
  Card,
  CardContent,
  CardHeader as UICardHeader,
  CardActions,
  Typography,
  Container,
  IconButton,
  Tooltip,
  Divider,
} from '@/shared/ui';
import { ThumbUp, ThumbDown, Comment } from '@/shared/ui/icons';
import { PostUpdateAction, type Post } from '../types';
import { NavLink } from 'react-router';
import { useMyPostManipulationsState } from '../lib';
import { useUpdatePostMutation } from '@/shared/store/api';

interface PostCardProps {
  data: Post;
  link?: string;
}

const CardHeader: FC<Pick<Post, 'title' | 'userId'>> = ({ title, userId }) => {
  return (
    <UICardHeader
      title={
        <Typography
          variant='h6'
          component='h2'
          noWrap
        >
          {title}
        </Typography>
      }
      subheader={`User #${userId}`}
    />
  );
};

export const PostCard: FC<PostCardProps> = ({ data: { id, body, reactions, title, userId }, link }) => {
  const [updatePost] = useUpdatePostMutation();
  const { isLiked, isDisliked, isStarred } = useMyPostManipulationsState(id);

  const setLike = () => {
    updatePost({
      id,
      action: PostUpdateAction.LIKE,
      reactions: {
        ...reactions,
        likes: isLiked ? reactions.likes - 1 : reactions.likes + 1,
        dislikes: isDisliked ? reactions.dislikes - 1 : reactions.dislikes,
      },
    });
  };

  const setDislike = () => {
    updatePost({
      id,
      action: PostUpdateAction.DISLIKE,
      reactions: {
        ...reactions,
        dislikes: isDisliked ? reactions.dislikes - 1 : reactions.dislikes + 1,
        likes: isLiked ? reactions.likes - 1 : reactions.likes,
      },
    });
  };

  const addToStarred = () => {
    updatePost({
      id,
      action: PostUpdateAction.STARRED,
      reactions,
    });
  };

  return (
    <Card
      sx={{
        maxWidth: '100%',
        mb: 3,
        transition: 'box-shadow 0.2s ease-in-out',
        '&:hover': {
          boxShadow: 6,
        },
      }}
      elevation={2}
    >
      {link ?
        <NavLink to={link}>
          <CardHeader
            title={title}
            userId={userId}
          />
        </NavLink>
      : <CardHeader
          title={title}
          userId={userId}
        />
      }
      <CardContent>
        <Typography
          variant='body1'
          color='text.secondary'
          sx={{
            mb: 2,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {body}
        </Typography>
      </CardContent>
      <Divider />
      <CardActions sx={{ justifyContent: 'flex-end', px: 2 }}>
        <Container sx={{ display: 'flex', gap: 2 }}>
          <Container sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Tooltip title='Like'>
              <IconButton
                size='small'
                onClick={setLike}
              >
                <ThumbUp color={isLiked ? 'success' : 'inherit'} />
              </IconButton>
            </Tooltip>
            <Typography
              variant='body2'
              color={isLiked ? 'success' : 'inherit'}
            >
              {reactions.likes}
            </Typography>
          </Container>
          <Container sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Tooltip title='Dislike'>
              <IconButton
                size='small'
                onClick={setDislike}
              >
                <ThumbDown color={isDisliked ? 'error' : 'inherit'} />
              </IconButton>
            </Tooltip>
            <Typography
              variant='body2'
              color={isDisliked ? 'error' : 'inherit'}
            >
              {reactions.dislikes}
            </Typography>
          </Container>
          <Tooltip title='Comment'>
            <IconButton
              size='small'
              onClick={() => console.log('comment')}
            >
              <Comment />
            </IconButton>
          </Tooltip>
        </Container>
      </CardActions>
    </Card>
  );
};
