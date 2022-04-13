import Head from 'next/head'
import TWETemplate from '../../../../templates/twe/TWETemplate'
import Adjustments from '../../../../project/adjustments/adjustments'

export default function Home() {
  return (
    <>
      <Head>
        <title>Tax Withholding Estimator - Adjustments | Internal Revenue Service</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <TWETemplate page="adjustments" testId="adjustmentsHeader">
        <Adjustments />
      </TWETemplate>
    </>
  )
}
