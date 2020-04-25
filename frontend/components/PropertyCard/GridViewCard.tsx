import { Card, Pane, Heading, Tooltip, IconButton, Text, Paragraph } from 'evergreen-ui'
import { colors } from '../../styles'
import { CardProps } from './'
import Router from 'next/router'
import copyPropertyLink from '../../functions/copyPropertyLink'

const GridViewCard = ({ active, property:
    { images, title, location, price, id, description, featured },
    onClick,
    onDelete,
    disableButton,
    refId,
    index }: CardProps) => {
    return <a
        style={{
            textDecoration: 'none',
            outline: 'none',
        }}
        href={`/property/${id}`}>
        <Card
            width='100%'
            minWidth={250}
            maxHeight={300}
            marginTop={10}
            onClick={onClick}
            // minHeight={300}
            background='white'
            elevation={2}
            hoverElevation={4}
            borderBottom
            borderBottomWidth={4}
            borderBottomColor={index % 2 !== 0 ? colors.primary : colors.primary}
        >
            <Pane height='158px'
                borderTopLeftRadius={5}
                borderTopRightRadius={5}
            >
                <img height='100%' width='100%' style={{
                    objectFit: 'cover',
                    borderTopLeftRadius: 5,
                    borderTopRightRadius: 5
                }} src={images[0]} />
            </Pane>
            <Pane padding={20} >
                <Heading padding={2} color={colors.grey} size={500}>{title}</Heading>
                <Heading padding={2} size={700}>{price}</Heading>
                <Pane style={{ borderRadius: 2, }} display='flex' flexDirection='row' justifyContent='space-between' alignItems='center'>

                    {featured && <Pane style={{ backgroundColor: '#FFC82D', padding: 5, borderRadius: 2 }}>
                        <Text size={500} style={{ fontWeight: '600' }} color='white'>FEATURED</Text>
                    </Pane>}
                    {!!description && <Paragraph>
                        {description.split('').splice(0, 100).join('') + '...'}
                    </Paragraph>}
                    {!disableButton && < Pane >
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
                    </Pane>}
                </Pane>
            </Pane>
        </Card>
    </a >
}

export default GridViewCard