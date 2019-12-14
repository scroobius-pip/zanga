import Layout from '../components/Layout'
import { Card, Heading, Pane, TextInputField, Button } from 'evergreen-ui'
import { colors } from '../styles'

export default () => {
    return <Layout>
        <Heading marginTop={10} textAlign='center' size={900}>Sign in</Heading>
        <Card marginTop={50} background='tint1' maxWidth={450} elevation={3} margin='auto' padding={25}>
            <Pane marginTop={20}>
                <TextInputField
                    textAlign='left'
                    color={colors.primary}
                    label='Email'
                    height={40}
                    name="Your email"
                    placeholder="Your email"
                />
                <TextInputField
                    textAlign='left'
                    label='Password'
                    color={colors.primary}
                    height={40}
                    type='password'
                    // marginTop={10}
                    name="password"
                    placeholder="Your password"
                />
                <Button marginTop={10} height={40} appearance="primary" marginRight={12} iconAfter='log-in'>
                    Sign in
                </Button>
            </Pane>
        </Card>
    </Layout>
}