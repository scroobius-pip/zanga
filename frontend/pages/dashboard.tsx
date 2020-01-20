import Layout from '../components/Layout'
import { Heading, Pane, Button, SideSheet, Position, Paragraph, Alert, toaster, IconButton } from 'evergreen-ui'
import { Property } from '../components/PropertyCard'
import TabsContainer, { TabContainerProps } from '../components/TabsContainer'
import PropertiesContainer from '../components/PropertiesContainer'
import AddPropertyForm, { AddPropertyFormState } from '../components/AddPropertyForm'
import { useState } from 'react'
import getToken from '../functions/getToken'
import redirect from '../functions/redirect'
import { GraphQLClient } from 'graphql-request'
import { getSdk, User, CostType } from '../generated/graphql'
import { parseProperties } from '../functions/parseProperties'
import {
    isMobile
} from 'react-device-detect'
interface InitialProps {
    properties: Property[]
    userName: string
    userType: User['type']
    token: string
}

const Page = ({ properties: initialProperties, userName, token }: InitialProps) => {
    const [addFormVisible, setAddFormVisible] = useState(false)
    const [properties, setProperties] = useState(initialProperties)

    const addProperty = async (fields: AddPropertyFormState) => {
        try {
            console.log('token' + token)
            const client = new GraphQLClient('https://zanga-api.now.sh/graphql', {
                headers: token.length ? {
                    authorization: 'Bearer ' + token
                } : null
            })


            const sdk = getSdk(client)
            const { createProperty: result } = await sdk.addProperty({
                input: {
                    costType: CostType[fields.costType],
                    costValue: fields.costValue,
                    description: fields.description,
                    images: fields.images,
                    location: fields.location,
                    title: fields.title
                }
            })
            return !!result.length
        } catch (error) {
            console.log(error)
            return false
        }
    }

    const deleteProperty = async (id: string) => {
        setProperties([...properties.filter(property => property.id !== id)])
        try {
            console.log('token' + token)
            const client = new GraphQLClient('https://zanga-api.now.sh/graphql', {
                headers: token.length ? {
                    authorization: 'Bearer ' + token
                } : null
            })


            const sdk = getSdk(client)
            console.log('id' + id)
            const { deleteProperty: result } = await sdk.deleteProperty({ id })
            if (result) {
                toaster.success('Deleted Property')
                // document.location.reload()
            }

        } catch (error) {
            console.log(error)
            return false
        }
    }

    const tabs: TabContainerProps['tabs'] = [{
        body: <PropertiesContainer deletable onDelete={deleteProperty} properties={properties} />,

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

        <Pane display='flex' justifyContent='space-between' alignItems='flex-end'>
            <Heading size={900}>Dashboard</Heading>
            <Button iconAfter='add' onClick={() => setAddFormVisible(true)} marginTop={10} height={40} appearance="primary" marginRight={12} >
                Create Property
                </Button>
        </Pane>
        <Pane marginTop={25} background='tint1' padding={'2vw'}>

            <TabsContainer tabs={tabs} />
        </Pane>
        <SideSheet

            preventBodyScrolling
            width={isMobile ? '100%' : undefined}
            isShown={addFormVisible}
            onCloseComplete={() => setAddFormVisible(false)}
        >
            <Pane display='flex' justifyContent='center' flexDirection='column' padding={25}>
                <IconButton
                    // appearance='minimal'
                    marginLeft='auto'
                    onClick={() => setAddFormVisible(false)}
                    icon='cross'
                />
                <AddPropertyForm submit={addProperty.bind(this)} />
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

    console.log('tokne' + token)
    return {
        userName: me.name,
        properties: parseProperties(me.properties),
        userType: me.type,
        token
    }

}


export default Page