import { Pane, Card, Heading, Button, Paragraph, SegmentedControl, TabNavigation, Tab, TabProps } from 'evergreen-ui'
import { colors } from '../styles'
import Layout from '../components/Layout'
import TabsContainer, { TabContainerProps } from '../components/TabsContainer'
import PropertyCard, { Property } from '../components/PropertyCard'
import PropertiesContainer from '../components/PropertiesContainer'
import Router from 'next/router'
import { GraphQLClient } from 'graphql-request'
import { getSdk, CostType, User } from '../generated/graphql'
import { parseProperties } from '../functions/parseProperties'
import getToken from '../functions/getToken'
import { AvatarPopover } from '../components/NavBar'

interface InitialProps {
    rentProperties: Property[]
    saleProperties: Property[]
    user?: Pick<User, 'id' | 'name'>
}

const Page = ({ rentProperties, saleProperties, user }: InitialProps) => {

    const tabs: TabContainerProps['tabs'] = [{
        body: <PropertiesContainer properties={saleProperties} />,
        title: 'For Sale'
    }, {

        body: <PropertiesContainer properties={rentProperties} />,
        title: 'For Rent'
    }]
    return <Layout userName={user?.name} noNav>

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
                        {
                            user ? <AvatarPopover userName={user.name} /> :
                                <>
                                    <Button onClick={() => Router.push('/login')} height={40} appearance="primary">Login</Button>
                                    <Button onClick={() => Router.push('/register')} height={40} appearance="minimal">Register</Button>
                                </>
                        }

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


Page.getInitialProps = async ({ query, ...ctx }): Promise<InitialProps> => {
    const token = getToken(ctx)
    const client = new GraphQLClient('https://zanga-api.now.sh/graphql', {
        headers: token.length ? {
            authorization: 'Bearer ' + token
        } : null
    })
    const sdk = getSdk(client)
    const { properties: rentProperties } = await sdk.properties({ type: CostType.Rent })
    const { properties: saleProperties } = await sdk.properties({ type: CostType.Sale })
    // rentProperties[0]
    return {
        rentProperties: parseProperties(rentProperties),
        saleProperties: parseProperties(saleProperties),
        user: !!token.length ? (await sdk.me()).me : null
    }


}

export default Page