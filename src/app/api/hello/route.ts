import { NextResponse } from "next/server";

// App Router API route
export async function GET() {
  return NextResponse.json({ name: "John Doe" });
}
