import { TableHead, Table, Card } from 'evergreen-ui'
import { Property } from '../generated/graphql'
import Router from 'next/router'


interface PropertyPoint {
    property: {
        id: string
        title: string
    }
    points: number
    profit: number
}

export interface Props {
    propertyPoints: PropertyPoint[]
}

export default (props: Props) => {
    return <Card
        elevation={2}
        hoverElevation={3}
        marginTop={10}
        padding={20}

    >
        <Table
            border="default"

        >
            <TableHead>
                <Table.TextHeaderCell>
                    Property
            </Table.TextHeaderCell>
                <Table.TextHeaderCell>
                    Points
            </Table.TextHeaderCell>
                <Table.TextHeaderCell>
                    Profit
            </Table.TextHeaderCell>
            </TableHead>
            <Table.Body>
                {
                    props.propertyPoints.map(propertyPoint => {
                        return <Table.Row
                            isSelectable
                            onSelect={() => {
                                Router.push(`/property/${propertyPoint.property.id}`)
                            }}
                        >
                            <Table.TextCell>
                                {propertyPoint.property.title}
                            </Table.TextCell>
                            <Table.TextCell>{
                                propertyPoint.points
                            }</Table.TextCell>
                            <Table.TextCell>{
                                propertyPoint.profit
                            }</Table.TextCell>

                        </Table.Row>
                    })
                }
            </Table.Body>
        </Table>
    </Card>
}