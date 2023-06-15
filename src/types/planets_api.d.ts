import { SW_CharacterData, SW_MoviesData } from "."

export type SW_PlanetsSearchResponse = {
    current_page: number
    data: SW_PlanetsData[]
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

export type SW_PlanetsData = {
    id: number
    name: string
    climate: string
    terrain: string
    population: string
    residents_count: number
    films_count: number
}

export type SW_SinglePlanetData = {
    id: number
    name: string
    climate: string
    terrain: string
    population: string
    rotation_period: string
    surface_water: string
    residents: SW_CharacterData[]
    films: SW_MoviesData[]
}

export type SW_Planet = {
    id: number
    name: string
}