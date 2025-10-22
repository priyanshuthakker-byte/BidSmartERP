import { NextApiRequest, NextApiResponse } from 'next'
import { Document, Page, Text, StyleSheet, pdf } from '@react-pdf/renderer'

const styles = StyleSheet.create({
  page: { padding: 30 },
  heading: { fontSize: 18, marginBottom: 10 },
  text: { fontSize: 12 },
})

const DigestPDF = ({ company, tenders }: any) => (
  <Document>
    <Page style={styles.page}>
      <Text style={styles.heading}>Daily Digest — {company}</Text>
      {tenders.map((t: any, i: number) => (
        <Text key={i} style={styles.text}>
          {t.number} — {t.description} | Submit by {t.submissionDate} | {t.evaluation} | Status: {t.status}
          {'\n'}🔍 {t.clauseNotes}
          {'\n\n'}
        </Text>
      ))}
    </Page>
  </Document>
)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { company, tenders } = req.body
  const blob = await pdf(<DigestPDF company={company} tenders={tenders} />).toBuffer()
  res.setHeader('Content-Type', 'application/pdf')
  res.setHeader('Content-Disposition', `attachment; filename=${company}-digest.pdf`)
  res.send(blob)
}