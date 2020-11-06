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
    avatar: string
    birthday?: Moment
    sex: "MALE" | "FEMALE" | "NONE"
    messages: Message[]
    createdAt: Moment
    updatedAt: Moment
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
    createdAt: Moment
    updatedAt: Moment
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
