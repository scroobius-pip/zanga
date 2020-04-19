import { TabNavigation, Tab, Pane, Tablist, SidebarTab, Card } from 'evergreen-ui'
import { useState } from 'react'
import { colors } from '../styles'

export interface TabContainerProps {
    tabs: TabProp[]
    side?: boolean
}

interface TabProp {
    title: string
    body: any
}


export default (props: TabContainerProps) => {
    const [selected, setSelected] = useState(0)

    const TabNav = props.side ? ({ children }) => {
        return <Tablist>{children}</Tablist>
    } : TabNavigation
    const TabNavItem = props.side ? SidebarTab : Tab

    return <>
        <Card
            elevation={1}
            maxWidth={500}
            backgroundColor={'white'}
        >

            < TabNav  >
                {
                    props.tabs.map(({ body, title }, index) => <TabNavItem height={56} key={title} id={title} isSelected={index === selected}
                        onSelect={() => setSelected(index)}
                    >
                        {title}
                    </TabNavItem>
                    )
                }
            </ TabNav >
        </Card>
        {
            props.tabs.map(({ body }, index) => <Pane
                marginTop={20}
                key={index}
                id={'panel' + index}
                role='tabpanel'
                display={index === selected ? 'block' : 'none'}>
                {body}
            </Pane>
            )
        }
    </>
}