import { Link, useParams } from "react-router-dom"
import * as SW_API from '../services/StarWarsAPI'
import { useEffect, useState } from "react"
import ListGroup from "react-bootstrap/ListGroup"
import { SW_SinglePlanetData } from "../types"
import Container from 'react-bootstrap/Container'
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Card from "react-bootstrap/Card"
import Button from 'react-bootstrap/Button'
import Loading from "../components/Loading"
import ErrorComponent from "../components/Error"


const PlanetPage = () => {
    const [searchResult, setSearchResult] = useState<SW_SinglePlanetData | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [showErr, setShowErr] = useState(false)
    const [loading, setLoading] = useState(false)
    const { id } = useParams()
    const planetId = Number(id)

    const getPlanet = async (id: number) => {
        setLoading(true)
        setError(null)
        setShowErr(false)

        try {
            const data = await SW_API.getPlanet(id)
            setSearchResult(data)

        } catch (err: any) {
            setError(err.message)
            setShowErr(true)
        }
        setLoading(false)
    }

    useEffect(() => {
        if (typeof planetId !== 'number') {
            return
        }

        getPlanet(planetId)
    }, [planetId])


    return (
        <div className="planets">
            <Container className="py-3">

                <Loading show={loading}></Loading>
                <ErrorComponent show={showErr} >{error}</ErrorComponent>

                {searchResult && (
                    <div className="search-result">
                        <Link to="/planets">
                            <Button className="mb-3" variant='dark'>&laquo; All planets</Button>
                        </Link>
                        <ListGroup className="mb-3">
                            <ListGroup.Item
                                className="glass px-4 py-4"
                                key={searchResult.id}
                            >
                                <h2>{searchResult.name}</h2>
                                <hr />
                                <p><strong>Population: </strong>{searchResult.population}</p>
                                <p><strong>Terrain: </strong>{searchResult.terrain}</p>

                                <h3>Residents</h3>
                                {searchResult.residents.length < 1 && (
                                    <>
                                        <Row className="mb-4">
                                            <Col>
                                                <Card.Body>
                                                    <Card.Text>No residents</Card.Text>
                                                </Card.Body>
                                            </Col>
                                        </Row>
                                    </>
                                )}

                                <Row xs={1} md={2} lg={4} className="g-4">
                                    {searchResult.residents.map(data => (
                                        <Col key={data.id}>
                                            <Card as={Link} to={`/characters/${data.id}`} className="card-hover">
                                                <Card.Body>
                                                    <Card.Text>{data.name}</Card.Text>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    ))}
                                </Row>

                                <h3 className="mt-3">Movies</h3>
                                <Row xs={1} md={2} lg={4} className="g-4 ">
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

                            </ListGroup.Item>
                        </ListGroup>
                    </div>
                )}
            </Container >
        </div >
    )
}

export default PlanetPage