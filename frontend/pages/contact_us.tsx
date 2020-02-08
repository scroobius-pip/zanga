import Layout from '../components/Layout'
import { Card, Heading, Pane, TextInputField, Button, Textarea, Checkbox, toaster } from 'evergreen-ui'
import { colors } from '../styles'
import { useState, useEffect } from 'react'
import { GraphQLClient } from 'graphql-request'
import { getSdk } from '../generated/graphql'
import login from '../functions/login'
import redirect from '../functions/redirect'
import Router from 'next/router'
import ReCAPTCHA from "react-google-recaptcha";

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}


export default () => {
    const [formState, setFormState] = useState({
        email: null,
        notes: null
    })

    const [checked, setChecked] = useState(false)
    const [isVerified, setIsVerified] = useState(false)

    const [valid, setValid] = useState(false)
    const [loading, setLoading] = useState(false)

    const RECAPTCHA_SITE_KEY = "6LeJDtYUAAAAAP9C4ZDSts7fOZpgRDNSTxySEFXp"
    const RECAPTCHA_SECRET_KEY = "6LeJDtYUAAAAAK5GlLWuxNyO2mG44VbMqZq-Oyfb"

    useEffect(() => {
        console.log(formState)
        setValid(isValid())
    }, [JSON.stringify(formState)])

    const isValid = () => {
        if (!formState.notes || !formState.email) {
            return false
        }
        return !!(formState.notes.length && validateEmail(formState.email))
    }


    const submit = async () => {
        setLoading(true)
        // try {
        //     const client = new GraphQLClient('https://zanga-api.now.sh/graphql')
        //     const sdk = getSdk(client)
        //     const { login: { token, message } } = await sdk.login({
        //         input: { ...formState }
        //     })
        //     if (token) {
        //         login(token)
        //         toaster.success('Login Success 😄')
        //         Router.push('/')

        //     } else {
        //         toaster.warning(message)
        //     }

        // } catch (error) {
        //     toaster.danger('Retry Request Later')
        // }

        setLoading(false)
    }

    const toggleChange = () => {
        setChecked(
          !checked,
        );
      }

    const enableButton = () => {
        if (!checked && !formState.notes || !formState.email) {
            return false
        }
        return !!(formState.notes.length && validateEmail(formState.email))
    }

    const recaptchaResponse = (value) =>{
        if(value){
            setIsVerified(!isVerified)                
        }
      }

    const  submitToVerify = () =>{
        if(!isVerified){
            submit()
        }else{
            alert("Please verify that you're a human")
        }
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
                <Textarea
                    onChange={e => setFormState({ ...formState, notes: e.target.value })}
                    value={formState.notes}
                    textAlign='left'
                    label='Notes'
                    color={colors.primary}
                    height={120}
                    type='text'
                    // marginTop={10}
                    name="notes"
                    placeholder="Provide Entra Notes"
                />
                <Checkbox
                    //isLoading={loading}
                    //disabled={enabButton}
                    checked={formState.checked}
                    onChange={toggleChange}
                    marginTop={10} height={40}  marginRight={12}>
                    Consent
                </Checkbox>
                <Button
                    isLoading={loading}
                    disabled={enableButton()}
                    onClick={() => {
                        submitToVerify()
                    }} marginTop={10} height={40} appearance="primary" marginRight={12} iconAfter='log-in'>
                    Sign in
                </Button>
            </Pane>
            <ReCAPTCHA
                sitekey= {RECAPTCHA_SITE_KEY}
                onChange={recaptchaResponse}
            />
        </Card>
    </Layout>
}