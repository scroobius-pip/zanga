import Layout from '../components/Layout'
import { Heading, Pane, Button, SideSheet, Position, Paragraph, Alert } from 'evergreen-ui'
import { Property } from '../components/PropertyCard'
import TabsContainer, { TabContainerProps } from '../components/TabsContainer'
import PropertiesContainer from '../components/PropertiesContainer'
import AddPropertyForm from '../components/AddPropertyForm'
import { useState } from 'react'
import getToken from '../functions/getToken'
import redirect from '../functions/redirect'
import { GraphQLClient } from 'graphql-request'
import { getSdk, User } from '../generated/graphql'
import { parseProperties } from '../functions/parseProperties'

interface InitialProps {
    properties: Property[]
    userName: string
    userType: User['type']
}

const Page = ({ properties, userName }: InitialProps) => {
    const [addFormVisible, setAddFormVisible] = useState(false)


    const tabs: TabContainerProps['tabs'] = [{
        body: <PropertiesContainer deletable properties={properties} />,

        title: 'Properties'
    },
    {
        body: <Alert
            intent="none"
            title="No Contacts Yet"
            marginBottom={32}
        />,
        title: 'Contacts'
    }
    ]

    return <Layout userName={userName}>

        <Pane display='flex' justifyContent='space-between'>
            <Heading size={900}>Dashboard</Heading>
            <Button iconAfter='add' onClick={() => setAddFormVisible(true)} marginTop={10} height={40} appearance="primary" marginRight={12} >
                Create Property
                </Button>
        </Pane>
        <Pane marginTop={25} background='tint1' padding={15}>

            <TabsContainer tabs={tabs} />
        </Pane>
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

Page.getInitialProps = async ({ query, ...ctx }): Promise<InitialProps> => {
    const token = getToken(ctx)

    if (!token) {
        redirect(ctx, '/login')
    }


    const client = new GraphQLClient('https://zanga-api.now.sh/graphql', {
        headers: token.length ? {
            authorization: 'Bearer ' + token
        } : null
    })
    const sdk = getSdk(client)
    const { me } = await sdk.dashboard()
    return {
        userName: me.name,
        properties: parseProperties(me.properties),
        userType: me.type
    }

}


export default Page