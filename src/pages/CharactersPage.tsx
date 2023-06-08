import { useEffect, useState } from 'react'
import * as SW_API from '../services/StarWarsAPI'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useSearchParams } from 'react-router-dom'
import Pagination from '../components/Pagination'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import { SW_CharacterSearchResponse } from '../types/characters'
import Search from '../components/Search'

const CharactersPage = () => {
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    // const [page, setPage] = useState(1)
    const [searchInput, setSearchInput] = useState('')
    const [searchResult, setSearchResult] = useState<SW_CharacterSearchResponse | null>(null)
    const [searchParams, setSearchParams] = useSearchParams()

    const query = searchParams.get('query')
    const page = Number(searchParams.get('page') ?? 1)

    const newSearchParams = new URLSearchParams(searchParams.toString());

    const getCharacters = async (searchPage: number) => {
        setLoading(true)

        try {
            const data = await SW_API.getCharacters(searchPage)
            setSearchResult(data)

        } catch (err: any) {
            setError(err.message)
            console.log(err.message)
        }
        setLoading(false)
    }

    const searchCharacters = async (searchQuery: string, searchPage: number) => {
        setError(null)
        setLoading(true)
        setSearchResult(null)

        try {
            const data = await SW_API.searchCharacters(searchQuery, searchPage)
            console.log(data)

            setSearchResult(data)
            setLoading(false)
        }
        catch (err: any) {
            setError(err.message)
            console.log(err.message)
        }
        setLoading(false)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!searchInput.trim().length) {
            return
        }

        // setPage(1)

        newSearchParams.set('query', searchInput)
        newSearchParams.set('page', String(page))

        // searchCharacters(searchInput, 1)
        // setSearchParams({ query: searchInput, page: 1 })
        setSearchParams(newSearchParams)

    }

    const handleResetForm = () => {
        setSearchInput('')
        getCharacters(page)
        setSearchParams('')
    }

    const togglePage = (page: number) => {
        newSearchParams.set('query', searchInput)
        newSearchParams.set('page', String(page))
        setSearchParams(newSearchParams)
    }

    useEffect(() => {
        if (!query) {
            setLoading(false)
            setError(null)
            getCharacters(page)

            return
        }
        searchCharacters(query, page)

    }, [query, page])

    window.scrollTo(0, 0)

    return (
        <div className="characters">
            <Container className="py-3">
                <div className="bg-card py-4 px-4">
                    <h1>Characters</h1>
                    <Search
                        handleSubmit={handleSubmit}
                        searchInput={searchInput}
                        setSearchInput={setSearchInput}
                        handleResetForm={handleResetForm}
                    />
                </div>

                {error && <div>{error}</div>}
                {loading && (<p>Loading...</p>)}

                {searchResult && (
                    <div id="characters" className="py-3">
                        {query && <p>Showing {searchResult.total} search results for "{query}"</p>}

                        <Row xs={1} md={2} lg={3} className="g-4">
                            {searchResult.data.map(data => (
                                <Col key={data.id}>
                                    <Card className="glass">
                                        {/* <Card.Img variant="top" src="https://unsplash.it/640/425?blur" /> */}

                                        <Card.Body>
                                            <Card.Title>{data.name}</Card.Title>
                                            <hr />
                                            <Card.Text>
                                                Species:  {data.species_count}
                                            </Card.Text>
                                            <Card.Text>
                                                Birth year: {data.birth_year}
                                            </Card.Text>
                                            <Card.Text>
                                                Starring in:  {data.films_count} films
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
                            hasPreviousPage={page > 1}
                            hasNextPage={page < searchResult.last_page}
                            onPreviousPage={() => togglePage(page - 1)}
                            onNextPage={() => togglePage(page + 1)}
                        />

                    </div>
                )}
            </Container>
        </div>
    )
}

export default CharactersPage