import Head from 'next/head'
import TWETemplate from '../../../../templates/twe/TWETemplate'
import AboutYou from '../../../../project/aboutYou/aboutYou'

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
