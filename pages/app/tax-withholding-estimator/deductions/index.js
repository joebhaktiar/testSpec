import Head from 'next/head'
import TWETemplate from '../../../../templates/twe/TWETemplate'
import Deductions from '../../../../project/deductions/deductions'

export default function Home() {
  return (
    <>
      <Head>
        <title>Tax Withholding Estimator - Deductions | Internal Revenue Service</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <TWETemplate page="deductions" testId="deductionsHeader">
        <Deductions />
      </TWETemplate>
    </>
  )
}
