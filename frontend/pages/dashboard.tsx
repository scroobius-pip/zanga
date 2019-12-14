import Layout from '../components/Layout'
import { Heading, Pane, Button, SideSheet, Position, Paragraph } from 'evergreen-ui'
import { Property } from '../components/PropertyCard'
import TabsContainer, { TabContainerProps } from '../components/TabsContainer'
import PropertiesContainer from '../components/PropertiesContainer'
import AddPropertyForm from '../components/AddPropertyForm'
import { useState } from 'react'



export default () => {
    const [addFormVisible, setAddFormVisible] = useState(false)

    const properties: Property[] = [
        {
            id: '1',
            title: 'DETACHED HOUSE FOR SALE',
            imageUrl: 'https://lid.zoocdn.com/645/430/69714189686fe41a16d81304bccbc4dbfe3de8f9.jpg',
            location: '01, Airport Road Abuja, Nigeria',
            price: '₦5,000,000/yr'
        },
        {
            id: '2',
            title: 'DETACHED HOUSE FOR SALE',
            imageUrl: 'https://lid.zoocdn.com/645/430/69714189686fe41a16d81304bccbc4dbfe3de8f9.jpg',
            location: '01, Airport Road Abuja, Nigeria',
            price: '₦5,000,000/yr'
        },
        {
            id: '3',
            title: 'DETACHED HOUSE FOR SALE',
            imageUrl: 'https://lid.zoocdn.com/645/430/69714189686fe41a16d81304bccbc4dbfe3de8f9.jpg',
            location: '01, Airport Road Abuja, Nigeria',
            price: '₦5,000,000/yr'
        },
        {
            id: '4',
            title: 'DETACHED HOUSE FOR SALE',
            imageUrl: 'https://lid.zoocdn.com/645/430/69714189686fe41a16d81304bccbc4dbfe3de8f9.jpg',
            location: '01, Airport Road Abuja, Nigeria',
            price: '₦5,000,000/yr'
        },
        {
            id: '5',
            title: 'DETACHED HOUSE FOR SALE',
            imageUrl: 'https://lid.zoocdn.com/645/430/69714189686fe41a16d81304bccbc4dbfe3de8f9.jpg',
            location: '01, Airport Road Abuja, Nigeria',
            price: '₦5,000,000/yr'
        },
    ]

    const tabs: TabContainerProps['tabs'] = [{
        body: <PropertiesContainer deletable properties={properties} />,
        title: 'Properties'
    },
    {
        body: <p>Contact</p>,
        title: 'Contacts'
    }
    ]

    return <Layout>

        <Pane display='flex' justifyContent='space-between'>
            <Heading size={900}>Dashboard</Heading>
            <Button iconAfter='add' onClick={() => setAddFormVisible(true)} marginTop={10} height={40} appearance="primary" marginRight={12} >
                Create Property
                </Button>
        </Pane>

        <TabsContainer tabs={tabs} />
        <SideSheet

            isShown={addFormVisible}
            onCloseComplete={() => setAddFormVisible(false)}
        >
            <Pane display='flex' justifyContent='center' flexDirection='column' padding={25}>
                <AddPropertyForm />
            </Pane>
        </SideSheet>
    </Layout>
}