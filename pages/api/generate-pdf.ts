import { NextApiRequest, NextApiResponse } from 'next'
import PDFDocument from 'pdfkit'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { company, tenders } = req.body

  const doc = new PDFDocument()
  res.setHeader('Content-Type', 'application/pdf')
  res.setHeader('Content-Disposition', `attachment; filename=${company}-digest.pdf`)
  doc.pipe(res)

  doc.fontSize(18).text(`Daily Digest — ${company}`, { underline: true })
  doc.moveDown()

  tenders.forEach((t: any) => {
    doc.fontSize(12).text(`${t.number} — ${t.description}`)
    doc.text(`Submit by ${t.submissionDate} | ${t.evaluation} | Status: ${t.status}`)
    doc.text(`🔍 ${t.clauseNotes}`)
    doc.moveDown()
  })

  doc.end()
}