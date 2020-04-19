import { Pane, Card, Heading, Button, Paragraph } from 'evergreen-ui'
import { colors } from '../styles'
import Layout from '../components/Layout'

import Router from 'next/router'
import { GraphQLClient } from 'graphql-request'
import { getSdk, CostType, User } from '../generated/graphql'
import { parseProperties } from '../functions/parseProperties'
import getToken from '../functions/getToken'
import { AvatarPopover } from '../components/NavBar'
import Head from 'next/head'
import logout from '../functions/logout'
import Link from 'next/link'
import PropertySection from '../components/PropertySection'
import { Property } from '../components/PropertyCard'

interface InitialProps {
    rentProperties: Property[]
    saleProperties: Property[]
    user?: Pick<User, 'id' | 'name'>
}

const Page = ({ rentProperties, saleProperties, user }: InitialProps) => {


    return <Layout fullWidth userName={user?.name} >
        <Head>
            <title>Zanga - Find Your Ideal Property</title>
            {/* <meta name="viewport" content="width=device-width, initial-scale=1.0" /> */}

        </Head>
        <Pane
            height={'100%'}
            width={'100%'}
        >
            <Card margin='auto' maxWidth={1200} elevation={3} width='100%' padding={20}
                background='white'
            >
                <Pane>
                    {/* <Pane display='flex' justifyContent='space-between'>
                        <Link href='/'>
                            <a href='/'>

                                <img style={{ cursor: 'pointer' }} src='/zanga-logo.svg' height={40} />
                            </a>
                        </Link>
                        <Pane>
                            {
                                user ? <AvatarPopover userName={user.name} /> :
                                    <>
                                        <Button onClick={() => Router.push('/login')} height={40} appearance="primary">Login</Button>
                                        <Button onClick={() => Router.push('/register')} height={40} appearance="minimal">Register</Button>
                                    </>
                            }

                        </Pane>
                    </Pane> */}
                    <Pane >

                        <Heading className='f-wght_900' fontWeight={700} size={900}>
                            {'Find your '}
                            <span style={{ color: colors.primary }}>ideal</span> property
                        </Heading>

                    </Pane>
                    <Pane>
                        <Pane>
                            <Paragraph fontWeight={500} size={500} marginTop="default">
                                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Saepe ut possimus illo voluptatum, consectetur quae.
                        </Paragraph>
                            {/* <Paragraph size={400} >
                            You'll be contacted once it's sold
                        </Paragraph> */}
                        </Pane>

                    </Pane>
                </Pane>

            </Card>

        </Pane>

        <PropertySection
            user={user}
            rentProperties={rentProperties}
            saleProperties={saleProperties}
            devProperties={[]}
            view='grid'
            disablePropertyCardButton

        />
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
        user: !!token.length ? await (async () => {
            try {

                return (await sdk.me()).me
            } catch (err) {
                logout()
                return null
            }

        })() : null
    }


}

export default Page