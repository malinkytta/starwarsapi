import { Link, useParams } from "react-router-dom"
import * as SW_API from '../services/StarWarsAPI'
import { useEffect, useState } from "react"
import ListGroup from "react-bootstrap/ListGroup"
import { SW_SingleSpeciesData } from "../types"
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Loading from "../components/Loading"
import ErrorComponent from "../components/Error"


const SpeciePage = () => {
    const [searchResult, setSearchResult] = useState<SW_SingleSpeciesData | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [showErr, setShowErr] = useState(false)
    const [loading, setLoading] = useState(false)
    const { id } = useParams()
    const specieId = Number(id)

    const getSpecie = async (id: number) => {
        setLoading(true)
        setError(null)
        setShowErr(false)

        try {
            const data = await SW_API.getSpecie(id)
            setSearchResult(data)

        } catch (err: any) {
            setError(err.message)
            setShowErr(true)
        }

        setLoading(false)
    }

    useEffect(() => {
        if (typeof specieId !== 'number') {
            return
        }

        getSpecie(specieId)
    }, [specieId])


    return (
        <div className="species">
            <Container className="py-3">

                <Loading show={loading}></Loading>
                <ErrorComponent show={showErr} >{error}</ErrorComponent>

                {searchResult && (
                    <div className="search-result" >
                        <Link to="/species">
                            <Button className="mb-3" variant='dark'>&laquo; All species</Button>
                        </Link>
                        <ListGroup className="mb-3">
                            <ListGroup.Item
                                className="glass px-4 py-4"
                                key={searchResult.id}
                            >
                                <h2>{searchResult.name}</h2>
                                <hr />
                                <p><strong>Classification:</strong> {searchResult.classification}</p>
                                <p><strong>Language:</strong> {searchResult.language}</p>
                                <p><strong>Average height:</strong> {searchResult.average_height} cm</p>
                                <p><strong>Average lifespan:</strong> {searchResult.average_lifespan} years</p>

                                <h3>Homeworld</h3>
                                {searchResult.homeworld === null && (
                                    <>
                                        <Row className="mb-4">
                                            <Col>
                                                <Card.Body>
                                                    <Card.Text>No homeworld</Card.Text>
                                                </Card.Body>
                                            </Col>
                                        </Row>
                                    </>
                                )}

                                {searchResult.homeworld && (
                                    <Row xs={1} md={2} lg={4} className="g-4">
                                        <Col>
                                            <Card as={Link} to={`/planets/${searchResult.homeworld.id}`} className="card-hover">
                                                <Card.Body>
                                                    <Card.Text>{searchResult.homeworld.name}</Card.Text>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    </Row>
                                )}

                                <h3 className="mt-3">Characters</h3>
                                <Row xs={1} md={2} lg={4} className="g-4">
                                    {searchResult.people.map(data => (
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
                                            <Card as={Link} to={`/characters/${data.id}`} className="card-hover">
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

export default SpeciePage