import { useRouter } from 'next/dist/client/router'
import Layout from '../../components/Layout'
import { Pane, Heading, Icon, Text, Paragraph, Button, Card, TextInput, TextInputField, toaster } from 'evergreen-ui'
import { colors } from '../../styles'
import Gallery from 'react-grid-gallery';
import copyPropertyLink from '../../functions/copyPropertyLink';

export default () => {
    // const router = useRouter()
    // const { id } = router.query
    const IMAGES =
        [{
            src: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_b.jpg",
            thumbnail: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_n.jpg",
            thumbnailWidth: 320,
            thumbnailHeight: 174,

        },
        {
            src: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_b.jpg",
            thumbnail: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_n.jpg",
            thumbnailWidth: 320,
            thumbnailHeight: 212,

        },

        {
            src: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_b.jpg",
            thumbnail: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_n.jpg",
            thumbnailWidth: 320,
            thumbnailHeight: 212
        }]


    return <Layout>
        <Pane background='white' elevation={2} padding={50} height='100%' textAlign='center' display='flex' flexDirection='column'>
            <Pane>
                <Gallery images={IMAGES} />
            </Pane>
            <Pane>
                <Heading size={700} color={colors.primary}>4 bedroom terraced duplex for sale</Heading>
            </Pane>
            <Pane display='flex' alignSelf='center' flexDirection='row' alignItems='center' marginTop={5}>
                <Icon icon="map-marker" marginRight={5} size={16} />
                <Text size={500}>Lekki Phase 1, Lekki, Lago</Text>
            </Pane>
            <Pane marginBottom={30}>
                <Paragraph marginTop={20} size={500} >
                    A spacious newly built spacious 5 bedroom bungalow on 550sqm of land at peace land estate Giwa via iju Ishaga in a serene and conducive environment
                </Paragraph>
                <Heading marginTop={20} size={900}>₦ 80,000,000/yr</Heading>
                <Button onClick={() => copyPropertyLink('')} marginTop={20} height={40} appearance="primary" marginRight={12} iconAfter="link">
                    Get Commission Link
                </Button>

            </Pane>
            <Card marginTop={50} background='tint1' maxWidth={450} elevation={3} margin='auto' padding={25}>
                <Heading marginTop={10} size={700}>Interested in this property ?</Heading>
                <Pane marginTop={20}>
                    <TextInputField
                        textAlign='left'
                        color={colors.primary}
                        label='Phone Number'
                        height={40}
                        name="Your phone number"
                        placeholder="Your Phone Number"
                    />
                    <TextInputField
                        textAlign='left'
                        label='Full Name'
                        color={colors.primary}
                        height={40}
                        // marginTop={10}
                        name="Your full name"
                        placeholder="Your full name"
                    />
                    <Button
                        isLoading
                        onClick={() => toaster.notify('Request Successfully Sent!')}
                        marginTop={10}
                        height={40}
                        appearance="primary"
                        marginRight={12}
                        iconAfter='envelope'>
                        Send Request
                </Button>
                </Pane>
            </Card>
        </Pane>
    </Layout>
}