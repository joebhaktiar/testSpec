import Head from 'next/head'
import TWETemplate from '../../../templates/twe/TWETemplate'
import AboutYou from '../../../project/aboutYou/aboutYou'

export default function Home() {
  return (
    <>
      <Head>
        <title>Tax Withholding Estimator - About You | Internal Revenue Service</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <TWETemplate page="aboutYou" testId="aboutYouHeader">
        <AboutYou />
      </TWETemplate>
    </>
  )
}
