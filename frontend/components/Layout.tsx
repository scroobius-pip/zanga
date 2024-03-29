import { colors } from '../styles'
import NavBar from './NavBar'
import Footer from './Footer'

export default ({ children, noNav = false, userName = '', fullWidth = false }) => {
    return <>
        <div style={{ minHeight: '100vh', position: 'relative', }}>
            <div style={{ margin: 'auto', maxWidth: fullWidth ? null : 800 }}>

                {!noNav && <NavBar userName={userName} fullWidth={fullWidth} />}
                <style jsx global>
                    {`
    body {
        background: ${colors.background};
        margin:0;
        padding:0;
    display: flex;
  flex-direction: column;
  min-height: 100vh;
}
`}
                </style>
                <div style={{ paddingBottom: 100 }}>

                    {children}
                </div>
            </div>
            <Footer />
        </div>
    </>
}