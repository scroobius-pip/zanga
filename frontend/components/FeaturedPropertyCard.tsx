import { Card, Pane, Heading, Text, Tooltip, IconButton } from 'evergreen-ui'
import { colors } from '../styles'
import { Router } from 'next/router'
import copyPropertyLink from '../functions/copyPropertyLink'

export default () => {
    return <a
        style={{
            textDecoration: 'none',
            outline: 'none',
            // maxWidth: 328
            // color:'inherit'
        }}
        href='/properties'>
        <Card

            background='white'
            elevation={2}
            hoverElevation={4}
        // maxWidth={328}
        // border
        // maxHeight={200}
        >
            <Pane height='158px'
                borderTopLeftRadius={5}
                borderTopRightRadius={5}
            >
                <img height='100%' width='100%' style={{
                    objectFit: 'cover',
                    borderTopLeftRadius: 5,
                    borderTopRightRadius: 5
                }} src='https://is1-3.housingcdn.com/4f2250e8/f37b0ec815585f31fa77f299085b55af/v0/medium/konark_meadows-shahad-mumbai-atlanta_landmark.jpeg' />
            </Pane>
            <Pane padding={20} >
                <Heading padding={2} color={colors.grey} size={500}>Duplex for rent in abuja</Heading>
                <Heading padding={2} size={700}>₦29,000,000</Heading>
                <Pane style={{ borderRadius: 2, }} display='flex' flexDirection='row' justifyContent='space-between' alignItems='center'>

                    <Pane style={{ backgroundColor: '#FFC82D', padding: 5, borderRadius: 2 }}>
                        <Text size={500} style={{ fontWeight: '600' }} color='white'>FEATURED</Text>
                    </Pane>
                    <Pane>
                        <Tooltip content={'Share Property'}>

                            {
                                <IconButton
                                    onClick={(e) => {
                                        // e.stopPropagation()
                                        // if (!refId) {
                                        //     Router.push('/login')
                                        //     return
                                        // }
                                        // copyPropertyLink(`https://myzanga.com/property/${id}?ref=${refId}`)
                                    }}
                                    height={40}
                                    iconColor={colors.primary} appearance="minimal" icon='social-media' />}
                        </Tooltip>
                    </Pane>
                </Pane>
            </Pane>
        </Card>
    </a>
}