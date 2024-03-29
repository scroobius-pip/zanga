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
import { getSdk, User, CostType, UserType } from '../generated/graphql'
import { parseProperties } from '../functions/parseProperties'
import {
    isMobile
} from 'react-device-detect'

import UserPointCounter, { Props as UserPointCounterProps } from '../components/UserPointCounter'
import UserPropertyPointTable, { Props as UserPropertyPointTableProps } from '../components/UserPropertyPointTable'
import ImageKit from 'imagekit-javascript'

const imagekit = new ImageKit({
    publicKey: "public_fLIG6j3NBbHyQujCF+a3YOjpCrs=",
    urlEndpoint: "https://ik.imagekit.io/myzanga",
    authenticationEndpoint: "https://y-nu.now.sh/server.js",
})



interface InitialProps {
    properties: Property[]
    userName: string
    userType: User['type']
    token: string
    userPointCount?: UserPointCounterProps
    userPropertyPoints?: UserPropertyPointTableProps
}

const Page = ({ properties: initialProperties,
    userName,
    token,
    userType,
    userPointCount,
    userPropertyPoints
}: InitialProps) => {

    const [addFormVisible, setAddFormVisible] = useState(false)
    const [properties, setProperties] = useState(initialProperties)

    const imagekitUpload = (file: File): Promise<{ url: string }> => {
        return new Promise((resolve, reject) => {
            imagekit.upload({
                file,
                fileName: file.name,
                tags: [userName],
                folder: userName

            }, (err, result: { url: string }) => {
                err ? reject('Unable to upload image') : resolve(result)
            })
        })
    }

    const uploadImages = async (files: File[]): Promise<string[]> => {
        const ImageUploadPromise = files.map(imagekitUpload)
        return (await Promise.all(ImageUploadPromise)).map(p => p.url)
    }

    const addProperty = async (fields: AddPropertyFormState) => {
        try {
            console.log('token' + token)
            const client = new GraphQLClient('https://zanga-api.now.sh/graphql', {
                headers: token.length ? {
                    authorization: 'Bearer ' + token
                } : null
            })


            const sdk = getSdk(client)
            const imageUrls = await uploadImages(fields.imageFiles)
            const { createProperty: result } = await sdk.addProperty({
                input: {
                    costType: CostType[fields.costType],
                    costValue: fields.costValue,
                    description: fields.description,
                    images: imageUrls,
                    location: fields.location,
                    title: fields.title,
                    featured: fields.featured
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

    const agentTabs: TabContainerProps['tabs'] = [{
        body: <PropertiesContainer view='list' deletable onDelete={deleteProperty} properties={properties} />,

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

    const userTabs: TabContainerProps['tabs'] = [{
        body: <Pane>
            <UserPointCounter {...userPointCount} />
            <UserPropertyPointTable {...userPropertyPoints} />
        </Pane>,
        title: 'Statistics'
    }]

    const isAgent = userType === UserType.Agency
    return <Layout userName={userName}>

        <Pane display='flex' justifyContent='space-between' alignItems='flex-end'>
            <Heading size={900}>Dashboard</Heading>
            {
                isAgent &&
                <Button iconAfter='add' onClick={() => setAddFormVisible(true)} marginTop={10} height={40} appearance="primary" marginRight={12} >
                    Create Property
                </Button>
            }
        </Pane>
        <Pane marginTop={25} background='tint1' padding={'2vw'}>

            <TabsContainer tabs={isAgent ? agentTabs : userTabs} />
        </Pane>
        <SideSheet
            shouldCloseOnOverlayClick={false}
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

    return {
        userName: me.name,
        properties: parseProperties(me.properties),
        userType: me.type,
        token,
        ...(me.type === UserType.Individual ? {
            userPointCount: {

                totalProfit: me.point.totalProfit,
                totalPoints: me.point.totalPoints
            },
            userPropertyPoints: {
                propertyPoints: me.point.propertyPoints.map(point => {
                    return {
                        property: {
                            id: point.propertyId,
                            title: point.propertyTitle
                        },
                        points: point.points,
                        profit: point.profit
                    }
                })
            }
        } : {})
    }

}


export default Page