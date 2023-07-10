import { ThemeProvider } from '@emotion/react'
import { CssBaseline } from '@mui/material'
import { createTheme } from '@mui/material/styles'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useRouter } from 'next/router'

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  const { basePath } = useRouter()

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" key="viewport" />
        <meta httpEquiv="Cache-Control" content="no-cache" />
        <meta httpEquiv="Pragma" content="no-cache" />
        <meta httpEquiv="Expires" content="0" />
        <link
          rel="stylesheet"
          href="https://ss159178.stars.ne.jp/css/normalize.css?1349127987942"
        />

        <title>舎生名簿生成器</title>
        <link rel="icon" href={basePath + '/favicon.png'} type="image/png" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}
export default App

const theme = createTheme({})
