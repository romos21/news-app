import { useEffect, useState, lazy, Suspense, type FC } from 'react';
import { useLazyGetPostCommentsQuery } from '@/shared/store/api';
import { Container, Typography, Accordion, CircularProgress } from '@/shared/ui';
import { useTranslation } from '@/shared/i18n';

const CommentCard = lazy(async () => {
  const module = await import('./CommentCard');
  return { default: module.CommentCard };
});

interface PostCommentsListProps {
  postId: number;
}

export const PostCommentsList: FC<PostCommentsListProps> = ({ postId }) => {
  const [showComments, setShowComments] = useState<boolean>(false);
  const [loadComments, { data: comments, isLoading: isLoadingComments }] = useLazyGetPostCommentsQuery();
  const { t } = useTranslation(['common', 'comment']);

  const handleShowComments = () => {
    setShowComments((prev) => !prev);
  };

  useEffect(() => {
    showComments && postId && loadComments(postId);
  }, [showComments, loadComments, postId]);

  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      <Accordion
        expanded={showComments}
        onChange={handleShowComments}
        title={
          <Typography
            variant='h5'
            color='text.secondary'
            sx={{
              mb: 2,
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {t('comment:title')}: {comments?.length}
          </Typography>
        }
      >
        <Container>
          {isLoadingComments ?
            <CircularProgress />
          : comments?.map((comment) => (
              <Suspense
                key={comment.id}
                fallback={<CircularProgress />}
              >
                <CommentCard data={comment} />
              </Suspense>
            ))
          }
        </Container>
      </Accordion>
    </Container>
  );
};
