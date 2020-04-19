import Layout from '../components/Layout'
import { Card, Heading, Pane, TextInputField, Button, toaster, Textarea, Checkbox } from 'evergreen-ui'
import { colors } from '../styles'
import { useState, useEffect } from 'react'
// import { GraphQLClient } from 'graphql-request'
import { getSdk } from '../generated/graphql'
import login from '../functions/login'
import redirect from '../functions/redirect'
import Router from 'next/router'
import ReCAPTCHA from 'react-google-recaptcha'
import { useForm } from 'react-hook-form';
import SocialIcons from '../components/SocialIcons'


const RECAPTCHA_SITE_KEY = "6LfvXtkUAAAAAAtuGmUkrNzRXxJWil7unLGLqUiK"

export default () => {

    const { register, handleSubmit, errors } = useForm()
    const [notBot, setNotBot] = useState(false)


    const onSubmit = async (data) => {
        console.log(data)
        // setLoading(true)
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

        // setLoading(false)
    }



    return <Layout fullWidth>
        <Heading marginBottom={10} textAlign='center' size={900}>Contact Us</Heading>

        <Card marginTop={50} background='tint1' maxWidth={450} elevation={3} margin='auto' padding={25}>

            <form onSubmit={handleSubmit(onSubmit)}>
                <TextInputField
                    // type="text"
                    placeholder="Name"
                    label='Name'
                    name="Name"
                    innerRef={register({ required: true, maxLength: 80 })} />
                <TextInputField

                    label='Email'
                    name="Email"
                    innerRef={register({ required: true, pattern: /^\S+@\S+$/i })} />

                <TextInputField
                    type='tel'
                    label='Phone Number'
                    name="Phone Numberl"
                    innerRef={register({ required: true })}
                />
                <Textarea
                    name='Message'
                    innerRef={register}
                    placeholder={'Message'}

                />


                <Pane display='flex'
                    alignItems='center'
                    justifyContent='space-between'
                    marginTop={20}
                >

                    <ReCAPTCHA

                        sitekey={RECAPTCHA_SITE_KEY}
                        onChange={() => setNotBot(true)}
                        marginTop={10}
                    />
                    <Button
                        disabled={!notBot}
                        appearance='primary'
                        type='submit'
                        height={40}
                    >Submit</Button>
                </Pane>
            </form>


        </Card>
        <div style={{ width: '100%', marginTop: 50 }}>
            <SocialIcons />
        </div>
    </Layout>
}