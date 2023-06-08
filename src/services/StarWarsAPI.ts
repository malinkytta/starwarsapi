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
    SW_SinglePlanetData
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