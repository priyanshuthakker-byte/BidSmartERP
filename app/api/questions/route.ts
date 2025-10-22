import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ questions: ['Is consortium allowed?', 'Can ISO be used as PQ proof?'] });
}

export async function POST(request: Request) {
  const data = await request.json();
  return NextResponse.json({ message: 'Question received', data });
}
