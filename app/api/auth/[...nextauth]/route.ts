import {authOptions} from "./options"
import NextAuth from "next-auth/next"

/*
  Author: Hung Pham
  Email: mryo.hp@gmail.com | hung.pham@sjsu.edu
  Copyright (c) 2023 Hung Pham. All rights reserved.
*/

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
