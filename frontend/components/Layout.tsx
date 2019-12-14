import { colors } from '../styles'
import NavBar from './NavBar'

export default ({ children, noNav = false }) => {
    return <>
        <div style={{ maxWidth: 650, margin: 'auto' }}>
            {!noNav && <NavBar userName='Chisimdiri Ejinkeonye' />}
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