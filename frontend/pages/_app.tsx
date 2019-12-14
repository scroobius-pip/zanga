import App from 'next/app'
import { colors } from '../styles'


class MyApp extends App {



    render() {
        const { Component, pageProps } = this.props

        return (
            <>


                <Component {...pageProps} />

            </>
        )
    }
}


export default MyApp

