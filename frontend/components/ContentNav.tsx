import { useState } from 'react'
import { Card, Pane, Heading, Paragraph, Button } from 'evergreen-ui'
import { colors } from '../styles'

const Tab = ({ name, active = false, icon, onClick }) => {
    return <div onClick={onClick} style={{ textAlign: 'center', padding: 20, backgroundColor: active && colors.primary, color: 'white' }}>
        <img src={icon} height={20} style={{ filter: active && 'brightness(4)' }} />
        <Heading color={active ? 'white' : colors.grey} size={500}>{name}</Heading>

    </div>
}

export default () => {

    const [selected, setSelected] = useState(0)

    return <div>

        <Pane maxWidth={400} borderTopLeftRadius={5} borderTopRightRadius={5} display='flex' paddingX='20' background='#EFF3F5'>
            {[
                {
                    title: 'Purchase',
                    icon: '/home.svg'
                },
                {
                    title: 'Earn',
                    icon: '/earn.svg'
                },

                {
                    title: 'Advertise',
                    icon: '/advertising.svg'
                },
                {
                    title: 'Colet',
                    icon: '/colet.svg'
                }

            ].map((tabs, index) => {
                return <Tab onClick={() => {
                    setSelected(index)
                }} active={index === selected} name={tabs.title} icon={tabs.icon} />
            })}

        </Pane>
        <Pane padding={50} borderBottomLeftRadius={5} borderBottomRightRadius={5} elevation={2} background='white' position='relative' zIndex={-5}>
            <Heading size={900}>Find beautiful ideal homes.</Heading>
            <Paragraph size={500} marginTop="default">
                Size 500. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Size 500. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Size 500. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
  </Paragraph>
            <Button marginTop='default' backgroundColor={colors.primary} float='right' appearance='primary' iconAfter='arrow-right' height={56}>
                Properties
  </Button>
        </Pane>
    </div>

}