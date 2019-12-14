import PropertyCard, { Property } from './PropertyCard';
import { Pane, toaster } from 'evergreen-ui';
import { useState } from 'react';
import Router from 'next/router'

interface Props {
    properties: Property[]
    deletable?: boolean
}


export default ({ properties, deletable }: Props) => {

    const [selected, setSelected] = useState()

    return <Pane>
        {properties.map((property, index) => {
            return <PropertyCard
                active={index === selected}
                property={property}
                onClick={() => Router.push(`/property/${property.id}`)}
                onDelete={deletable && (() => {
                    toaster.success('Property Deleted', {
                        id: property.id
                    })
                })}
            />
        })}
    </Pane>

}