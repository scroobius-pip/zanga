import Layout from '../components/Layout'
import { Card, Heading, Pane, TextInputField, Button, toaster, Textarea, Checkbox, Paragraph } from 'evergreen-ui'
import { colors } from '../styles'
import { useState, useEffect } from 'react'
// import { GraphQLClient } from 'graphql-request'
import { getSdk, User } from '../generated/graphql'
import login from '../functions/login'
import redirect from '../functions/redirect'
import Router from 'next/router'
import ReCAPTCHA from 'react-google-recaptcha'
import { useForm } from 'react-hook-form';
import SocialIcons from '../components/SocialIcons'
import getToken from '../functions/getToken'
import { GraphQLClient } from 'graphql-request'
import logout from '../functions/logout'


const RECAPTCHA_SITE_KEY = "6LfvXtkUAAAAAAtuGmUkrNzRXxJWil7unLGLqUiK"

interface InitialProps {
    user?: Pick<User, 'id' | 'name'>
}

const Page = ({ user }: InitialProps) => {

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



    return <Layout userName={user?.name} fullWidth>
        <Heading marginBottom={10} textAlign='center' size={900}>Contact us</Heading>
        <Paragraph textAlign='center' size={500} marginBottom={10}>Please fill the form, we usually get back within 2 business days</Paragraph>
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
                    flexDirection='column'
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
                        marginTop={10}
                    >Submit</Button>
                </Pane>
            </form>


        </Card>
        {/* <div style={{ width: '100%', marginTop: 50 }}>
            <SocialIcons />
        </div> */}
    </Layout>
}

Page.getInitialProps = async ({ query, ...ctx }): Promise<InitialProps> => {
    const token = getToken(ctx)
    const client = new GraphQLClient('https://zanga-api.now.sh/graphql', {
        headers: token.length ? {
            authorization: 'Bearer ' + token
        } : null
    })
    const sdk = getSdk(client)

    return {
        user: !!token.length ? await (async () => {
            try {

                return (await sdk.me()).me
            } catch (err) {
                logout()
                return null
            }

        })() : null
    }


}

export default Page
