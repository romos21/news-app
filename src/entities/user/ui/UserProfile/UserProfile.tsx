import type { FC } from 'react';
import { Container, Typography, GridContainer, Chip, Divider, Card, CardContent, IconButton } from '@/shared/ui';
import {
  Edit as EditIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Cake as CakeIcon,
  Person as PersonIcon,
  Transgender as GenderIcon,
} from '@mui/icons-material';
import type { User } from '../../types';
import { UserAvatar } from '../UserAvatar/UserAvatar';

export type UserProfileProps = {
  data: User;
};

export const UserProfile: FC<UserProfileProps> = ({ data: user }) => {
  const formatBirthDate = (date: Date | string) => {
    if (typeof date === 'string') {
      date = new Date(date);
    }
    return date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <Container
      maxWidth='lg'
      sx={{ py: 4 }}
    >
      <Container sx={{ p: 3, borderRadius: 2 }}>
        <Container
          display='flex'
          justifyContent='space-between'
          alignItems='center'
          mb={3}
        >
          <Typography
            variant='h4'
            component='h1'
            fontWeight='bold'
          >
            Профиль пользователя
          </Typography>
          <IconButton
            color='primary'
            aria-label='Редактировать профиль'
          >
            <EditIcon />
          </IconButton>
        </Container>

        <GridContainer
          container
          spacing={4}
        >
          <GridContainer size={{ xs: 12, md: 4 }}>
            <Container
              display='flex'
              flexDirection='column'
              alignItems='center'
            >
              <UserAvatar data={user} />
              <Typography
                variant='h5'
                component='h2'
                gutterBottom
              >
                {user.firstName} {user.lastName}
              </Typography>
              <Chip
                label={user.role}
                size='small'
                color='primary'
                variant='outlined'
              />
              <Typography
                variant='body2'
                color='text.secondary'
                textAlign='center'
              >
                @{user.username}
              </Typography>
            </Container>
          </GridContainer>
          <GridContainer size={{ xs: 12, md: 8 }}>
            <Card variant='outlined'>
              <CardContent>
                <Typography
                  variant='h6'
                  gutterBottom
                  sx={{ display: 'flex', alignItems: 'center' }}
                >
                  <PersonIcon sx={{ mr: 1 }} />
                  Личная информация
                </Typography>
                <Divider sx={{ mb: 2 }} />

                <GridContainer
                  container
                  spacing={2}
                >
                  <GridContainer size={{ xs: 12, sm: 6 }}>
                    <Container
                      display='flex'
                      alignItems='center'
                      mb={2}
                    >
                      <EmailIcon
                        color='action'
                        sx={{ mr: 1 }}
                      />
                      <Container>
                        <Typography
                          variant='caption'
                          color='text.secondary'
                        >
                          Email
                        </Typography>
                        <Typography variant='body1'>{user.email}</Typography>
                      </Container>
                    </Container>
                  </GridContainer>
                  <GridContainer size={{ xs: 12, sm: 6 }}>
                    <Container
                      display='flex'
                      alignItems='center'
                      mb={2}
                    >
                      <PhoneIcon
                        color='action'
                        sx={{ mr: 1 }}
                      />
                      <Container>
                        <Typography
                          variant='caption'
                          color='text.secondary'
                        >
                          Телефон
                        </Typography>
                        <Typography variant='body1'>{user.phone}</Typography>
                      </Container>
                    </Container>
                  </GridContainer>
                  <GridContainer size={{ xs: 12, sm: 6 }}>
                    <Container
                      display='flex'
                      alignItems='center'
                      mb={2}
                    >
                      <CakeIcon
                        color='action'
                        sx={{ mr: 1 }}
                      />
                      <Container>
                        <Typography
                          variant='caption'
                          color='text.secondary'
                        >
                          Дата рождения
                        </Typography>
                        <Typography variant='body1'>{formatBirthDate(user.birthDate)}</Typography>
                      </Container>
                    </Container>
                  </GridContainer>

                  <GridContainer size={{ xs: 12, sm: 6 }}>
                    <Container
                      display='flex'
                      alignItems='center'
                      mb={2}
                    >
                      <GenderIcon
                        color='action'
                        sx={{ mr: 1 }}
                      />
                      <Container>
                        <Typography
                          variant='caption'
                          color='text.secondary'
                        >
                          Пол
                        </Typography>
                        <Typography variant='body1'>{user.gender}</Typography>
                      </Container>
                    </Container>
                  </GridContainer>
                </GridContainer>
              </CardContent>
            </Card>
            <Container mt={3}>
              <Typography
                variant='body2'
                color='text.secondary'
              >
                ID пользователя: {user.id}
              </Typography>
            </Container>
          </GridContainer>
        </GridContainer>
      </Container>
    </Container>
  );
};
