import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcrypt'

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const hardcodedUser = {
          id: 'boss001',
          name: 'Boss',
          username: 'admin',
          passwordHash: await bcrypt.hash('nascent@123', 10),
        }

        const isValid =
          credentials?.username === hardcodedUser.username &&
          await bcrypt.compare(credentials?.password || '', hardcodedUser.passwordHash)

        return isValid ? { id: hardcodedUser.id, name: hardcodedUser.name } : null
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
})

export { handler as GET, handler as POST }