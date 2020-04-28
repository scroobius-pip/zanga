import { useState } from 'react'
import { Card, Pane, Heading, Paragraph, Button } from 'evergreen-ui'
import { colors } from '../styles'
import { useScreenClass, } from 'react-grid-system'

const Tab = ({ name, active = false, icon, onClick }) => {
    return <div className='tab-head'
        onClick={onClick}
        style={{
            textAlign: 'center',
            padding: '1em',
            backgroundColor: active && colors.primary,
            color: 'white',
            cursor: 'pointer',
            maxWidth: 'calc(100% / 5)',

        }}>
        <img src={icon} height={20} style={{ filter: active && 'brightness(4)' }} />
        <Heading color={active ? 'white' : colors.grey} size={500}>{name}</Heading>
        <style>{
            `
            .tab-head:first-child{
                border-top-left-radius:5px;
            }

            .tab-head:last-child {
                border-top-right-radius:5px;
            }
           
            .tab-head, .tab-head > * {
                transition: all 0.3s ease;
            }
            `
        }</style>
    </div>
}

interface TabProp {
    title: string
    icon: string
    Content: JSX.Element
    image: string
}

export interface ContentNavProps {
    onSelect: (index: number) => any
    tabs: TabProp[]
}

export default ({ onSelect, tabs }: ContentNavProps) => {

    const [selected, setSelected] = useState(0)
    const screenClass = useScreenClass()
    const isMobile = ['xs', 'sm'].includes(screenClass)

    const TabContent = tabs[selected].Content

    return <div style={{ width: '100%' }}>
        <div
            style={{
                // maxWidth: 400,
                position: 'relative',
                maxWidth: 'calc(100vw)',
                // backgroundColor: 'red',
                whiteSpace: 'nowrap',
                overflowY: 'auto'
            }}
        >

            <Pane
                // maxWidth={400}
                borderTopLeftRadius={5}
                borderTopRightRadius={5}
                display='flex'
                paddingX='50'
                width='fit-content'
                background='#EFF3F5'

            >
                {tabs.map((tabs, index) => {
                    return <Tab onClick={() => {
                        setSelected(index)
                        onSelect(index)
                    }} active={index === selected} name={tabs.title} icon={tabs.icon} />
                })}

            </Pane>
        </div>
        <Pane
            padding={20}
            borderBottomLeftRadius={5}
            borderBottomRightRadius={5}
            // borderTopRightRadius={5}
            overflowY='auto'
            maxHeight={'70vh'}
            backgroundColor={`rgba(255, 255, 255, ${isMobile ? 0.70 : 0.85})`}
            elevation={0}
            // background='white'
            position='relative'>

            {TabContent}

        </Pane>
    </div>

}