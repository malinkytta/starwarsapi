/**
 * Star Wars API Service
 */

import axios from 'axios'
import { SW_SingleMovieData, SW_MovieSearchResponse } from '../types/index'
import { SW_CharacterSearchResponse, SW_SingleCharacterData } from '../types/characters'

const BASE_URL = 'https://swapi.thehiveresistance.com/api'

const get = async<T>(endpoint: string) => {
    const res = await axios.get(BASE_URL + endpoint)
    return res.data as T
}

export const getMovies = async (page: number) => {
    return get<SW_MovieSearchResponse>(`/films?page=${page}`)
}
export const getMovie = async (movieId: number) => {
    return get<SW_SingleMovieData>(`/films/${movieId}`)
}

export const searchMovies = async (query: string, page: number) => {
    return get<SW_MovieSearchResponse>(`/films/?search=${query}&page=${page}`)
}

export const getCharacters = async (page: number) => {
    return get<SW_CharacterSearchResponse>(`/people?page=${page}`)
}

export const getCharacter = async (characterId: number) => {
    return get<SW_SingleCharacterData>(`/people/${characterId}`)
}

export const searchCharacters = async (query: string, page: number) => {
    return get<SW_CharacterSearchResponse>(`/people/?search=${query}&page=${page}`)
}