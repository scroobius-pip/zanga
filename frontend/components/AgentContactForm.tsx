import { TextInputField, Button, toaster, Textarea, Pane, Label } from 'evergreen-ui'
import { colors } from '../styles'
import { useState } from 'react'
import { GraphQLClient } from 'graphql-request'
import { getSdk } from '../generated/graphql'



export default ({ referrer = '', propertyId = '' }) => {
    const [formState, setFormState] = useState({
        name: '',
        number: '',
        email: '',
        notes: ''
    })

    const [loading, setLoading] = useState(false)

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

    return <>

        <TextInputField
            value={formState.number}
            onChange={(e) => setFormState({ ...formState, number: e.target.value })}
            textAlign='left'
            color={colors.primary}
            label='*Phone Number'
            required
            type='number'
            height={40}
            name="Your phone number"
            placeholder="Your Phone Number"
        />
        <TextInputField
            required
            value={formState.name}
            onChange={(e) => setFormState({ ...formState, name: e.target.value })}
            textAlign='left'
            label='*Full Name'
            color={colors.primary}
            height={40}
            // marginTop={10}
            name="Your full name"
            placeholder="Your full name"
        />
        <TextInputField
            type="email"
            value={formState.email}
            onChange={(e) => setFormState({ ...formState, email: e.target.value })}
            textAlign='left'
            label='Email'
            color={colors.primary}
            height={40}
            // marginTop={10}
            name="Your email"
            placeholder="Your email"
        />
        <Pane>
            <Label textAlign="left" htmlFor="notes" marginBottom={4} display="block">
                Notes
            </Label>
            <Textarea
                id="notes"
                value={formState.notes}
                onChange={(e) => setFormState({ ...formState, notes: e.target.value })}
                textAlign='left'
                label='Extra Notes (Optional)'
                color={colors.primary}
                // height={40}
                // marginTop={10}
                name="Extra Notes"
                placeholder="Extra notes"
            />
        </Pane>
        <Button
            isLoading={loading}
            disabled={!(formState.name && formState.number)}
            onClick={submit}
            marginTop={10}
            height={40}
            appearance="primary"
            marginRight={12}
            iconAfter='envelope'>
            Send Request
</Button>
    </>
}