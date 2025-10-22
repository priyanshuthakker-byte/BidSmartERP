import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  const { portals, keywords, categories } = body;

  const mockTender = (portal: string) => ({
    portal,
    tenderNumber: `TND/${portal}/2025/001`,
    workDescription: `MIS portal with invoice and vendor module from ${portal}`,
    emd: 'Rs. 165000',
    preBid: '2025-10-25 11:00 AM (Online)',
    queryDeadline: '2025-10-24',
    submissionDeadline: '2025-10-30',
    consortium: 'Not Allowed',
    evaluation: 'Least Cost',
    pq: '50L AAT, 1 proj > Rs. 300000, ISO',
    tq: 'Same as PQ',
    scope: 'Vendor info, invoice, MIS, outsourcing'
  });

  const results = portals.map((p: any) => mockTender(p.name));
  return NextResponse.json({ tenders: results });
}