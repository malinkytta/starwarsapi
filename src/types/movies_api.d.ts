// import { SW_Characters } from './characters_api'

export type SW_MovieSearchResponse = {
    current_page: number
    data: SW_MoviesData[]
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

export type SW_MoviesData = {
    id: number
    title: string
    episode_id: string
    opening_crawl: string
    director: string
    producer: string
    release_date: string
    characters_count: number
    planets_count: number
    starships_count: number
    vehicles_count: number
    species_count: number
}

export type SW_SingleMovieData = {
    id: number
    title: string
    episode_id: string
    opening_crawl: string
    director: string
    producer: string
    release_date: string
    characters: SW_Character[]
    planets: SW_Planet[]
    starships: SW_Starship[]
    vehicles: SW_Vehicle[]
    species: SW_Specie[]
}

export type SW_Movie = {
    id: number
    title: string
}