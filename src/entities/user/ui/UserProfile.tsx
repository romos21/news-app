import React, { lazy, useCallback, useState } from 'react';
import { Card, CardContent, CardHeader, Typography, Container, Chip, Divider, IconButton, Modal } from '@/shared/ui';
import { Edit, Email, Phone, Cake, Person } from '@/shared/ui/icons';
import type { User } from '../types';
import { UserAvatar } from './UserAvatar';
import { getFullName } from '../lib';
import { formatDate } from '@/shared/lib/dateManager';
import { useAdminGuard } from '@/shared/store';

const UpdateUserForm = lazy(async () => {
  const module = await import('./UserMutation');
  return { default: module.UpdateUserForm };
});

interface UserProfileProps {
  user: User;
}

export const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const isAdmin = useAdminGuard();
  const { email, phone, username, birthDate, role, gender } = user;

  const handleShowEditModal = useCallback(() => {
    setShowEditModal((prev) => !prev);
  }, [setShowEditModal]);

  return (
    <>
      {showEditModal && (
        <Modal
          open={showEditModal}
          onClose={handleShowEditModal}
          title='Edit user data'
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
            isAdmin && (
              <IconButton onClick={handleShowEditModal}>
                <Edit />
              </IconButton>
            )
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
                label={role}
                color='primary'
                size='small'
              />
              <Chip
                label={gender}
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
            Contact Information
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
            <Typography variant='body1'>Born {formatDate(birthDate)}</Typography>
          </Container>
        </CardContent>
      </Card>
    </>
  );
};

export default UserProfile;
