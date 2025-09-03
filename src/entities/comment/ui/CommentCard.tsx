import { Card, CardContent, CardHeader, Typography, Container, Chip } from '@/shared/ui';
import type { FC } from 'react';
import type { Comment } from '../types';
import { useTranslation } from '@/shared/i18n';

interface CommentCardProps {
  data: Comment;
}

export const CommentCard: FC<CommentCardProps> = ({ data: { id, body, user } }) => {
  const { t } = useTranslation(['comment']);

  return (
    <Card
      sx={{
        mb: 2,
        borderRadius: 2,
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        '&:hover': {
          boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
        },
      }}
      variant='outlined'
    >
      <CardHeader
        title={
          <Container sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography
              variant='subtitle2'
              component='span'
            >
              {user.fullName}
            </Typography>
            <Chip
              label={`@${user.username}`}
              size='small'
              variant='outlined'
              sx={{ height: 20, fontSize: '0.75rem' }}
            />
          </Container>
        }
        subheader={
          <Typography
            variant='caption'
            color='text.secondary'
            component='span'
          >
            {t('comment:cardTitle')} #{id}
          </Typography>
        }
        sx={{
          pb: 1,
          '& .MuiCardHeader-content': {
            overflow: 'hidden',
          },
        }}
      />
      <CardContent sx={{ pt: 0, pb: '16px !important' }}>
        <Typography
          variant='body1'
          sx={{
            mb: 2,
            lineHeight: 1.5,
            wordBreak: 'break-word',
          }}
        >
          {body}
        </Typography>
      </CardContent>
    </Card>
  );
};
