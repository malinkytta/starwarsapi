import { Link, useParams } from "react-router-dom"
import * as SW_API from '../services/StarWarsAPI'
import { useEffect, useState } from "react"
import ListGroup from "react-bootstrap/ListGroup"
import { SW_SinglePlanetData } from "../types"
import Container from 'react-bootstrap/Container'
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Card from "react-bootstrap/Card"



const PlanetPage = () => {
    const [searchResult, setSearchResult] = useState<SW_SinglePlanetData | null>(null)
    const [error, setError] = useState<string | null>(null)
    const { id } = useParams()
    const planetId = Number(id)

    const getPlanet = async (id: number) => {

        try {
            const data = await SW_API.getPlanet(id)
            console.log(data)
            setSearchResult(data)

        } catch (err: any) {
            console.log(err)
            setError(err.message)
        }
    }

    useEffect(() => {
        if (typeof planetId !== 'number') {
            return
        }

        getPlanet(planetId)
    }, [planetId])


    if (error) {
        return (
            <p>{error}</p>
        )
    }

    return (
        <div className="planets">
            <Container className="py-3">
                {searchResult && (
                    <div className="search-result" >
                        <ListGroup className="mb-3">
                            <ListGroup.Item
                                className="glass"
                                key={searchResult.id}
                            >
                                <h2>{searchResult.name}</h2>
                                <hr />

                                <p>
                                    Population: {searchResult.population}
                                </p>
                                <p>
                                    Terrain: {searchResult.terrain}
                                </p>

                                <ListGroup>
                                    <h3>Residents</h3>
                                    {searchResult.residents.length < 1 && (
                                        <>
                                            <Row className="mb-4">
                                                <Col>
                                                    {/* <Card className="none"> */}
                                                    <Card.Body>
                                                        <Card.Text> No residents</Card.Text>
                                                    </Card.Body>
                                                    {/* </Card> */}
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

                                    {/* {searchResult.residents.map(data =>
                                        <ListGroup.Item
                                            action
                                            href={`/characters/${data.id}`}
                                            key={data.id}
                                        >
                                            <p>{data.name}</p>
                                        </ListGroup.Item>)} */}
                                </ListGroup>

                                <ListGroup>
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
                                </ListGroup>

                            </ListGroup.Item>
                        </ListGroup>
                    </div>
                )
                }
            </Container >
        </div >
    )
}

export default PlanetPage