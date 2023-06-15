import { useEffect, useState } from 'react'
import * as SW_API from '../services/StarWarsAPI'
import Button from 'react-bootstrap/Button'
import { useSearchParams } from 'react-router-dom'
import Pagination from '../components/Pagination'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import { SW_CharacterSearchResponse } from '../types/index'
import Search from '../components/Search'
import Loading from '../components/Loading'
import ErrorComponent from '../components/Error'


const CharactersPage = () => {
    const [error, setError] = useState<string | null>(null)
    const [showErr, setShowErr] = useState(false)
    const [loading, setLoading] = useState(false)
    const [searchInput, setSearchInput] = useState('')
    const [searchResult, setSearchResult] = useState<SW_CharacterSearchResponse | null>(null)
    const [searchParams, setSearchParams] = useSearchParams()

    const query = searchParams.get('query')
    const page = Number(searchParams.get('page') ?? 1)

    const newSearch = (searchInput: string, page: string) => {
        const newSearchParams = new URLSearchParams(searchParams.toString())
        newSearchParams.set('query', searchInput)
        newSearchParams.set('page', String(page))
        setSearchParams(newSearchParams)
    }

    const getCharacters = async (searchPage: number) => {
        setLoading(true)
        setError(null)
        setShowErr(false)

        try {
            const data = await SW_API.getCharacters(searchPage)
            setSearchResult(data)

        } catch (err: any) {
            setError(err.message)
            setShowErr(true)
        }
        setLoading(false)
    }

    const searchCharacters = async (searchQuery: string, searchPage: number) => {
        setError(null)
        setShowErr(false)
        setLoading(true)
        setSearchResult(null)

        try {
            const data = await SW_API.searchCharacters(searchQuery, searchPage)

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

        searchCharacters(searchInput, 1)
        newSearch(searchInput, String(1))
    }

    const handleResetForm = () => {
        setSearchInput('')
        getCharacters(page)
        setSearchParams('')
    }

    useEffect(() => {
        if (!query) {
            setLoading(false)
            setError(null)
            getCharacters(page)
            setSearchInput('')
            return
        }
        searchCharacters(query, page)

    }, [query, page])

    setTimeout(() => { window.scrollTo(0, 0) }, 100)

    return (

        <div className="characters">
            <Loading show={loading}></Loading>
            <ErrorComponent show={showErr}>{error}</ErrorComponent>

            <Container className="py-3">
                <div className="bg-card py-4 px-4">
                    <h1>Characters</h1>

                    <Search
                        handleSubmit={handleSubmit}
                        searchInput={searchInput}
                        setSearchInput={setSearchInput}
                        handleResetForm={handleResetForm}
                    />
                    {searchResult && (query ? <p>Showing {searchResult.total} search results for "{query}"</p> : <p> {searchResult.total} characters</p>)}

                </div>

                {searchResult && (
                    <div id="characters" className="py-3">

                        <Row xs={1} md={2} lg={3} className="g-4">
                            {searchResult.data.map(data => (
                                <Col key={data.id} className="d-flex align-items-stretch">
                                    <Card className="glass">
                                        <Card.Body className="d-flex row px-4">
                                            <Card.Title>{data.name}</Card.Title>
                                            <hr />
                                            <Card.Text>
                                                <p><strong> Species: </strong> {data.species_count} </p>
                                            </Card.Text>
                                            <Card.Text>
                                                <p><strong>Birth year: </strong>{data.birth_year} </p>
                                            </Card.Text>
                                            <Card.Text>
                                                <p><strong>  Starring in: </strong> {data.films_count}  movies</p>
                                            </Card.Text>
                                            <Button
                                                variant="dark"
                                                href={`/characters/${data.id}`}
                                            >Read more</Button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>

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

export default CharactersPage