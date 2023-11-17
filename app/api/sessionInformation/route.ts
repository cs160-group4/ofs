import { getAuthSession } from "../auth/[...nextauth]/options";
 
/*
  Author: Aaron Low
  Email: aaron.c.low@sjsu.edu
  Copyright (c) 2023 Aaron Low. All rights reserved.
*/

export async function GET(req: Request) {
    return Response.json(await getAuthSession());
}


