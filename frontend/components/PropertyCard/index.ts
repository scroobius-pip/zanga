export { default as ListViewCard } from './ListViewCard'
export { default as GridViewCard } from './GridViewCard'

export interface Property {
    id: string
    imageUrl: string
    title: string
    location: string
    price: string
    description: string
    featured?: boolean
}



export interface CardProps {
    active: boolean
    property: Property
    onClick: () => any
    onDelete?: () => any
    disableButton?: boolean
    refId?: string
    index?: number
}

