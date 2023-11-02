export async function GET(req: Request) {
  return Response.json("Get request received");
}

export async function POST(req: Request) {
  return Response.json("Post request received");
}
