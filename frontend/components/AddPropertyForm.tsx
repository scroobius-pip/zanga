import { Heading, Pane, TextInputField, SelectMenu, Button, Select, Textarea, FilePicker } from 'evergreen-ui'
import { colors } from '../styles'
import { useState } from 'react'
import states from './states'

interface FormState {
    title: string
    location: {
        city: string
        state: string
    }
    costValue: number
    costType: 'Rent' | 'Sale'
    images: string[]
    description: string
}

export default () => {
    const [formState, setFormState] = useState<FormState>({
        costType: 'Sale',
        costValue: 0,
        description: '',
        images: [],
        location: {
            city: '',
            state: ''
        },
        title: ''
    })


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

                        // marginTop={10}
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

                    <Select flex={1} onChange={event => alert(event.target.value)} >
                        <option value="Sale" selected>Sale</option>
                        <option value="Rent">Rent</option>
                    </Select>


                </Pane>
            </Pane>
            <Pane>
                <Heading marginBottom={10} alignItems='center' size={600}>Description</Heading>
                <Textarea
                    required
                    name="Description"
                    placeholder="Description"
                />
            </Pane>
            <Pane>
                <Heading marginBottom={10} alignItems='center' size={600}>Images</Heading>
                <FilePicker
                    accept="image/*"
                    multiple
                    width={250}
                    marginBottom={32}
                    onChange={files => console.log(files)}
                    placeholder="Select the images here!"
                />
            </Pane>
            <Button float='right' isLoading iconAfter='add' marginTop={10} height={40} appearance="primary" marginRight={12} >
                Create Property
                </Button>
        </Pane>

    </>
}