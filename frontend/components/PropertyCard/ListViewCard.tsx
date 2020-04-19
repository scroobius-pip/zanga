import { Card, Pane, Heading, Icon, Tooltip, IconButton, Paragraph, Text } from 'evergreen-ui'
import { colors } from '../../styles'
import { isMobile } from 'react-device-detect'
import Router from 'next/router'
import copyPropertyLink from '../../functions/copyPropertyLink'
import { CardProps } from './'

const ListViewCard = ({ active, property: { imageUrl, title, location, price, id, description }, onClick, onDelete, refId, index }: CardProps) => {
    return (
        <a
            href={`/property/${id}`}
        >

            <Card
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
                // alignItems='center'
                // flex={1}
                flexDirection='row'
                maxHeight={isMobile ? '' : 150}

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
                                                copyPropertyLink(`https://myzanga.com/property/${id}?ref=${refId}`, title)
                                            }}
                                            height={40}
                                            iconColor={colors.primary}
                                            appearance="minimal"
                                            icon='social-media' />}
                                </Tooltip>

                            </Pane>

                        </Pane>

                        <Paragraph>
                            {description}
                        </Paragraph>

                    </Pane>
                </Pane>

            </Card>
        </a>
    )
}

export default ListViewCard