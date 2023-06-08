import { SW_Character, SW_MoviesData } from "."

export type SW_StarshipsResponse = {
    current_page: number
    data: SW_StarshipsData[]
    first_page_url: string
    from: number
    last_page: number
    last_page_url: string
    links: []
    next_page_url: string | null
    path: string
    per_page: number
    prev_page_url: number | null
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
    manufacturer: string
    consumables: string
    pilots: SW_CharacterData[]
    films: SW_MoviesData[]
}