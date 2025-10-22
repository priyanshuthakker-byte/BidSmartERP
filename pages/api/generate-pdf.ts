import { NextApiRequest, NextApiResponse } from 'next'
import { renderToStream } from '@react-pdf/renderer/server'
import { Document, Page, Text, StyleSheet } from '@react-pdf/renderer'

const styles = StyleSheet.create({
  page: { padding: 30 },
  heading: { fontSize: 18, marginBottom: 10 },
  text: { fontSize: 12 },
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { company, tenders } = req.body

  const MyPDF = (
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

  res.setHeader('Content-Type', 'application/pdf')
  res.setHeader('Content-Disposition', `attachment; filename=${company}-digest.pdf`)
  const stream = await renderToStream(MyPDF)
  stream.pipe(res)
}