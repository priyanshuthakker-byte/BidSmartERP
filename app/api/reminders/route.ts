import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ reminders: ['Pre-bid on Oct 25', 'Submit queries by Oct 24'] });
}

export async function POST(request: Request) {
  const data = await request.json();
  return NextResponse.json({ message: 'Reminder received', data });
}
