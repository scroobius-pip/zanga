import Layout from '../components/Layout'
import { Pane, Card, Paragraph, Heading, Button,Text } from 'evergreen-ui'
import ContentNav, { ContentNavProps } from '../components/ContentNav'
import { colors } from '../styles'
import { useState } from 'react'
import { useRouter, NextRouter } from 'next/router'
import FeaturedCarousel from '../components/FeaturedGrid'
import getToken from '../functions/getToken'
import { GraphQLClient } from 'graphql-request'
import { getSdk, User } from '../generated/graphql'
import logout from '../functions/logout'
import UnderlineText from '../components/UnderlineText'
import FeaturedPropertyCard from '../components/FeaturedPropertyCard'

interface InitialProps {
    user?: Pick<User, 'id' | 'name'>
}


const initTabs = (router:NextRouter): ContentNavProps['tabs']=> {
 return   [
        {
            title: 'Property',
            icon: '/home.svg',
            Content: <>
                <Heading size={900}>Find your ideal home.</Heading>
                <Paragraph size={500} marginTop="default">
                    Size 500. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Size 500. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Size 500. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </Paragraph>
                <div style={{width:'100%',display:'flex',justifyContent:'flex-end'}}>

                <Button onClick={() => router.push('/properties')} marginTop='default' backgroundColor={colors.primary}  appearance='primary' iconAfter='arrow-right' height={56}>
                    Properties
                </Button>
                {/* <a href='/properties' style={{textDecoration:'none',color:'inherit'}} onClick={()=>router.push('/properties')}>
                    <UnderlineText text='Properties'/>
                </a> */}
                </div>
            </>,
            image: '/property.jpg'
        },
        {
            title: 'Earn',
            icon: '/earn.svg',
            Content: <>
                <Heading size={900}>Share property & earn commissions.</Heading>
                <Paragraph size={500} marginTop="default">
                    Size 500. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Size 500. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Size 500. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
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
            image: '/earn.jpg'
        },
    
        {
            title: 'Advertise',
            icon: '/advertising.svg',
            Content: <>
                <Heading size={900}>Advertise your property on zanga.</Heading>
                <Paragraph size={500} marginTop="default">
                    Size 500. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Size 500. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Size 500. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Paragraph>
            <Button onClick={() => router.push('/contact-us')} marginTop='default' backgroundColor={colors.primary}   iconAfter='chat' height={56}>
                    Contact us
                </Button>
            </>,
            image: '/advertising.jpg'
        },
        {
            title: 'Colet',
            icon: '/colet.svg',
            Content: <>
                <Heading size={900}>Find a flat mate and split rent</Heading>
                <Paragraph size={500} marginTop="default">
                    Size 500. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    
            </Paragraph>
                <Button marginTop='default' intent='danger'   height={56}>
                    Coming Soon
            </Button>
            </>,
            image: '/colet.jpg'
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

const Page = ({user}:InitialProps) => {
    
    const router = useRouter()
    const tabs = initTabs(router)
    const [image, setImage] = useState(tabs[0].image)

    return <Layout userName={user?.name} fullWidth>
        <Pane width={'100%'}  margin='auto' >
            <Pane height='90vh' marginTop={-50} position='relative' >

           
          {
              tabs.map((t,i)=>{
                  return  <>
                   <img className='tab-image' src={t.image} 
                  width='100%' height='80%'
                  
                   style={{ 
                       position: 'absolute',
                    zIndex: - 10*(i+1),
                   backgroundAttachment:'cover',
                   opacity:t.image===image?1:0,
                   objectFit:'cover'
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
            </Pane>
            <Pane  maxWidth={1200} paddingLeft={10} paddingRight={10} margin='auto'>
                <Pane  marginBottom={30} >
                <Heading  textAlign='left' marginBottom={5} fontWeight={900} size={900}>Featured Property</Heading>
                <Text color={colors.grey} textAlign='left' size={600}>Trusted and beautiful properties in Nigeria</Text>
                </Pane>
                <FeaturedCarousel/>
             
            </Pane>

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

    return {
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