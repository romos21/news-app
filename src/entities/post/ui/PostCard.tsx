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
  ButtonLink,
} from '@/shared/ui';
import { ThumbUp, ThumbDown, Star } from '@/shared/ui/icons';
import type { Post } from '../types';
import { useMyPostManipulationsState, usePostActions } from '../lib';
import { useTranslation } from '@/shared/i18n';

interface PostCardProps {
  post: Post;
  link?: string;
}

const CardHeader: FC<Pick<Post, 'title' | 'userId'>> = ({ title, userId }) => {
  return (
    <UICardHeader
      title={<Typography variant='h6'>{title}</Typography>}
      subheader={`User #${userId}`}
    />
  );
};

export const PostCard: FC<PostCardProps> = ({ post, link }) => {
  const { body, reactions, title, userId } = post;
  const { isLiked, isDisliked, isStarred } = useMyPostManipulationsState(post);
  const { setDislike, setLike, setStarred } = usePostActions(post);
  const { t } = useTranslation(['common', 'post']);

  return (
    <Card
      sx={{
        maxWidth: '100%',
        height: '100%',
        transition: 'box-shadow 0.2s ease-in-out',
        '&:hover': {
          boxShadow: 6,
        },
      }}
      elevation={2}
    >
      {link ?
        <ButtonLink to={link}>
          <CardHeader
            title={title}
            userId={userId}
          />
        </ButtonLink>
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
      <CardActions sx={{ justifyContent: 'space-between', px: 2 }}>
        <Tooltip title={t('post:starred')}>
          <IconButton
            size='large'
            onClick={setStarred}
          >
            <Star color={isStarred ? 'warning' : 'inherit'} />
          </IconButton>
        </Tooltip>
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
    </Card>
  );
};
