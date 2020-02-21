import { TabNavigation, Tab, Pane, Tablist, SidebarTab } from 'evergreen-ui'
import { useState } from 'react'

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
        {
            props.tabs.map(({ body }, index) => <Pane
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