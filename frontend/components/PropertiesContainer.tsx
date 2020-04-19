import { GridViewCard, ListViewCard, CardProps } from './PropertyCard';
import { Pane, toaster, Spinner } from 'evergreen-ui';
import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-grid-system';

import Router from 'next/router'

interface Props {
    properties: CardProps['property'][]
    deletable?: boolean
    onDelete?: (id: string) => Promise<any>
    refId?: string
    view: 'grid' | 'list'
    disableCardButton?: boolean
}


export default ({ properties, view, deletable, onDelete, refId, disableCardButton }: Props) => {

    const [loading, setLoading] = useState(true)
    useEffect(() => {
        setLoading(false)
    })
    const PropertyCard = view === 'grid' ? (props) => <Col
        xs={12}
        sm={6}
        lg={3}
    >

        <GridViewCard {...props} />

    </Col> : ListViewCard

    const Container = view === 'grid' ? GridContainer : Pane
    return loading ? <Spinner /> : <Container>
        {properties.map((property, index) => {
            return <PropertyCard
                key={property.id}
                index={index}
                refId={refId}
                active={false}
                property={property}
                disableButton={disableCardButton}
                onClick={() => Router.push(`/property/${property.id}`)}
                onDelete={deletable && (async () => {
                    await onDelete(property.id)

                })}
            />
        })}
    </Container>

}

const GridContainer = ({ children }) => {
    return <Container fluid>

        <Row
            gutterWidth={40}
        >

            {children}
        </Row>
    </Container>
}