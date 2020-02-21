import Layout from '../components/Layout'
import { Pane, Card, Heading, TextInput, Button, TextInputField, toaster, Text, Paragraph } from 'evergreen-ui'
import { colors } from '../styles'
import TabsContainer, { TabContainerProps } from '../components/TabsContainer'
import { useState, useEffect } from 'react'
import { GraphQLClient } from 'graphql-request'
import { getSdk, UserType } from '../generated/graphql'
import login from '../functions/login'
import Router from 'next/router'

const tabs: TabContainerProps['tabs'] = [
    {
        body: <MarketerForm />,
        title: 'Marketer'
    },
    {
        body: <Pane marginTop={20} display='flex' justifyCotent='center'>
            <Heading>Coming Soon</Heading>
        </Pane>,
        title: 'Agency'
    },

]

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}


export default () => {
    return <Layout>
        <Pane justifyContent='center' marginBottom={20}>
            <Heading marginBotton={50} textAlign='center' size={900}>Register</Heading>
            <Paragraph textAlign='center' size={500}>Register To Start Sharing Links!</Paragraph>
        </Pane>
        <Card marginTop={50} background='tint1' maxWidth={400} elevation={3} margin='auto' padding={25}>
            <TabsContainer tabs={tabs} />
        </Card>
    </Layout>
}

function AgentForm() {
    const [formState, setFormState] = useState({
        email: '',
        password: '',
        name: '',
        phone: '',
        cac: 'sample-cac',
        tin: '',
        type: 'Agency'
    })

    const [valid, setValid] = useState(false)
    const [loading, setLoading] = useState(false)

    const submit = async () => {
        setLoading(true)
        try {
            const client = new GraphQLClient('https://zanga-api.now.sh/graphql')
            const sdk = getSdk(client)
            const { register: { token, message } } = await sdk.register({
                input: { ...formState, type: UserType[formState.type] }
            })
            if (token) {
                login(token)
                toaster.success('Register Success 😄')
                Router.push('/')

            } else {
                toaster.warning(message)
            }

        } catch (error) {
            toaster.danger('Retry Request Later')
        }

        setLoading(false)
    }


    useEffect(() => {
        console.log(formState)
        setValid(isValid())
    }, [JSON.stringify(formState)])

    const isValid = () => {
        if (!formState.password || !formState.email) {
            return false
        }
        return !!(formState.password.length && validateEmail(formState.email) && formState.phone && formState.tin.length)
    }
    return <>

        <Pane marginTop={10}>

            <TextInputField
                required
                textAlign='left'
                label='Company Name'
                color={colors.primary}
                height={40}
                value={formState.name}
                onChange={e => setFormState({ ...formState, name: e.target.value })}
                // marginTop={10}
                name="name"
                placeholder="Company Name"
            />
            <TextInputField
                onChange={e => setFormState({ ...formState, password: e.target.value })}
                value={formState.password}
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
                value={formState.email}
                onChange={e => setFormState({ ...formState, email: e.target.value })}
                textAlign='left'
                color={colors.primary}
                label='Company Email'
                height={40}
                name="Company email"
                type='email'
                placeholder="Your email"
            />
            <TextInputField
                value={formState.phone}
                onChange={e => setFormState({ ...formState, phone: (e.target.value) })}
                required
                textAlign='left'
                color={colors.primary}
                label='Phone Number'
                height={40}
                name="phone"
                placeholder="Your Phone Number"
            />
            <TextInputField
                value={formState.tin}
                onChange={e => setFormState({ ...formState, tin: (e.target.value) })}
                required
                textAlign='left'
                color={colors.primary}
                label='Company Tax Identification Number (TIN)'
                height={40}
                name="tin"
                placeholder=""
            />

            <Button
                isLoading={loading}
                disabled={!valid}
                onClick={() => {
                    submit()
                }} marginTop={10} height={40} appearance="primary" marginRight={12} iconAfter='log-in'>
                Register Agency
                </Button>
        </Pane>
    </>
}

function MarketerForm() {
    const [formState, setFormState] = useState({
        email: '',
        password: '',
        name: '',
        phone: '',
        type: 'Individual'
    })

    const [valid, setValid] = useState(false)
    const [loading, setLoading] = useState(false)

    const submit = async () => {
        setLoading(true)
        try {
            const client = new GraphQLClient('https://zanga-api.now.sh/graphql')
            const sdk = getSdk(client)
            const { register: { token, message } } = await sdk.register({
                input: { ...formState, type: UserType[formState.type] }
            })
            if (token) {
                login(token)
                toaster.success('Register Success 😄')
                Router.push('/')

            } else {
                toaster.warning(message)
            }

        } catch (error) {
            toaster.danger('Retry Request Later')
        }

        setLoading(false)
    }


    useEffect(() => {
        console.log(formState)
        setValid(isValid())
    }, [JSON.stringify(formState)])

    const isValid = () => {
        if (!formState.password || !formState.email) {
            return false
        }
        return !!(formState.password.length && validateEmail(formState.email) && formState.phone)
    }
    return <>

        <Pane marginTop={10}>

            <TextInputField
                required
                textAlign='left'
                label='Full Name'
                color={colors.primary}
                height={40}
                value={formState.name}
                onChange={e => setFormState({ ...formState, name: e.target.value })}
                // marginTop={10}
                name="name"
                placeholder="Full Name"
            />
            <TextInputField
                onChange={e => setFormState({ ...formState, password: e.target.value })}
                value={formState.password}
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
                value={formState.email}
                onChange={e => setFormState({ ...formState, email: e.target.value })}
                textAlign='left'
                color={colors.primary}
                label='Email'
                height={40}
                name="email"
                type='email'
                placeholder="Your email"
            />
            <TextInputField
                value={formState.phone}
                onChange={e => setFormState({ ...formState, phone: (e.target.value) })}
                required
                textAlign='left'
                color={colors.primary}
                label='Phone Number'
                height={40}
                name="phone"
                placeholder="Your Phone Number"
            />

            <Button
                isLoading={loading}
                disabled={!valid}
                onClick={() => {
                    submit()
                }} marginTop={10} height={40} appearance="primary" marginRight={12} iconAfter='log-in'>
                Register
                </Button>
        </Pane>
    </>
}