import { SW_Specie, SW_Starship, SW_Vehicle } from "."

export type SW_CharacterSearchResponse = {
    current_page: number
    data: SW_CharacterData[]
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

export type SW_CharacterData = {
    id: number
    name: string
    birth_year: string
    eye_color: string
    hair_color: string
    height: string
    mass: number
    skin_color: string
    films_count: number
    species_count: number
    starships_count: number
    vehicles_count: number
    homeworld: SW_Planet
}

export type SW_SingleCharacterData = {
    id: number
    name: string
    birth_year: string
    eye_color: string
    hair_color: string
    height: string
    mass: number
    skin_color: string
    homeworld: SW_Planet
    films: SW_Movie[]
    species: SW_Specie[]
    starships: SW_Starship[]
    vehicles: SW_Vehicle[]
}

export type SW_Character = {
    id: number
    name: string
}