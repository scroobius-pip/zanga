import PropertyCard, { Property } from './PropertyCard';
import { Pane, toaster } from 'evergreen-ui';
import { useState } from 'react';
import Router from 'next/router'

interface Props {
    properties: Property[]
    deletable?: boolean
    onDelete?: (id: string) => Promise<any>
    refId?: string
}


export default ({ properties, deletable, onDelete, refId }: Props) => {

    const [selected, setSelected] = useState()

    return <Pane>
        {properties.map((property, index) => {
            return <PropertyCard
                refId={refId}
                active={index === selected}
                property={property}
                onClick={() => Router.push(`/property/${property.id}`)}
                onDelete={deletable && (async () => {
                    await onDelete(property.id)

                })}
            />
        })}
    </Pane>

}