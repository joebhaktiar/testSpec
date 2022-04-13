import Head from 'next/head'
import TWETemplate from '../../../../templates/twe/TWETemplate'
import IncomeWithholding from '../../../../project/incomeWithholding/incomeWithholding'

export default function Home() {
  return (
    <>
      <Head>
        <title>Tax Withholding Estimator - Income & Withholding | Internal Revenue Service</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <TWETemplate page="incomeWithholding" testId="incomeWithholdingHeader">
        <IncomeWithholding />
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
