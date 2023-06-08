import { SW_CharacterData, SW_MoviesData } from "."

export type SW_SpeciesSearchResponse = {
    current_page: number
    data: SW_SpeciesData[]
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


export type SW_SpeciesData = {
    id: number
    name: string
    classification: string
    language: string
    people_count: number
    films_count: number
    homeworld: Id_Name[]
}

export type Id_Name = {
    id: number
    name: string
}

export type SW_SingleSpeciesData = {
    id: string
    name: string
    classification: string
    language: string
    people: SW_CharacterData[]
    homeworld: Id_Name[]
    films: SW_MoviesData[]
}