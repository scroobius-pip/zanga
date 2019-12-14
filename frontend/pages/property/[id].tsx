import { useRouter } from 'next/dist/client/router'
import Layout from '../../components/Layout'
import { Pane, Heading, Icon, Text, Paragraph, Button, Card, TextInput, TextInputField, toaster } from 'evergreen-ui'
import { colors } from '../../styles'
import Gallery from 'react-grid-gallery';
import copyPropertyLink from '../../functions/copyPropertyLink';
import { Property } from '../../components/PropertyCard';

interface InitialProps {
    property: IProperty
    userName: string
}


const Page = ({ property, userName }: InitialProps) => {
    // const router = useRouter()
    // const { id } = router.query



    return <Layout userName={userName}>
        <Pane background='white' elevation={2} padding={50} height='100%' textAlign='center' display='flex' flexDirection='column'>
            <Pane>
                <Gallery images={property.images.map(image => {
                    return {
                        src: image,
                        thumbnail: image,
                        thumbnailWidth: 200,
                        thumbnailHeight: 200,
                    }
                })} />
            </Pane>
            <Pane>
                <Heading marginTop={20} size={700} color={colors.primary}>{property.title}</Heading>
            </Pane>
            <Pane marginTop={10} display='flex' alignSelf='center' flexDirection='row' alignItems='center' >
                <Icon icon="map-marker" marginRight={5} size={16} />
                <Text size={500}>{property.location}</Text>
            </Pane>
            <Pane marginTop={20} marginBottom={30}>

                <Card background="tint1"
                    padding={20}
                    border="muted" >
                    <Heading size={600} textAlign='center'>
                        Property Description
                </Heading>
                    <Paragraph marginTop={20} size={500} textAlign='center'>
                        {property.description}
                    </Paragraph>
                </Card>
                <Heading marginTop={20} size={900}>{}</Heading>
                <Button onClick={() => copyPropertyLink('')} marginTop={20} height={40} appearance="primary" marginRight={12} iconAfter="link">
                    Get Commission Link
                </Button>

            </Pane>
            <Card marginTop={50} background='tint1' maxWidth={450} elevation={3} margin='auto' padding={25}>
                <Heading marginTop={10} size={700}>Interested in this property ?</Heading>
                <Text>Agent - {property.ownerName}</Text>
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

Page.getInitialProps = async ({ req }): Promise<InitialProps> => {
    const IMAGES = [
        'https://images.nigeriapropertycentre.com/properties/images/547078/05df485e695a17-a-room-self-contain-at-alagboke-self-contained-for-rent-alagbole-ifo-ogun.jpg',
        'https://images.nigeriapropertycentre.com/properties/images/547078/05df485e695a17-a-room-self-contain-at-alagboke-self-contained-for-rent-alagbole-ifo-ogun.jpg',
        'https://images.nigeriapropertycentre.com/properties/images/547078/05df485e695a17-a-room-self-contain-at-alagboke-self-contained-for-rent-alagbole-ifo-ogun.jpg',
        'https://images.nigeriapropertycentre.com/properties/images/547078/05df485e695a17-a-room-self-contain-at-alagboke-self-contained-for-rent-alagbole-ifo-ogun.jpg',
        'https://images.nigeriapropertycentre.com/properties/images/547078/05df485e695a17-a-room-self-contain-at-alagboke-self-contained-for-rent-alagbole-ifo-ogun.jpg',
        'https://images.nigeriapropertycentre.com/properties/images/547078/05df485e695a17-a-room-self-contain-at-alagboke-self-contained-for-rent-alagbole-ifo-ogun.jpg',

    ]

    return {
        property: {
            description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui voluptates nemo minus molestiae. Explicabo quasi cumque fugiat autem eos. Quidem?",
            id: '1',
            images: IMAGES,
            location: ' 79/81, Ojodu Akute Road, Via Berger, Akute, Ojodu, Lagos, Nigeria',
            price: '₦200,000',
            title: "1 Bedroom Self Contained (Single Rooms) For Rent",
            ownerName: 'Anadimma Properties'

        },
        userName: null
    }
}

export default Page