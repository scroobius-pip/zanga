import { Card, Pane, Button, Text, Paragraph, Heading } from 'evergreen-ui'
import { colors } from '../styles'

export interface Props {
    totalPoints: number
    rate: string
    totalNaira: number
}

export default (props: Props) => {
    return <Card
        elevation={1}
        padding={20}
        marginTop={20}
        display='flex'
        justifyContent='center'
        textAlign='center'
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
            <Text fontWeight='600'>
                Current Rate - ₦{props.rate}/Token
            </Text>
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
                    ₦{props.totalNaira}
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