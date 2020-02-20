import App from 'next/app'
import { colors } from '../styles'


class MyApp extends App {

    render() {
        const { Component, pageProps } = this.props
        return (
            <div>
                <Component {...pageProps} />
            </div>
        )
    }
}


export default MyApp

