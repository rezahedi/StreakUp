import type { DefaultUser } from 'next-auth';

interface CustomUser extends DefaultUser {
  id: string;
  timezone: string;
}

declare module 'next-auth' {
  interface Session {
    user?: CustomUser;
  }
}
