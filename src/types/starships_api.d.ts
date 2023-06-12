import { SW_Character, SW_MoviesData } from "."

export type SW_StarshipsSearchResponse = {
    current_page: number
    data: SW_StarshipsData[]
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

export type SW_StarshipsData = {
    id: number
    name: string
    model: string
    manufacturer: string
    pilots_count: number
    films_count: number
    consumables: string
}

export type SW_SingleStarshipsData = {
    id: number
    name: string
    model: string
    crew: string
    passengers: string
    manufacturer: string
    max_atmosphering_speed: string
    consumables: string
    pilots: SW_Character[]
    films: SW_MoviesData[]
}
export type SW_Starship = {
    id: number
    name: string
}