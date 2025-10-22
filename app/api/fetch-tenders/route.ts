import { NextResponse } from 'next/server'

interface TenderData {
  id: string
  title: string
  category: string
  source: string
  publishedDate: string
  deadline: string
  url: string
}

export async function GET() {
  try {
    const response = await fetch('https://api.example.com/tenders')
    const data: TenderData[] = await response.json()

    return NextResponse.json({
      success: true,
      tenders: data,
    })
  } catch (error) {
    console.error('Fetch error:', error)
    return NextResponse.json({
      success: false,
      message: 'Failed to fetch tenders',
    })
  }
}