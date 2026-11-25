import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      name: 'Bishopric account',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        const username = process.env.BISHOPRIC_USERNAME;
        const password = process.env.BISHOPRIC_PASSWORD;
        if (!username || !password) {
          throw new Error('BISHOPRIC_USERNAME and BISHOPRIC_PASSWORD must be configured.');
        }

        if (credentials.username !== username || credentials.password !== password) {
          return null;
        }

        return { id: username, name: 'Bishopric' };
      }
    })
  ],
  pages: {
    signIn: '/login'
  },
  session: {
    strategy: 'jwt'
  }
});
