import CredentialsProvider from 'next-auth/providers/credentials';
import { signIn } from 'next-auth/react';
import { authenticateUser, registerUser } from '../hooks/auth.helper';

export const NEXT_AUTH = {
    providers: [
        CredentialsProvider({
            name: 'Email',
            credentials: {
                email: { label: 'Email', type: 'text', placeholder: 'Email' },
                name: { label: 'Name', type: 'text', placeholder: 'Name' },
                password: { label: 'Password', type: 'password', placeholder: 'Password' },
                role: { label: 'Role', type: 'text', placeholder: 'Role' },
            },
            async authorize(credentials: any) {
                try {
                    if (credentials.isLogin === "true") {
                        const user = await authenticateUser(credentials);
                        return user ?? null;
                    }

                    const newUser = await registerUser(credentials);
                    return newUser ?? null;

                } catch (error: any) {
                    throw new Error(error.message);
                }
            },
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        jwt: async ({ user, token }: any) => {
            if (user) {
                token.uid = user.id;
                token.role = user.role;
                token.location = user.location;
                token.techStack = user.techStack;
            }
            return token;
        },
        session: ({ session, token, user }: any) => {
            if (session.user) {
                session.user.id = token.uid;
                session.user.role = token.role;
                session.user.location = token.location;
                session.user.techStack = token.techStack;
            }
            return session
        }
    },
    pages: {
        signIn: "/signin"
    }
}