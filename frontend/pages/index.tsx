import Layout from '../components/Layout'
import { Pane, Card, Paragraph, Heading, Button, Text } from 'evergreen-ui'
import ContentNav, { ContentNavProps } from '../components/ContentNav'
import { colors } from '../styles'
import { useState } from 'react'
import { useRouter, NextRouter } from 'next/router'
import FeaturedCarousel from '../components/FeaturedGrid'
import { GraphQLClient } from 'graphql-request'
import { getSdk, User } from '../generated/graphql'
import ReactMarkdown from 'react-markdown/with-html'

import ClientLogos from '../components/ClientLogos'
import WithUser from '../components/WithUser'
import { Property } from '../components/PropertyCard'
import { parseProperties } from '../functions/parseProperties'
import properties from '../content/properties'
import earn from '../content/earn'
import advertise from '../content/advertise'
import colet from '../content/colet'
import mortgage from '../content/mortgage'

interface InitialProps {
    user?: Pick<User, 'id' | 'name'>
    featuredProperties: Property[]
}


const initTabs = (router: NextRouter): ContentNavProps['tabs'] => {
    return [
        {
            title: 'Property',
            icon: '/home-run.svg',
            Content: <>
                <Heading fontWeight={700} size={900}>Find your ideal home.</Heading>
                <Paragraph size={500} marginTop="default">
                    <ReactMarkdown
                        className='content'
                        source={properties}

                    />

                </Paragraph>
                <div style={{
                    width: '100%', display: 'flex', justifyContent: 'flex-end',

                }}>

                    <Button onClick={() => router.push('/properties')} marginTop='default' backgroundColor={colors.primary} appearance='primary' iconAfter='arrow-right' height={56}>
                        Properties
                </Button>
                    {/* <a href='/properties' style={{textDecoration:'none',color:'inherit'}} onClick={()=>router.push('/properties')}>
                    <UnderlineText text='Properties'/>
                </a> */}
                </div>
            </>,
            image: 'https://ik.imagekit.io/myzanga/property_o444TeODtMI.jpg'
        },
        {
            title: 'Earn',
            icon: '/wallet.svg',
            Content: <>
                <Heading fontWeight={700} size={900}>Share property & earn commissions.</Heading>
                <Paragraph size={500} marginTop="default">
                    <ReactMarkdown
                        className='content'
                        source={earn}

                    />
                </Paragraph>
                <Button
                    onClick={() => router.push('/earn')}
                    marginTop='default'
                    backgroundColor={colors.primary}
                    appearance='primary'
                    iconAfter='arrow-right'
                    height={56}>
                    Earn
            </Button>
            </>,
            image: 'https://ik.imagekit.io/myzanga/earn_dgkkIMeCX.jpg'
        },

        {
            title: 'Advertise',
            icon: '/megaphone.svg',
            Content: <>
                <Heading fontWeight={700} size={900}>Advertise your property on zanga.</Heading>

                <Paragraph size={500} marginTop="default">
                    <ReactMarkdown
                        className='content'
                        source={advertise}

                    />
                </Paragraph>
                <Button onClick={() => router.push('/contact-us')} marginTop='default' backgroundColor={colors.primary} iconAfter='chat' height={56}>
                    Contact us
                </Button>
            </>,
            image: 'https://ik.imagekit.io/myzanga/advertise__EBIVlKO4.jpg'
        },
        {
            title: 'Colet',
            icon: '/colet.svg',
            Content: <>
                <Heading fontWeight={700} size={900}>Find Roommates and split rent</Heading>
                <Paragraph size={500} marginTop="default">
                    <ReactMarkdown
                        className='content'
                        source={colet}

                    />
                </Paragraph>
                <Button marginTop='default' intent='danger' height={56}>
                    Coming Soon
            </Button>
            </>,
            image: 'https://ik.imagekit.io/myzanga/colet_jXI9ipMeo.jpg'
        },
        {
            title: 'Mortgage',
            icon: '/mortgage.svg',
            Content: <>
                <Heading size={900}>Mortgage</Heading>
                <Paragraph size={500} marginTop="default">
                    <ReactMarkdown
                        className='content'
                        source={mortgage}

                    />
                </Paragraph>
                <Button marginTop='default' intent='danger' height={56}>
                    Coming Soon
            </Button>
            </>,
            image: '/colet.jpghttps://ik.imagekit.io/myzanga/advertising_ZmC1JzsP9.jpg'
        },
        // {
        //     title: 'Mortgage',
        //     icon: '/colet.svg',
        //     Content: <>
        //         <Heading size={900}>Find a flat mate and split rent</Heading>
        //         <Paragraph size={500} marginTop="default">
        //             Size 500. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

        //     </Paragraph>
        //         <Button marginTop='default' intent='danger'   height={56}>
        //             Coming Soon
        //     </Button>
        //     </>,
        //     image: '/colet.jpg'
        // }

    ]
}

const Page = ({ user, featuredProperties }: InitialProps) => {

    const router = useRouter()
    const tabs = initTabs(router)
    const [image, setImage] = useState(tabs[0].image)

    return <Layout userName={user?.name} fullWidth>
        <Pane width={'100%'} margin='auto'  >
            <Pane height='90vh' marginTop={-50} position='relative' >



                <Pane position='relative' top={50} maxWidth={1000} margin='auto' >
                    <Card maxWidth={600} float='left' position='absolute'>
                        <ContentNav
                            tabs={tabs}
                            onSelect={(index) => {
                                setImage(tabs[index].image)
                            }}
                        />

                    </Card>
                </Pane>
                {
                    tabs.map((t, i) => {
                        return <>
                            <img className='tab-image' src={t.image}
                                width='100%' height={'100%'}

                                style={{
                                    position: 'absolute',
                                    zIndex: - 10 * (i + 1),
                                    backgroundAttachment: 'cover',
                                    opacity: t.image === image ? 1 : 0,
                                    objectFit: 'cover'
                                }} />
                            <style jsx>
                                {`
                       .tab-image{
                        transition: all 1s ease;
                       }
                       `}
                            </style>
                        </>
                    })
                }
            </Pane>


            <Pane maxWidth={1200} paddingLeft={10} paddingRight={10} margin='auto' marginTop={100}>
                <Pane marginBottom={30} >
                    <Heading textAlign='left' marginBottom={5} fontWeight={900} size={900}>Featured Property</Heading>
                    <Text color={colors.grey} textAlign='left' size={600}>Trusted and beautiful properties in Nigeria</Text>
                </Pane>
                <FeaturedCarousel featuredProperties={featuredProperties} />

            </Pane>
            <Pane maxWidth={1200} paddingLeft={10} paddingRight={10} margin='auto' marginTop={50}>
                <Pane marginBottom={30} >
                    <Heading textAlign='left' marginBottom={5} fontWeight={700} size={700}>Our Clients</Heading>
                </Pane>
                <ClientLogos />

            </Pane>
        </Pane>

    </Layout>
}

Page.getInitialProps = async ({ query }): Promise<InitialProps> => {
    const client = new GraphQLClient('https://zanga-api.now.sh/graphql')
    const sdk = getSdk(client)
    try {
        const { featuredProperties = [] } = (await sdk.featured())
        console.log(featuredProperties)
        return { featuredProperties: parseProperties(featuredProperties) }
    } catch (error) {
        return { featuredProperties: [] }
    }

}

export default WithUser(Page)