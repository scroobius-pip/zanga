import { Card, Text, Pane, Heading, IconButton, Icon, Button, Tooltip } from 'evergreen-ui';
import { colors } from '../styles';
import copyPropertyLink from '../functions/copyPropertyLink';
import Router from 'next/router'
import { isMobile } from 'react-device-detect'
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
    refId?: string
    index?: number
}

export default ({ active, property: { imageUrl, title, location, price, id }, onClick, onDelete, refId, index }: Props) => <Card
    display='flex'
    flexDirection='row'
    hoverElevation={3}
    justifyContent='space-between'
    alignItems='flex-end'
    background='white'
    marginTop={10}
    padding={15}
    borderRight
    borderRightWidth={4}
    borderRightColor={index % 2 !== 0 ? colors.primary : colors.primary}
    elevation={2}

    activeElevation={1}
    onClick={onClick}
><Pane display='flex'
    justifyContent='space-between'
    flexDirection='row'
    maxHeight={isMobile ? '' : 100}

>

        <Pane flex={2} style={{ margin: '-15px 0px -15px -15px', }}>
            <img style={{ objectFit: 'cover', height: '100%' }} width={'100%'} src={imageUrl} />
        </Pane>
        <Pane flex={5} display='flex' flexDirection='column' padding={10}>
            <Heading color={colors.grey} size={500}>{title}</Heading>
            <Pane display='flex' flexDirection='row' alignItems='center' marginTop={5}>
                <Icon icon="map-marker" marginRight={5} size={16} />
                <Text size={500}> {location}</Text>
            </Pane>
            <Pane display='flex' flexDirection='row' justifyContent='space-between' alignItems='center'>
                <Heading color={colors.primary} size={700}>{price}</Heading>
                <Pane>
                    <Tooltip content={onDelete ? 'Delete Property' : 'Share Property'}>

                        {onDelete ? <IconButton icon='trash' onClick={(e) => {
                            e.stopPropagation()
                            onDelete()
                        }} height={40} intent='danger' appearance="minimal">Delete</IconButton> :
                            <IconButton
                                onClick={(e) => {
                                    e.stopPropagation()
                                    if (!refId) {
                                        Router.push('/login')
                                        return
                                    }
                                    copyPropertyLink(`https://zanga.now.sh/property/${id}?ref=${refId}`)
                                }}
                                height={40}
                                iconColor={colors.primary} appearance="minimal" icon='social-media' />}
                    </Tooltip>
                </Pane>
            </Pane>
        </Pane>
    </Pane>

</Card>