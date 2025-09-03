import type { FC } from 'react';
import type { Post } from '../types';
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  Divider,
  IconButton,
  Tooltip,
  Typography,
} from '@/shared/ui';
import { Star, ThumbDown, ThumbUp, Delete } from '@/shared/ui/icons';
import { useMyPostManipulationsState, usePostActions } from '../lib';
import { CreateCommentForm, PostCommentsList } from '@/entities/comment';
import { useTranslation } from '@/shared/i18n';

interface PostViewProps {
  post: Post;
}

export const PostView: FC<PostViewProps> = ({ post }) => {
  const { body, reactions, title, userId } = post;
  const { isLiked, isDisliked, isStarred, canDelete } = useMyPostManipulationsState(post);
  const { setDislike, setLike, setStarred, deletePost } = usePostActions(post);
  const { t } = useTranslation(['common', 'post']);

  return (
    <Container>
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
        <CardHeader
          title={title}
          userId={userId}
        />
        <CardContent>
          <Typography
            variant='h6'
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
        <CardActions sx={{ justifyContent: 'space-between', px: 2 }}>
          <Container sx={{ display: 'flex', gap: 2 }}>
            <Tooltip title={t('post:starred')}>
              <IconButton
                size='large'
                onClick={setStarred}
              >
                <Star color={isStarred ? 'warning' : 'inherit'} />
              </IconButton>
            </Tooltip>
            {canDelete && (
              <Tooltip title={t('common:delete')}>
                <IconButton
                  size='large'
                  onClick={deletePost}
                >
                  <Delete color={'error'} />
                </IconButton>
              </Tooltip>
            )}
          </Container>
          <Container sx={{ display: 'flex', gap: 2 }}>
            <Container sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Tooltip title={t('post:likes')}>
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
              <Tooltip title={t('post:dislikes')}>
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
          </Container>
        </CardActions>
        <Divider />
        <CardContent sx={{ mt: 4 }}>
          <PostCommentsList postId={post.id} />
          <CreateCommentForm postId={post.id} />
        </CardContent>
      </Card>
    </Container>
  );
};
