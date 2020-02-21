import { Card, Pane, Button, Text, Paragraph, Heading, Spinner } from 'evergreen-ui'
import { colors } from '../styles'
import { useState, useEffect } from 'react'
import { GraphQLClient } from 'graphql-request'
import { getSdk } from '../generated/graphql'

export interface Props {
    totalPoints: number
    totalProfit: number
}

export default (props: Props) => {
    const [currentRate, setCurrentRate] = useState<number>()


    useEffect(() => {
        const client = new GraphQLClient('https://zanga-api.now.sh/graphql')
        const sdk = getSdk(client)
        sdk.currentRate().then(result => {
            setCurrentRate(result.currentRate)
        })
    }, [])
    return <Card
        elevation={2}
        hoverElevation={3}
        padding={20}
        marginTop={20}
        display='flex'
        justifyContent='center'
        textAlign='center'
    // background='red'
    >
        <Pane>

            <Pane
                display='flex'

                borderRadius={30}
                justifyContent='center'
                marginTop={10}
            >
                <Pane
                    padding={10}
                    borderLeft='10'
                    backgroundColor={colors.background}
                    borderTopLeftRadius={5}
                    borderBottomLeftRadius={5}
                >
                    <Text size={500}>
                        {props.totalPoints}
                    </Text>
                </Pane>
                <Pane
                    padding={10}
                    backgroundColor={colors.primary}
                    borderTopRightRadius={5}
                    borderBottomRightRadius={5}
                    display='flex'
                    justifyContent='center'

                >
                    <Text
                        size={500}
                        fontWeight='bold'
                        color={colors.background}>
                        TOKENS
                    </Text>
                </Pane>
            </Pane>
            <Pane padding={5} display="flex" alignItems="center" justifyContent="center">

                {currentRate ? <Text fontWeight='600'>
                    Current Rate - ₦{currentRate}/token
            </Text> :
                    <Spinner />
                }
            </Pane>
            <Pane
                marginTop={10}
                justifyContent='center'
                padding={10}
                backgroundColor={colors.background}
                borderRadius={5}
                display='flex'
                alignItems='center'
            >
                <Heading
                    size={900}
                    fontWeight='bold'
                    color={colors.primary}

                >
                    ₦{props.totalProfit}
                </Heading>
            </Pane>
            <Pane>
                <Paragraph>
                    You will be allowed to withdraw on the last week of the month
                </Paragraph>
            </Pane>
            <Button
                marginTop={10}
                height={40}
                appearance="primary"
                disabled
            >
                Request Withdrawal
            </Button>
        </Pane>
    </Card>
}