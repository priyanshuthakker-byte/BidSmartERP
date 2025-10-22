import { NextApiRequest, NextApiResponse } from 'next'
import { pdf } from '@react-pdf/renderer'
import DigestPDF from '@/components/DigestPDF'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { company, tenders } = req.body
  const blob = await pdf(<DigestPDF company={company} tenders={tenders} />).toBuffer()
  res.setHeader('Content-Type', 'application/pdf')
  res.setHeader('Content-Disposition', `attachment; filename=${company}-digest.pdf`)
  res.send(blob)
}