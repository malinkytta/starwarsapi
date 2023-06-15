import { useEffect, useState } from 'react'
import * as SW_API from '../services/StarWarsAPI'
import { SW_MovieSearchResponse } from '../types'
import { useSearchParams } from 'react-router-dom'
import Pagination from '../components/Pagination'
import Container from 'react-bootstrap/Container'
import Search from '../components/Search'
import Loading from '../components/Loading'
import OverviewCard from '../components/OverviewCard'
import ErrorComponent from '../components/Error'

const MoviesPage = () => {
    const [error, setError] = useState<string | null>(null)
    const [showErr, setShowErr] = useState(false)
    const [loading, setLoading] = useState(false)
    const [searchInput, setSearchInput] = useState('')
    const [searchResult, setSearchResult] = useState<SW_MovieSearchResponse | null>(null)
    const [searchParams, setSearchParams] = useSearchParams()

    const query = searchParams.get('query') ?? ''
    const page = Number(searchParams.get('page') ?? 1)

    const newSearch = (searchInput: string, page: string) => {
        const newSearchParams = new URLSearchParams(searchParams.toString())
        newSearchParams.set('query', searchInput)
        newSearchParams.set('page', String(page))
        setSearchParams(newSearchParams)
    }

    const getMovies = async (searchPage: number) => {
        setLoading(true)
        setShowErr(false)
        setError(null)

        try {
            const data = await SW_API.getMovies(searchPage)
            setSearchResult(data)

        } catch (err: any) {
            setError(err.message)
            setShowErr(true)
        }
        setLoading(false)
    }

    const searchMovies = async (searchQuery: string, searchPage: number) => {
        setError(null)
        setShowErr(false)
        setLoading(true)
        setSearchResult(null)

        try {
            const data = await SW_API.searchMovies(searchQuery, searchPage)

            setSearchResult(data)
            setLoading(false)
        }
        catch (err: any) {
            setError(err.message)
            setShowErr(true)
        }
        setLoading(false)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!searchInput.trim().length) {
            return
        }

        searchMovies(searchInput, 1)
        setSearchParams({ query: searchInput })
    }

    const handleResetForm = () => {
        setSearchInput('')
        getMovies(page)
        setSearchParams('')
    }

    useEffect(() => {
        if (!query) {
            setLoading(false)
            setError(null)
            getMovies(page)
            setSearchInput('')
            return
        }
        searchMovies(query, page)

    }, [query, page])

    setTimeout(() => { window.scrollTo(0, 0) }, 100)

    return (

        <div className="movies">

            <Loading show={loading}></Loading>
            <ErrorComponent show={showErr}>{error}</ErrorComponent>

            <Container className="py-3">
                <div className="bg-card py-4 px-4">
                    <h1>Movies</h1>

                    <Search
                        handleSubmit={handleSubmit}
                        searchInput={searchInput}
                        setSearchInput={setSearchInput}
                        handleResetForm={handleResetForm}
                    />

                    {searchResult && (query ? <p>Showing {searchResult.total} search results for "{query}"</p> : <p> {searchResult.total} movies</p>)}
                </div>

                {searchResult && (
                    <div id="movies" className="py-3">
                        <OverviewCard searchResult={searchResult} />

                        <Pagination
                            page={searchResult.current_page}
                            totalPages={searchResult.last_page}
                            hasPreviousPage={searchResult.prev_page_url}
                            hasNextPage={searchResult.next_page_url}
                            onPreviousPage={() => newSearch(searchInput, String(page - 1))}
                            onNextPage={() => newSearch(searchInput, String(page + 1))}
                        />
                    </div>
                )}
            </Container>
        </div >
    )
}

export default MoviesPage