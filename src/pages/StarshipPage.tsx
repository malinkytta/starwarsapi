import { Link, useParams } from "react-router-dom"
import * as SW_API from '../services/StarWarsAPI'
import { useEffect, useState } from "react"
import ListGroup from "react-bootstrap/ListGroup"
import { SW_SingleStarshipsData } from "../types"
import Container from 'react-bootstrap/Container'
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import Loading from "../components/Loading"
import ErrorComponent from "../components/Error"


const StarShip = () => {
    const [searchResult, setSearchResult] = useState<SW_SingleStarshipsData | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    const [showErr, setShowErr] = useState(false)
    const { id } = useParams()
    const starshipId = Number(id)

    const getStarship = async (id: number) => {
        setLoading(true)
        setError(null)
        setShowErr(false)

        try {
            const data = await SW_API.getStarship(id)
            setSearchResult(data)

        } catch (err: any) {
            setError(err.message)
            setShowErr(true)
        }
        setLoading(false)
    }

    useEffect(() => {
        if (typeof starshipId !== 'number') {
            return
        }

        getStarship(starshipId)
    }, [starshipId])

    return (
        <div className="starships">
            <Container className="py-3">

                <Loading show={loading}></Loading>
                <ErrorComponent show={showErr} >{error}</ErrorComponent>

                {searchResult && (
                    <div className="search-result">
                        <Link to="/starships">
                            <Button className="mb-3" variant='dark'>&laquo; All starships</Button>
                        </Link>
                        <ListGroup className="mb-3">
                            <ListGroup.Item
                                className="glass px-4 py-4"
                                key={searchResult.id}
                            >
                                <h2>{searchResult.name}</h2>
                                <hr />
                                <p><strong>Crew:</strong> {searchResult.crew}</p>
                                <p><strong>Passenger:</strong> {searchResult.passengers}</p>
                                <p> <strong>Model:</strong>  {searchResult.model}</p>

                                <h3>Pilots</h3>
                                {searchResult.pilots.length < 1 && (
                                    <>
                                        <Row className="mb-4">
                                            <Col>
                                                <Card.Body>
                                                    <Card.Text>No pilots</Card.Text>
                                                </Card.Body>
                                            </Col>
                                        </Row>
                                    </>
                                )}

                                <Row xs={1} md={2} lg={4} className="g-4">
                                    {searchResult.pilots.map(data => (
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

                            </ListGroup.Item>
                        </ListGroup>
                    </div>
                )}
            </Container >
        </div >
    )
}

export default StarShip