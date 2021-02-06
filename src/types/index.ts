import moment, { Moment } from "moment";
import { v4 as uuid } from 'uuid';


export interface AppState {
    lastSession: Moment
    location: Location
    communities: Community[]
    messages: Message[]
}

export interface User {
    id: string
    name: string
    description: string
    email: string
    avatar: Image
    birthday?: Moment
    sex: "MALE" | "FEMALE" | "NONE"
    messages: Message[]
    items: Item[]
    createdAt: Moment
    updatedAt: Moment
}

export const newUser = () => {
    return {
        id: "",
        name: "",
        description: "",
        email: "",
        avatar: { id: "", uri: "", size: 0 },
        birthday: undefined,
        sex: "NONE",
        messages: [],
        items: [],
        createdAt: moment(),
        updatedAt: moment()
    } as User
}

export interface Location {
    latitude: number
    longitude: number
}

export interface Message {
    id: string
    user: OmittedUser   // id, name, avatarのみ
    images: Image[]
    content: string
    createdAt: Moment
    updatedAt: Moment
}

export interface OmittedUser {
    id: string
    name: string
    avatar: string
}

export interface Image {
    id: string
    uri: string
    size: number
}

export interface Community {
    id: string
    name: string
    description: string
    avatar: string
    location: CommunityLocation
    users: OmittedUser[]
    status: CommunityStatus
    createdAt: Moment
    updatedAt: Moment
    closedAt: Moment | undefined
}

export type CommunityStatus = "Attending" | "Available" | "None"

export interface CommunityLocation {
    latitude: number
    longitude: number
    radius: number
}

export interface Item {
    id: string
    updatedAt: Moment
    createdAt: Moment
}

export const newItem = () => {
    return {
        id: moment().toISOString() + uuid(),
        createdAt: moment(),
        updatedAt: moment(),
    } as Item
}