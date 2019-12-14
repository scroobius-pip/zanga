import { Card, Text, Pane, Heading, IconButton, Icon, Button } from 'evergreen-ui';
import { colors } from '../styles';
import copyPropertyLink from '../functions/copyPropertyLink';

export interface Property {
    id: string
    imageUrl: string
    title: string
    location: string
    price: string

}

interface Props {
    active: boolean
    property: Property
    onClick: () => any
    onDelete?: () => any
}

export default ({ active, property: { imageUrl, title, location, price }, onClick, onDelete }: Props) => <Card
    display='flex'
    flexDirection='row'
    hoverElevation={3}
    justifyContent='space-between'
    alignItems='flex-end'
    background='white'
    marginTop={10}
    padding={15}
    elevation={2}
    // elevation={active ? 1 : 0}
    // border='default'
    // borderWidth={active ? 2 : 0}
    // borderColor={colors.primary}
    activeElevation={1}
    onClick={onClick}
><Pane display='flex'
    flexDirection='row'>

        <div style={{ margin: -15 }}>
            <img height={'100%'} width={140} src={imageUrl} />
        </div>
        <Pane paddingLeft={20} display='flex' flexDirection='column'>
            <Heading color={colors.grey} size={500}>{title}</Heading>
            <Pane display='flex' flexDirection='row' alignItems='center' marginTop={5}>
                <Icon icon="map-marker" marginRight={5} size={16} />
                <Text size={500}> {location}</Text>
            </Pane>
            <Heading marginTop={5} color={colors.primary} size={700}>{price}</Heading>
        </Pane>
    </Pane>
    <Pane>
        {onDelete ? <Button onClick={(e) => {
            e.stopPropagation()
            onDelete()
        }} height={40} intent='danger' appearance="minimal">Delete</Button> :
            <IconButton
                onClick={(e) => {
                    e.stopPropagation()
                    copyPropertyLink('http://localhost:3000/')
                }}
                iconColor={colors.primary} appearance="minimal" icon='social-media' height={56} />}
    </Pane>
</Card>