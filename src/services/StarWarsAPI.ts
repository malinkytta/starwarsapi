/**
 * Star Wars API Service
 */

import axios from 'axios'
import {
    SW_SingleMovieData,
    SW_MovieSearchResponse,
    SW_CharacterSearchResponse,
    SW_SingleCharacterData,
    SW_PlanetsSearchResponse,
    SW_SinglePlanetData,
    SW_SpeciesSearchResponse,
    SW_SingleSpeciesData,
    SW_StarshipsResponse,
    SW_SingleStarshipsData,
    SW_VehiclesSearchResponse,
    SW_SingleVehicleData

} from '../types/index'

const BASE_URL = 'https://swapi.thehiveresistance.com/api'

const get = async<T>(endpoint: string) => {
    const res = await axios.get(BASE_URL + endpoint)
    return res.data as T
}


/**
 * 
 * @param page Films
 * @returns 
 */
export const getMovies = async (page: number) => {
    return get<SW_MovieSearchResponse>(`/films?page=${page}`)
}
export const getMovie = async (movieId: number) => {
    return get<SW_SingleMovieData>(`/films/${movieId}`)
}

export const searchMovies = async (query: string, page: number) => {
    return get<SW_MovieSearchResponse>(`/films/?search=${query}&page=${page}`)
}


/**
 * 
 * @param page People
 * @returns 
 */

export const getCharacters = async (page: number) => {
    return get<SW_CharacterSearchResponse>(`/people?page=${page}`)
}

export const getCharacter = async (characterId: number) => {
    return get<SW_SingleCharacterData>(`/people/${characterId}`)
}

export const searchCharacters = async (query: string, page: number) => {
    return get<SW_CharacterSearchResponse>(`/people/?search=${query}&page=${page}`)
}

/**
 * 
 * @param page Planets
 * @returns 
 */

export const getPlanets = async (page: number) => {
    return get<SW_PlanetsSearchResponse>(`/planets?page=${page}`)
}

export const getPlanet = async (planetId: number) => {
    return get<SW_SinglePlanetData>(`/planets/${planetId}`)
}

export const searchPlanets = async (query: string, page: number) => {
    return get<SW_PlanetsSearchResponse>(`/planets/?search=${query}&page=${page}`)
}


/**
 * 
 * @param page Species
 * @returns 
 */

export const getSpecies = async (page: number) => {
    return get<SW_SpeciesSearchResponse>(`/species?page=${page}`)
}

export const getSpecie = async (specieId: number) => {
    return get<SW_SingleSpeciesData>(`/species/${specieId}`)
}

export const searchSpecies = async (query: string, page: number) => {
    return get<SW_SpeciesSearchResponse>(`/species/?search=${query}&page=${page}`)
}

/**
 * 
 * @param page Starships
 * @returns 
 */

export const getStarships = async (page: number) => {
    return get<SW_StarshipsResponse>(`/starships?page=${page}`)
}

export const getStarship = async (starshipId: number) => {
    return get<SW_SingleStarshipsData>(`/starships/${starshipId}`)
}

export const searchStarship = async (query: string, page: number) => {
    return get<SW_StarshipsResponse>(`/starships/?search=${query}&page=${page}`)
}


/**
 * 
 * @param page Vehicles
 * @returns 
 */

export const getVehicles = async (page: number) => {
    return get<SW_VehiclesSearchResponse>(`/vehicles?page=${page}`)
}

export const getVehicle = async (vehicleId: number) => {
    return get<SW_SingleVehicleData>(`/vehicles/${vehicleId}`)
}

export const searchVehicles = async (query: string, page: number) => {
    return get<SW_VehiclesSearchResponse>(`/vehicles/?search=${query}&page=${page}`)
}

