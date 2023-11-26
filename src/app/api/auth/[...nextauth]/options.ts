import type { NextAuthOptions } from "next-auth";
import GitHubProvider from 'next-auth/providers/github';
import  CredentialsProvider  from "next-auth/providers/credentials";
import { GithubProfile } from "next-auth/providers/github";

export const options: NextAuthOptions = {
    providers: [
        GitHubProvider({
            profile(profile:GithubProfile){
                //
                return {...profile,
                    role: profile.role ?? "user",
                    id: profile.id.toString(),
                    image: profile.avatar_url,
                }
            },
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: {
                    label: "Username:", 
                    type: "text",
                    placeholder: "your-cool-username",
                },
                password: {
                    label: "Password:", 
                    type: "password",
                    placeholder: "your-secure-password",
                },
            },
            async authorize(credentials){
                // This is where we need to retrieve user data
                // to verify with credentials
                const user = {id: "42", name:"Rajat", password:"hahaha123", role:"admin"}
                if (credentials?.username === user.name && credentials?.password === user.password){
                    return user;
                } else{
                    return null
                }
            }
        }),
    ],
    callbacks: {
        async jwt({ user, token }) {
            if (user){
                token.role = user.role;
            }
            return token;
        },
        // To use the role in client components - 
        async session({session, token}){
            if ( session?.user) {
                session.user.role = token.role
            }
            return session
        },
    }
}
