
export type SW_CharacterSearchResponse = {
    current_page: number
    data: SW_CharacterData[]
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

export type SW_CharacterData = {
    id: number
    name: string
    birth_year: string
    eye_color: string
    hair_color: string
    height: string
    mass: number
    films_count: number
    species_count: number
    starships_count: number
    vehicles_count: number
    homeworld: Id_Name
}

export type SW_SingleCharacterData = SW_CharacterData & {
    films: Films[]
    species: Id_Name[]
    starships: Id_Name[]
    vehicles: Id_Name[]
}

export type Id_Name = {
    id: number
    name: string
}

export type Films = {
    id: number
    title: string
}

export type SW_Character = {
    id: number
    name: string
}

