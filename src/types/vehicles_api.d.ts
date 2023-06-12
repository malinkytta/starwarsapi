import { SW_CharacterData, SW_MoviesData } from "."

export type SW_VehiclesSearchResponse = {
    current_page: number
    data: SW_VehichlesData[]
    first_page_url: string
    from: number
    last_page: number
    last_page_url: string
    links: [{
        url: string
        label: string
        active: boolean
    }]
    next_page_url: string | null
    path: string
    per_page: number
    prev_page_url: string | null
    to: number
    total: number
}

export type SW_VehichlesData = {
    id: number
    name: string
    model: string
    vehicle_class: string
    manufacturer: string
    crew: string
    max_atmosphering_speed: string
    consumables: string
    pilots_count: number
    films_count: number
}

export type SW_SingleVehicleData = {
    id: number
    name: string
    model: string
    vehicle_class: string
    manufacturer: string
    length: string
    crew: string
    max_atmosphering_speed: string
    consumables: string
    passengers: string
    pilots: SW_CharacterData[]
    films: SW_MoviesData[]
}

export type SW_Vehicle = {
    id: number
    name: string
}