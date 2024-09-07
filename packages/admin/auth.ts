// src/auth.ts
import NextAuth from 'next-auth';
import Github from 'next-auth/providers/github';

export const {handlers, auth, signIn, signOut} = NextAuth({
    providers: [Github],
});
