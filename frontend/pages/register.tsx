import Layout from '../components/Layout'
import { Pane, Card, Heading, TextInput, Button, TextInputField } from 'evergreen-ui'
import { colors } from '../styles'
import TabsContainer, { TabContainerProps } from '../components/TabsContainer'

const tabs: TabContainerProps['tabs'] = [
    {
        body: <AgentForm />,
        title: 'Agency'
    }, {
        body: <MarketerForm />,
        title: 'Marketer'
    }

]

export default () => {
    return <Layout>
        <Heading marginBotton={50} textAlign='center' size={900}>Register</Heading>
        <Card marginTop={50} background='tint1' maxWidth={400} elevation={3} margin='auto' padding={25}>
            <TabsContainer tabs={tabs} />
        </Card>
    </Layout>
}

function AgentForm() {
    return <>

        <Pane marginTop={10}>

            <TextInputField
                required
                textAlign='left'
                label='Full Name'
                color={colors.primary}
                height={40}
                // marginTop={10}
                name="name"
                placeholder="Your full name"
            />
            <TextInputField
                required
                textAlign='left'
                color={colors.primary}
                label='Password'
                type='password'
                height={40}
                name="password"
                placeholder="Enter a password"
            />
            <TextInputField
                required
                textAlign='left'
                color={colors.primary}
                label='Phone Number'
                height={40}
                name="phone"
                placeholder="Your Phone Number"
            />
            <TextInputField
                required
                textAlign='left'
                color={colors.primary}
                label='Company Tax Identification Number (TIN)'
                height={40}
                name="tin"
                placeholder=""
            />

            <Button marginTop={10} height={40} appearance="primary" marginRight={12} >
                Register Agency
                </Button>
        </Pane>
    </>
}

function MarketerForm() {
    return <>
        <Pane marginTop={10} >
            <TextInputField
                textAlign='left'
                label='Full Name'
                color={colors.primary}
                height={40}
                // marginTop={10}
                name="name"
                placeholder="Your full name"
            />
            <TextInputField
                textAlign='left'
                color={colors.primary}
                label='Password'
                height={40}
                name="password"
                placeholder="Enter a password"
            />
            <TextInputField
                textAlign='left'
                color={colors.primary}
                label='Phone Number'
                height={40}
                name="phone"
                placeholder="Your Phone Number"
            />


            <Button marginTop={10} height={40} appearance="primary" marginRight={12} >
                Register Marketer
                </Button>
        </Pane>
    </>
}