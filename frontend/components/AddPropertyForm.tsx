import { Heading, Pane, TextInputField, SelectMenu, Button, Select, Textarea, FilePicker, toaster, TagInput } from 'evergreen-ui'
import { colors } from '../styles'
import { useState, useEffect } from 'react'
import states from './states'
// import AWS from 'aws-sdk'
// const Upload = require('s3-uploader')
export interface AddPropertyFormState {
    title: string
    location: {
        city: string
        state: string
    }
    costValue: number
    costType: 'Rent' | 'Sale'
    images: string[]
    // imageFiles:string[]
    description: string
}

interface Props {
    submit: (fields: AddPropertyFormState) => Promise<Boolean>
}

export default ({ submit }: Props) => {
    const [formState, setFormState] = useState<AddPropertyFormState>({
        costType: 'Sale',
        costValue: 0,
        description: '',
        images: [''],
        location: {
            city: '',
            state: ''
        },
        title: ''
    })

    const [valid, setValid] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        console.log(formState)
        setValid(isValid())
    }, [JSON.stringify(formState)])

    const isValid = () => {
        const { costType, costValue, description, images, location: { city, state }, title } = formState

        return !!(costType.length && description.length && images.length && city.length && state.length && title.length)

    }



    const onSubmit = async () => {
        setLoading(true)

        console.log(formState)
        const result = await submit(formState)

        if (result) {
            toaster.notify('Created Property')
            document.location.reload()
        } else {
            toaster.danger('Retry Request Later')
        }
        setLoading(false)
    }

    return <>
        <Pane>
            <Heading size={700}>Add Property</Heading>
        </Pane>
        <Pane marginTop={30}>
            <TextInputField
                required
                textAlign='left'
                label='Title'
                color={colors.primary}
                height={40}
                value={formState.title}
                onChange={e => setFormState({ ...formState, title: e.target.value })}
                // marginTop={10}
                name="property-title"
                placeholder="Title"
            />
            <Pane>
                <Heading marginBottom={10} size={600}>Location</Heading>
                <Pane display='flex' alignItems='center'>
                    <TextInputField
                        required
                        textAlign='left'
                        label='City'
                        color={colors.primary}
                        value={formState.location.city}
                        onChange={e => setFormState({
                            ...formState, location: {
                                ...formState.location,
                                city: e.target.value
                            }
                        })}
                        name="property-city"
                        placeholder="City"
                    />
                    <SelectMenu
                        title="Select name"
                        options={

                            states.map(label => ({ label, value: label }))
                        }
                        selected={formState.location.state}
                        onSelect={item => setFormState({
                            ...formState, location: {
                                ...formState.location,
                                state: item.value.toString()
                            }
                        })}
                    >
                        <Button>{formState.location.state || 'Select State...'}</Button>
                    </SelectMenu>
                </Pane>
            </Pane>
            <Pane>
                <Heading marginBottom={10} alignItems='center' size={600}>Price</Heading>
                <Pane display='flex' alignItems='center' >
                    <TextInputField
                        value={formState.costValue}
                        onChange={e => setFormState({ ...formState, costValue: parseInt(e.target.value) })}
                        required
                        paddingRight={10}
                        flex={3}
                        textAlign='left'
                        label='Cost Amount in Naira'
                        color={colors.primary}
                        name="property-cost"
                        placeholder="Cost Amount - Naira"
                        type='number'
                    />

                    <Select value={formState.costType} flex={1} onChange={event => setFormState({ ...formState, costType: (event.target.value as 'Rent' | 'Sale') })} >
                        <option value="Sale" selected>Sale</option>
                        <option value="Rent">Rent</option>
                    </Select>


                </Pane>
            </Pane>
            <Pane>
                <Heading marginBottom={10} alignItems='center' size={600}>Description</Heading>
                <Textarea
                    value={formState.description}
                    onChange={e => setFormState({ ...formState, description: e.target.value })}
                    required
                    name="Description"
                    placeholder="Description"
                />
            </Pane>
            <Pane>
                <Heading marginBottom={10} alignItems='center' size={600}>Images</Heading>
                <TagInput
                    width='100%'
                    inputProps={{ placeholder: 'Add Image Urls' }}
                    values={formState.images}
                    onChange={values => {
                        setFormState({ ...formState, images: values.filter(v => !!v.length) })
                    }}
                />

            </Pane>
            <Button float='right' isLoading={loading} onClick={onSubmit} disabled={!valid} iconAfter='add' marginTop={10} height={40} appearance="primary" marginRight={12} >
                Create Property
                </Button>
        </Pane>

    </>
}