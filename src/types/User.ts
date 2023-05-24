export interface User {
    id: number
    email: string
    password: string
    role: "customer" | "admin"
    name: string
    avatar: string
}