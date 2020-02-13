import { TextInputField, Textarea, Button, toaster } from 'evergreen-ui'
import { colors } from '../styles'
import { useState, useEffect } from 'react'
import { GraphQLClient } from 'graphql-request'
import { getSdk } from '../generated/graphql'
import ReCAPTCHA from 'react-google-recaptcha'


function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export default ({ referrer = '', propertyId = '' }) => {
    const [formState, setFormState] = useState({
        name: '',
        number: '',
        email: '',
        notes: ''
    })

    const [loading, setLoading] = useState(false)
    const [isVerified, setIsVerified] = useState(false)
    const [valid, setValid] = useState(false)
    
    let RECAPTCHA_SITE_KEY = "6LeJDtYUAAAAAP9C4ZDSts7fOZpgRDNSTxySEFXp"

    useEffect(() => {
        console.log(formState)
        setValid(isValid())
    }, [JSON.stringify(formState)])

    const isValid = () => {
        return !!(validateEmail(formState.email))
    }


    const submit = async () => {
        setLoading(true)
        try {
            const client = new GraphQLClient('https://zanga-api.now.sh/graphql')
            const sdk = getSdk(client)
            const { contactAgent: result } = await sdk.contactAgent({
                input: {
                    name: formState.name,
                    number: formState.number,
                    email: formState.email,
                    notes: formState.notes,
                    propertyId,
                    referrerId: referrer
                }
            })
            if (result)
                toaster.notify('Request Successfully Sent!')


        } catch (error) {
            toaster.danger('Retry Request Later')
        }

        setLoading(false)
    }

    const agentRecaptchaResponse = (value) =>{
        if(value){
            setIsVerified(!isVerified)                
        }
    }

    const  submitToVerify = () =>{
        if(isVerified){
            submit()
        }else{
            alert("Please verify that you're a human")
        }
    }

    return <>

        <TextInputField
            value={formState.number}
            onChange={(e) => setFormState({ ...formState, number: e.target.value })}
            textAlign='left'
            color={colors.primary}
            label='Phone Number'
            type='number'
            height={40}
            name="Your phone number"
            placeholder="Your Phone Number"
        />
        <TextInputField

            value={formState.name}
            onChange={(e) => setFormState({ ...formState, name: e.target.value })}
            textAlign='left'
            label='Full Name'
            color={colors.primary}
            height={40}
            // marginTop={10}
            name="Your full name"
            placeholder="Your full name"
        />
        <TextInputField
            onChange={e => setFormState({ ...formState, email: e.target.value })}
            value={formState.email}
            textAlign='left'
            color={colors.primary}
            label='Email (Optional)'
            height={40}
            name="Your email"
            type='email'
            placeholder="Your email"
        />
        <Textarea
            onChange={e => setFormState({ ...formState, notes: e.target.value })}
            value={formState.notes}
            textAlign='left'
            color={colors.primary}
            label='Notes (Optional)'
            height={120}
            type='text'
            marginTop={10}
            name="notes"
            placeholder="Optional Notes"
        />
        <Button
            isLoading={loading}
            disabled={!(formState.name && formState.number)}
            onClick={() => submitToVerify()}
            marginTop={10}
            marginBottom={10}
            height={40}
            appearance="primary"
            marginRight={12}
            iconAfter='envelope'>
            Send Request
        </Button>

        <ReCAPTCHA
                sitekey= {RECAPTCHA_SITE_KEY}
                onChange={agentRecaptchaResponse}
                marginTop={10}
        />
    </>
}