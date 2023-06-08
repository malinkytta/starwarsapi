import { useEffect, useState } from 'react'
import * as SW_API from '../services/StarWarsAPI'
import { SW_MovieSearchResponse } from '../types'
import ListGroup from 'react-bootstrap/ListGroup'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useSearchParams } from 'react-router-dom'
import Pagination from '../components/Pagination'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'

const MoviesPage = () => {
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [searchInput, setSearchInput] = useState('')
    const [searchResult, setSearchResult] = useState<SW_MovieSearchResponse | null>(null)
    const [searchParams, setSearchParams] = useSearchParams()

    const query = searchParams.get('query')

    const getMovies = async (page = 1) => {
        setLoading(true)

        try {
            const data = await SW_API.getMovies(page)
            setSearchResult(data)

        } catch (err: any) {
            setError(err.message)
            console.log(err.message)
        }
        setLoading(false)
    }

    const searchMovies = async (searchQuery: string, page: number) => {
        setError(null)
        setLoading(true)
        setSearchResult(null)

        try {
            const data = await SW_API.searchMovies(searchQuery, page)
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

        setPage(1)

        searchMovies(searchInput, 1)
        setSearchParams({ query: searchInput })
    }

    const handleResetForm = () => {
        setSearchInput('')
        getMovies()
        setSearchParams('')
    }

    useEffect(() => {
        if (!query) {
            setLoading(false)
            setError(null)
            getMovies()
            return
        }
        searchMovies(query, page)

    }, [query, page])



    return (
        <div className="movies">
            <Container className="py-3">
                <div className="bg-card py-4 px-4">
                    <h1>Movies</h1>
                    <Form
                        className="mb-4"
                        onSubmit={handleSubmit}
                    >
                        <Form.Group className="mb-3" controlId="searchQuery">
                            <Form.Label>Search Query</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="May the search be with you..."
                                onChange={e => setSearchInput(e.target.value)}
                                value={searchInput}
                            />
                        </Form.Group>

                        <div className="d-flex justify-content-end gap-2" >
                            <Button
                                variant="dark"
                                type="submit"
                                disabled={!searchInput.trim().length}
                                className="border border-dark"
                            >
                                Search
                            </Button>

                            <Button
                                variant='dark'
                                onClick={handleResetForm}
                            >
                                Reset

                            </Button>
                        </div>
                    </Form>
                </div>

                {error && <div>{error}</div>}
                {loading && (<p>Loading...</p>)}

                {searchResult && (
                    <div id="movies" className="py-3">
                        {query && <p>Showing {searchResult.data.length} search results for "{query}"</p>}

                        <Row xs={1} md={2} lg={3} className="g-4">
                            {searchResult.data.map(data => (
                                <Col key={data.id}>
                                    <Card className="glass">
                                        {/* <Card.Img variant="top" src="https://unsplash.it/640/425?blur" /> */}

                                        <Card.Body>
                                            <Card.Title>{data.title}</Card.Title>
                                            <Card.Text>
                                                Episode: {data.episode_id}
                                            </Card.Text>
                                            <Card.Text>
                                                Released: {data.release_date}
                                            </Card.Text>
                                            <Card.Text>
                                                {data.characters_count} characters
                                            </Card.Text>
                                            <Button
                                                variant="dark"
                                                href={`/movies/${data.id}`}
                                            >Read more</Button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>

                        {/* <div id="movies" className='gy-4'>
                        {query && <p>Showing {searchResult.data.length} search results for "{query}"</p>}
                        <ListGroup className='mb-3'>
                            {searchResult.data.map(data =>
                                <ListGroup.Item
                                    className="col-6"
                                    action
                                    href={`/movies/${data.id}`}
                                    key={data.id}
                                >
                                    <h2>{data.title}</h2>
                                    <p className='mb-0'>Episode: {data.episode_id}</p>
                                    <p className='mb-0'>Released: {data.release_date}</p>
                                    <p className='mb-0'>{data.characters_count} characters</p>
                                    <Button>Read more</Button>

                                </ListGroup.Item>
                            )}
                        </ListGroup> */}

                        <Pagination
                            page={searchResult.current_page}
                            totalPages={searchResult.last_page}
                            hasPreviousPage={page < searchResult.last_page}
                            hasNextPage={page < searchResult.last_page}
                            onPreviousPage={() => { setPage(prevValue => prevValue - 1) }}
                            onNextPage={() => { setPage(prevValue => prevValue + 1) }}
                        />
                    </div>
                )
                }
            </Container>
        </div >
    )
}

export default MoviesPage