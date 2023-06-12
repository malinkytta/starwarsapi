import { SW_CharacterData, SW_MoviesData, SW_Planet } from "."

export type SW_SpeciesSearchResponse = {
    current_page: number
    data: SW_SpeciesData[]
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

export type SW_SpeciesData = {
    id: number
    name: string
    classification: string
    language: string
    people_count: number
    films_count: number
    homeworld: SW_Planet | null
}

export type SW_SingleSpeciesData = {
    id: string
    name: string
    classification: string
    average_height: string
    language: string
    people: SW_CharacterData[]
    homeworld: SW_Planet
    films: SW_MoviesData[]
}

export type SW_Specie = {
    id: number
    name: string
}