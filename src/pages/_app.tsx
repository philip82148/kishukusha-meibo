import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import type { AppType } from 'next/app'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Script from 'next/script'

const App: AppType = ({ Component, pageProps }) => {
  const { basePath } = useRouter()

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta httpEquiv="Cache-Control" content="no-cache" />
        <meta httpEquiv="Pragma" content="no-cache" />
        <meta httpEquiv="Expires" content="0" />
        {process.env.NODE_ENV !== 'development' && (
          <link
            rel="stylesheet"
            href="https://ss159178.stars.ne.jp/css/normalize.css?1349127987942"
          />
        )}

        <title>舎生名簿生成器</title>
        <link rel="icon" href={basePath + '/favicon.png'} type="image/png" />
      </Head>
      {process.env.NODE_ENV !== 'development' && (
        <>
          <Script async src="https://www.googletagmanager.com/gtag/js?id=G-E2VFB0PSST"></Script>
          <Script id="google-analytics">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'G-E2VFB0PSST');
            `}
          </Script>
        </>
      )}
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}

export default App

const theme = createTheme({})
