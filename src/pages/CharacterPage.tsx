import { Link, useParams } from "react-router-dom"
import * as SW_API from '../services/StarWarsAPI'
import { useEffect, useState } from "react"
import ListGroup from "react-bootstrap/ListGroup"
import Container from 'react-bootstrap/Container'
import { SW_SingleCharacterData } from "../types/index"
import Row from 'react-bootstrap/Row'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import ErrorComponent from "../components/Error"
import Loading from "../components/Loading"

const CharacterPage = () => {
    const [searchResult, setSearchResult] = useState<SW_SingleCharacterData | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    const [showErr, setShowErr] = useState(false)
    const { id } = useParams()
    const characterId = Number(id)

    const getCharacter = async (id: number) => {
        setShowErr(false)
        setError(null)
        setLoading(true)

        try {
            const data = await SW_API.getCharacter(id)
            setSearchResult(data)

        } catch (err: any) {
            setError(err.message)
            setShowErr(true)
        }
        setLoading(false)
    }

    useEffect(() => {
        if (typeof characterId !== 'number') {
            return
        }

        getCharacter(characterId)
    }, [characterId])


    if (error) {
        return (
            <ErrorComponent show={showErr}>Error: {error}</ErrorComponent>

        )
    }

    return (
        <div className="characters">

            <Loading show={loading}></Loading>

            <Container className="py-3">
                <Link to="/characters">
                    <Button className="mb-3" variant='dark'>&laquo; All characters</Button>
                </Link>

                {searchResult && (
                    <div className="search-result">
                        <ListGroup className="mb-3 my-3">
                            <ListGroup.Item
                                className="glass px-4 py-4"
                                key={searchResult.id}
                            >
                                <h2>{searchResult.name}</h2>
                                <p><strong>Birth year:</strong> {searchResult.birth_year}</p>
                                <p><strong>Height:</strong> {searchResult.height}</p>

                                <h3>Homeworld</h3>
                                <Row xs={1} md={2} lg={4} className="g-4">
                                    <Col>
                                        <Card as={Link} to={`/planets/${searchResult.homeworld.id}`} className="card-hover">
                                            <Card.Body>
                                                <Card.Text>{searchResult.homeworld.name}</Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </Row>

                                <h3 className="mt-3">Movies</h3>
                                <Row xs={1} md={2} lg={4} className="g-4">
                                    {searchResult.films.map(data => (
                                        <Col key={data.id}>
                                            <Card as={Link} to={`/movies/${data.id}`} className="card-hover">
                                                <Card.Body>
                                                    <Card.Text>{data.title}</Card.Text>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    ))}
                                </Row>

                                <h3 className="mt-3">Species</h3>
                                {searchResult.species.length < 1 && (
                                    <>
                                        <Row className="mb-4">
                                            <Col>
                                                <Card.Body>
                                                    <Card.Text>No species</Card.Text>
                                                </Card.Body>
                                            </Col>
                                        </Row>
                                    </>
                                )}
                                <Row xs={1} md={2} lg={4} className="g-4">
                                    {searchResult.species.map(data => (
                                        <Col key={data.id}>
                                            <Card as={Link} to={`/species/${data.id}`} className="card-hover">
                                                <Card.Body>
                                                    <Card.Text>{data.name}</Card.Text>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    ))}
                                </Row>

                                <h3 className="mt-3">Starships</h3>
                                {searchResult.starships.length < 1 && (
                                    <>
                                        <Row className="mb-4">
                                            <Col>
                                                <Card.Body>
                                                    <Card.Text>No starships</Card.Text>
                                                </Card.Body>
                                            </Col>
                                        </Row>
                                    </>
                                )}
                                <Row xs={1} md={2} lg={4} className="g-4">
                                    {searchResult.starships.map(data => (
                                        <Col key={data.id}>
                                            <Card as={Link} to={`/starships/${data.id}`} className="card-hover">
                                                <Card.Body>
                                                    <Card.Text>{data.name}</Card.Text>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    ))}
                                </Row>
                                <h3 className="mt-3">Vehicles</h3>
                                {searchResult.vehicles.length < 1 && (
                                    <>
                                        <Row className="mb-4">
                                            <Col>
                                                <Card.Body>
                                                    <Card.Text>No vehicles</Card.Text>
                                                </Card.Body>
                                            </Col>
                                        </Row>
                                    </>
                                )}
                                <Row xs={1} md={2} lg={4} className="g-4">
                                    {searchResult.vehicles.map(data => (
                                        <Col key={data.id}>
                                            <Card as={Link} to={`/vehicles/${data.id}`} className="card-hover">
                                                <Card.Body>
                                                    <Card.Text>{data.name}</Card.Text>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    ))}
                                </Row>
                            </ListGroup.Item>
                        </ListGroup>
                    </div>
                )}
            </Container >
        </div >
    )
}

export default CharacterPage