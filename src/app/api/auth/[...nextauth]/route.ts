import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";



// export default NextAuth({
//     session: {
//         strategy: 'jwt',
//     },
//     providers: [
//         GoogleProvider({
//             clientId: process.env.GOOGLE_CLIENT_ID as string,
//             clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
//         }),
//     ],
//     secret: process.env.NEXTAUTH_SECRET,
//     callbacks: {
//         async session({ session }) {

//             return session
//         },
//         async jwt({ token }) {

//             return token
//         }
//     }
// })

const authOptions: NextAuthOptions = {
    session: {
        strategy: 'jwt',
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async jwt({ token }) {
            console.log(token)
            return token
        },
        async session({ session }) {

            console.log(session, '1')
            return session
        },
        redirect() {
            return '/chat'
        }
    }
}




const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };



