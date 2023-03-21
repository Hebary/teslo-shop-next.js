import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import Credentials from "next-auth/providers/credentials"
import { dbUsers } from "@/database";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    Credentials({
      name: "Custom Login",
      credentials:{
        email: { label: "Email", type: "email", placeholder: "correo@google.com" },
        password: { label: "Password", placeholder:"Password", type: "password" } 
      },
      async authorize(credentials){
        return await dbUsers.checkUserCredentials(credentials!.email, credentials!.password) as any;
      }
    }),

    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),  

  ],

  //Custom pages to login
  pages: {
    signIn: '/auth/login',
    newUser: '/auth/register',

  },

  jwt:{
    
  },
  
  session:{
    maxAge: 60 * 60 * 24 * 30, // 30 days
    strategy: 'jwt',
    udpateAge: 24 * 60 * 60, // 24 hours
  },


    callbacks : {
      async jwt({token, account, user} :{ token: any, account: any, user: any }) {
        // console.log({token, account, user})
        if (account) {
          token.accessToken = account.access_token;

          switch (account.type) {
            case 'oauth':
              token.user = await dbUsers.checkUserOAuth(user?.email || '', user?.name || '');
              break;              
            case 'credentials':
              token.user = user;
              break;
          }
        }
        return token;
      },
      async session({session, token, user} : { session: any, token: any, user: any } ) {
        session.accesToken = token.accessToken;
        session.user = token.user as any;
        return session; 
      }
    }


}

export default NextAuth(authOptions as any)