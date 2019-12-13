export interface User {
    id: string
    email: string | null
    phone: string
    name: string
}

export interface Property {
    id: string
    title: string
    images: string[]
    description: string
}
export interface Location {
    city: string
    state: string
}

enum UserType {
    Agency,
    Individual
}


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