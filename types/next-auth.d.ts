import "next-auth";

/*
  Author: Hung Pham
  Email: mryo.hp@gmail.com | hung.pham@sjsu.edu
  Copyright (c) 2023 Hung Pham. All rights reserved.
*/

declare module "next-auth" {
 
  interface Session {
    user: DefaultSession['user'] & {
      id: string;
      role: string;
    };
  }
  interface User {
    id: string;
    role?: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string;
  }
}
