import Layout from '../components/Layout'
import { Card, Heading, Pane, TextInputField, Button, toaster } from 'evergreen-ui'
import { colors } from '../styles'
import { useState, useEffect } from 'react'
import { GraphQLClient } from 'graphql-request'
import { getSdk } from '../generated/graphql'
import login from '../functions/login'
import redirect from '../functions/redirect'
import Router from 'next/router'

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}


export default () => {
    const [formState, setFormState] = useState({
        email: null,
        password: null
    })

    const [valid, setValid] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        console.log(formState)
        setValid(isValid())
    }, [JSON.stringify(formState)])

    const isValid = () => {
        if (!formState.password || !formState.email) {
            return false
        }
        return !!(formState.password.length && validateEmail(formState.email))
    }


    const submit = async () => {
        setLoading(true)
        try {
            const client = new GraphQLClient('https://zanga-api.now.sh/graphql')
            const sdk = getSdk(client)
            const { login: { token, message } } = await sdk.login({
                input: { ...formState }
            })
            if (token) {
                login(token)
                toaster.success('Login Success 😄')
                Router.push('/')

            } else {
                toaster.warning(message)
            }

        } catch (error) {
            toaster.danger('Retry Request Later')
        }

        setLoading(false)
    }


    return <Layout>
        <Heading marginTop={10} textAlign='center' size={900}>Sign in</Heading>
        <Card marginTop={50} background='tint1' maxWidth={450} elevation={3} margin='auto' padding={25}>
            <Pane marginTop={20}>
                <TextInputField
                    onChange={e => setFormState({ ...formState, email: e.target.value })}
                    value={formState.email}
                    textAlign='left'
                    color={colors.primary}
                    label='Email'
                    height={40}
                    name="Your email"
                    type='email'
                    placeholder="Your email"
                />
                <TextInputField
                    onChange={e => setFormState({ ...formState, password: e.target.value })}
                    value={formState.password}
                    textAlign='left'
                    label='Password'
                    color={colors.primary}
                    height={40}
                    type='password'
                    // marginTop={10}
                    name="password"
                    placeholder="Your password"
                />
                <Button
                    isLoading={loading}
                    disabled={!valid}
                    onClick={() => {
                        submit()
                    }} marginTop={10} height={40} appearance="primary" marginRight={12} iconAfter='log-in'>
                    Sign in
                </Button>
            </Pane>
        </Card>
    </Layout>
}