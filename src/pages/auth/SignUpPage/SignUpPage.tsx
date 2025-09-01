import type { FC } from 'react';
import { CreateUserForm } from '@/entities/user/ui/UserMutation';

export const SignUpPage: FC = () => {
  return (
    <main>
      <h1>Sign Up Page</h1>
      <CreateUserForm />
    </main>
  );
};
