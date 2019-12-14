import { Pane, Card, Heading, Button, Paragraph, SegmentedControl, TabNavigation, Tab, TabProps } from 'evergreen-ui'
import { colors } from '../styles'
import Layout from '../components/Layout'
import TabsContainer, { TabContainerProps } from '../components/TabsContainer'
import PropertyCard, { Property } from '../components/PropertyCard'
import PropertiesContainer from '../components/PropertiesContainer'
import Router from 'next/router'

interface InitialProps {
    rentProperties: Property[]
    saleProperties: Property[]

}

const Page = ({ rentProperties, saleProperties }: InitialProps) => {

    const tabs: TabContainerProps['tabs'] = [{
        body: <PropertiesContainer properties={saleProperties} />,
        title: 'For Sale'
    }, {

        body: <PropertiesContainer properties={rentProperties} />,
        title: 'For Rent'
    }]
    return <Layout noNav>

        <Pane
            height={'100%'}
            width={'100%'}

        >
            <Card elevation={3} width='100%' padding={20}
                background='white'
            >
                <Pane display='flex' justifyContent='space-between'>
                    <Pane>
                        <img src='/zanga-logo.svg' height={40} />
                    </Pane>
                    <Pane>
                        <Button onClick={() => Router.push('/login')} height={40} appearance="primary">Login</Button>
                        <Button onClick={() => Router.push('/register')} height={40} appearance="minimal">Register</Button>
                    </Pane>
                </Pane>
                <Pane marginTop={35}>
                    <Heading className='f-wght_900' fontWeight={600} size={900}>
                        <span style={{ color: colors.primary }}>Share</span> Property &
            </Heading>
                    <Heading size={900}>
                        <span style={{ color: colors.primary }}>Earn</span> money from  <span style={{ color: colors.primary }}>commissions</span>
                    </Heading>

                </Pane>
                <Pane>
                    <Pane>
                        <Paragraph fontWeight={500} size={500} marginTop="default">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus, ullam beatae! Ad voluptate suscipit corrupti natus fugit quaerat iure iste.
                </Paragraph>
                    </Pane>

                </Pane>
            </Card>

        </Pane>

        <Pane marginTop={25} background='tint1' padding={15}>
            <TabsContainer tabs={tabs} />
        </Pane>
    </Layout>
}


Page.getInitialProps = async ({ req }) => {
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

    return {
        rentProperties: properties,
        saleProperties: properties
    }


}

export default Page