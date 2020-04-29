import App from 'next/app'
import { colors } from '../styles'
import '../components/masonry.css'
import PageNProgress from 'next-styled-nprogress'
import Head from 'next/head'

class MyApp extends App {

    render() {
        const { Component, pageProps } = this.props
        return (
            <div style={{
                // width: 'calc(100%)' 
            }}>
                <Head>
                    <title>Zanga - Find Your Ideal Property</title>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-164923517-1"></script>
                    <script dangerouslySetInnerHTML={googleAnalyticsCode}></script>
                </Head>
                <Component {...pageProps} />
                <PageNProgress
                    color={colors.primary}
                    showSpinner={false}
                    height='5px'
                    delay={200}
                />

            </div>
        )
    }
}

const googleAnalyticsCode = {
    __html: `
    window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'UA-164923517-1');
    `
}

export default MyApp

    // export default withNProgress(1000)(MyApp)

