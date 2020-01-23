import { colors } from '../styles'
import NavBar from './NavBar'
import Footer from './Footer'

export default ({ children, noNav = false, userName = '' }) => {
    return <>
        <div style={{ minHeight: '100vh', position: 'relative', }}>
            <div style={{ margin: 'auto', maxWidth: 800 }}>

                {!noNav && <NavBar userName={userName} />}
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