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

    return <Layout userName={user?.name} noNav>
        <Head>
            <title>Zanga - Share Realestate and Earn Commissions</title>
        </Head>
        <Pane
            height={'100%'}
            width={'100%'}
        >
            <Card margin='auto' maxWidth={800} elevation={3} width='100%' padding={20}
                background='white'
            >
                <Pane>
                    <Pane display='flex' justifyContent='space-between'>
                        <Link href='/'>
                            <img style={{ cursor: 'pointer' }} src='/zanga-logo.svg' height={40} />
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
                    </Pane>
                    <Pane marginTop={35}>
                        <Heading className='f-wght_900' fontWeight={700} size={900}>
                            <span style={{ color: colors.primary }}>Share</span> Property &
            </Heading>
                        <Heading className='f-wght_900' fontWeight={700} size={900}>
                            <span style={{ color: colors.primary }}>Earn</span> Money from  <span style={{ color: colors.primary }}>Commissions</span>
                        </Heading>

                    </Pane>
                    <Pane>
                        <Pane>
                            <Paragraph fontWeight={500} size={500} marginTop="default">
                                Share properties via social media and make commissions from property sales.
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
            view='list'
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