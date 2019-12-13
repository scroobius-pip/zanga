export interface User {
    id: string
    email: string | null
    phone: string
    name: string
    type: UserType
}



export interface Property {
    id: string
    title: string
    city: string
    state: string
    costValue: number
    ownerId: string
    ownerName: string
    images: string[]
    description: string
}



export interface Location {
    city: string
    state: string
}

type UserType = "Agency" | "Individual"

export interface Cost {
    value: number
}
export interface CostInput {
    value: number
}


export interface RegisterResult {
    token: string | null
    message: string
}
export interface LoginResult {
    token: string | null
    message: string
}