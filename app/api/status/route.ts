import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ status: 'Pending Boss Approval' });
}

export async function POST(request: Request) {
  const data = await request.json();
  return NextResponse.json({ message: 'Status updated', data });
}
