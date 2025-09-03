import React, { lazy, useCallback, useState } from 'react';
import { Card, CardContent, CardHeader, Typography, Container, Chip, Divider, IconButton, Modal } from '@/shared/ui';
import { Edit, Email, Phone, Cake, Person, Logout } from '@/shared/ui/icons';
import type { User } from '../types';
import { UserAvatar } from './UserAvatar';
import { getFullName } from '../lib';
import { dateManager } from '@/shared/dateManager';
import { useAdminGuard, useAppDispatch } from '@/shared/store';
import { useTranslation } from '@/shared/i18n';
import { signOut } from '@/shared/store/reducers';

const UpdateUserForm = lazy(async () => {
  const module = await import('./UpdateUserForm');
  return { default: module.UpdateUserForm };
});

interface UserProfileProps {
  user: User;
  isMe?: boolean;
}

export const UserProfile: React.FC<UserProfileProps> = ({ user, isMe = false }) => {
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const isAdmin = useAdminGuard();
  const dispatch = useAppDispatch();
  const { t } = useTranslation(['common', 'user']);
  const { email, phone, username, birthDate, role, gender } = user;

  const handleShowEditModal = useCallback(() => {
    setShowEditModal((prev) => !prev);
  }, [setShowEditModal]);

  const handleLogout = () => {
    dispatch(signOut());
  };

  return (
    <>
      {showEditModal && (
        <Modal
          open={showEditModal}
          onClose={handleShowEditModal}
          title={t('user:editModal:title')}
          fullWidth
          maxWidth='md'
        >
          <UpdateUserForm user={user} />
        </Modal>
      )}
      <Card sx={{ maxWidth: 600, margin: '0 auto' }}>
        <CardHeader
          avatar={<UserAvatar user={user} />}
          action={
            <Container>
              {isAdmin && (
                <IconButton onClick={handleShowEditModal}>
                  <Edit />
                </IconButton>
              )}
              {isMe && (
                <IconButton onClick={handleLogout}>
                  <Logout />
                </IconButton>
              )}
            </Container>
          }
          title={
            <Typography
              variant='h5'
              component='h1'
              gutterBottom
            >
              {getFullName(user)}
            </Typography>
          }
          subheader={
            <Container sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 1 }}>
              <Chip
                label={t(`user:role:${role}`)}
                color='primary'
                size='small'
              />
              <Chip
                label={t(`user:gender:${gender}`)}
                variant='outlined'
                size='small'
              />
            </Container>
          }
        />

        <CardContent>
          <Container sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Person sx={{ mr: 1, color: 'text.secondary' }} />
            <Typography
              variant='body1'
              color='text.primary'
            >
              @{username}
            </Typography>
          </Container>

          <Divider sx={{ my: 2 }} />

          <Typography
            variant='h6'
            gutterBottom
            sx={{ mb: 2 }}
          >
            {t('user:contactInformation')}
          </Typography>

          <Container sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Email sx={{ mr: 1, color: 'text.secondary' }} />
            <Typography variant='body1'>{email}</Typography>
          </Container>

          <Container sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Phone sx={{ mr: 1, color: 'text.secondary' }} />
            <Typography variant='body1'>{phone}</Typography>
          </Container>

          <Container sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Cake sx={{ mr: 1, color: 'text.secondary' }} />
            <Typography variant='body1'>
              {t('user:birthDate')} {dateManager(birthDate).format()}
            </Typography>
          </Container>
        </CardContent>
      </Card>
    </>
  );
};

export default UserProfile;
