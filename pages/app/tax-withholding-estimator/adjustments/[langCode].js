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

export async function getStaticPaths() {
  return {
    paths: [
      { params: { langCode: 'es' } },
      { params: { langCode: 'zh-hans' } },
      { params: { langCode: 'zh-hant' } },
      { params: { langCode: 'ko' } },
      { params: { langCode: 'ru' } },
      { params: { langCode: 'vi' } },
      { params: { langCode: 'ht' } },
    ],
    fallback: false
  };
}

export async function getStaticProps() {
  return { props: {} }
}
