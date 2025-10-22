import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ tenders: ['ABC/2025/001', 'XYZ/2025/002'] });
}

export async function POST(request: Request) {
  const data = await request.json();
  return NextResponse.json({ message: 'Tender received', data });
}
