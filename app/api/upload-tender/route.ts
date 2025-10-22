import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function extractClauses(text: string): string[] {
  const questions: string[] = [];

  if (text.includes('consortium not allowed')) {
    questions.push('Is consortium strictly disallowed?');
  } else if (text.includes('consortium allowed')) {
    questions.push('Is consortium allowed with lead bidder model?');
  }

  if (text.includes('ISO')) {
    questions.push('Can ISO certification be submitted as PQ proof?');
  }

  if (text.includes('QCBS')) {
    questions.push('What is the weightage split in QCBS evaluation?');
  }

  if (text.includes('outsourcing')) {
    questions.push('Is vendor outsourcing permitted under scope?');
  }

  return questions;
}

export async function POST(request: Request) {
  const body = await request.json();
  const { tenderText } = body;

  const questions = extractClauses(tenderText);

  const tender = await prisma.tender.create({
    data: {
      tenderNumber: 'AUTO/' + Date.now(),
      workDescription: 'Uploaded manually',
      emd: 'NA',
      preBid: 'NA',
      queryDeadline: 'NA',
      submissionDeadline: 'NA',
      consortium: 'NA',
      evaluation: 'NA',
      pq: 'NA',
      tq: 'NA',
      scope: 'NA'
    }
  });

  for (const q of questions) {
    await prisma.preBidQuestion.create({
      data: {
        tenderId: tender.id,
        question: q
      }
    });
  }

  return NextResponse.json({ message: 'Tender uploaded and questions generated', questions });
}
