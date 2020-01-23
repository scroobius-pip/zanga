import { colors } from '../styles'
import NavBar from './NavBar'
import Footer from './Footer'

export default ({ children, noNav = false, userName = '' }) => {
    return <>
        <div style={{ margin: 'auto', minHeight: '100%', position: 'relative' }}>
            {!noNav && <NavBar userName={userName} />}
            <style jsx global>
                {`
    body {
        background: ${colors.background};
        margin:0;
   padding:0;
   height:100%;
    }
    `}
            </style>
            <div style={{ paddingBottom: 100 }}>

                {children}
            </div>
            <Footer />
        </div>
    </>
}