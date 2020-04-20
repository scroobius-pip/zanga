import { colors } from '../styles'
import { Pane, Text } from 'evergreen-ui'
import SocialIcons from './SocialIcons'


const FooterListItem = ({ text, url }) => {
    return <>
        <li className='footer-list' style={{ color: 'white', display: 'inline-block', marginRight: 15 }}>
            <a href={url}>{text}</a>
        </li>
        <style jsx>
            {`
            .footer-list {
                opacity:0.7;
                font-family:"SF UI Text", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
            }
            .footer-list:hover {
                opacity:1;
            }
            a {
                color:white;
                text-decoration: none;
            }
            `}
        </style>
    </>
}

export default () => {
    return <footer style={{

        position: 'absolute',
        height: 80,
        bottom: 0,
        width: '100%',


    }}>
        <Pane
            background={colors.grey}
            padding={20}
            display='flex'
            justifyContent='center'
            flexDirection='column'
        >
            <Pane textAlign='center'>
                <Pane>
                    <img src="/zanga-logo-white.svg" height={40} />
                </Pane>
                <Pane>
                    <Text size={300} color='white'> © Copyright {(new Date()).getFullYear()}</Text>
                </Pane>
            </Pane>
            <Pane>
                {/* social links here */}
            </Pane>
            <Pane textAlign='center'>
                <ul className='list' style={{ listStyle: 'none' }}>
                    <FooterListItem text='About Us' url='/about-us' />
                    <FooterListItem text='Contact Us' url='/contact-us' />
                    <FooterListItem text='Terms & Conditions' url='/legal#terms' />
                    <FooterListItem text='Privacy Policy' url='/legal#privacy' />
                    {/* <FooterListItem text='Faq' url='/faq' /> */}
                </ul>

            </Pane>
            <div style={{ width: '100%', }}>
                <SocialIcons />
            </div>
        </Pane>

    </footer>
}