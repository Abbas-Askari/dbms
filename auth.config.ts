import { on } from "events";
import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      // const isOnDashboard = nextUrl. pathname.startsWith('/store');
      // if (isOnDashboard) {
      //   if (isLoggedIn) return true;
      //   return false; // Redirect unauthenticated users to login page
      // } else if (isLoggedIn) {
      //   return Response.redirect(new URL('/store', nextUrl));
      // }

      const onSignUpPage = nextUrl.pathname.startsWith("/signup");
      const onLoginPage = nextUrl.pathname.startsWith("/login");

      if ((onLoginPage || onSignUpPage) && isLoggedIn) {
        return Response.redirect(new URL("/products", nextUrl));
      }
      return isLoggedIn || onLoginPage || onSignUpPage;
    },
    session({ session, token }) {
      session.user.id = parseInt(token.sub) as number;
      return session;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
