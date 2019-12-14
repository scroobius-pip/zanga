import { useRouter } from 'next/dist/client/router'
import Layout from '../../components/Layout'
import { Pane, Heading, Icon, Text, Paragraph, Button, Card, TextInput, TextInputField, toaster } from 'evergreen-ui'
import { colors } from '../../styles'
import Gallery from 'react-grid-gallery';
import copyPropertyLink from '../../functions/copyPropertyLink';
import { Property } from '../../components/PropertyCard';
import { GraphQLClient } from 'graphql-request';
import { getSdk, CostType, User } from '../../generated/graphql';
import { parseProperties } from '../../functions/parseProperties';
import getToken from '../../functions/getToken';
import AgentContactForm from '../../components/AgentContactForm';

interface InitialProps {
    property: IProperty
    user?: Pick<User, 'id' | 'name'>
    referrerId?: string
}


const Page = ({ property, user, referrerId }: InitialProps) => {


    return <Layout userName={user?.name}>

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
                <Button onClick={() => copyPropertyLink(`zanga.now.sh/property/${property.id}?ref=${user.id}`)} marginTop={20} height={40} appearance="primary" marginRight={12} iconAfter="link">
                    Get Commission Link
                </Button>

            </Pane>
            <Card marginTop={50} background='tint1' maxWidth={450} elevation={3} margin='auto' padding={25}>
                <Heading marginTop={10} size={700}>Interested in this property ?</Heading>
                <Text>Agent - {property.ownerName}</Text>
                <Pane marginTop={20}>
                    <AgentContactForm propertyId={property.id} referrer={referrerId} />
                </Pane>
            </Card>
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
    const { property: { description, city, costType, costValue, id, images, ownerName, state, title } } = await sdk.property({ id: query.id })





    const price = Intl.NumberFormat().format(costValue);
    return {
        property: {
            description,
            id,
            images,
            location: `${state},${city}`,
            ownerName,
            price: costType === CostType.Rent ? `₦${price}/yr` : `₦${price}`,
            title
        },
        user: !!token.length ? (await sdk.me()).me : null,
        referrerId: query.ref
    }


}

export default Page