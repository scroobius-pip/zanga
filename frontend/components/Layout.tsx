import { colors } from '../styles'
import NavBar from './NavBar'

export default ({ children, noNav = false, userName = '' }) => {
    return <>
        <div style={{ maxWidth: 800, margin: 'auto' }}>
            {!noNav && <NavBar userName={userName} />}
            <style jsx global>
                {`
    body {
        background: ${colors.background}
    }
    `}
            </style>
            {children}
        </div>
    </>
}