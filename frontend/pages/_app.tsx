import App from 'next/app'
import { colors } from '../styles'


class MyApp extends App {

    render() {
        const { Component, pageProps } = this.props
        return (
            <div style={{
                // width: 'calc(100%)' 
            }}>
                <Component {...pageProps} />

            </div>
        )
    }
}


export default MyApp

