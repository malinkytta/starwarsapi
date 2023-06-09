import { Link, useParams } from "react-router-dom"
import * as SW_API from '../services/StarWarsAPI'
import { useEffect, useState } from "react"
import ListGroup from "react-bootstrap/ListGroup"
import { SW_SingleSpeciesData } from "../types"
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'


const SpeciePage = () => {
    const [searchResult, setSearchResult] = useState<SW_SingleSpeciesData | null>(null)
    const [error, setError] = useState<string | null>(null)
    const { id } = useParams()
    const specieId = Number(id)

    const getSpecie = async (id: number) => {

        try {
            const data = await SW_API.getSpecie(id)
            console.log(data)
            setSearchResult(data)

        } catch (err: any) {
            console.log(err)
            setError(err.message)
        }
    }

    useEffect(() => {
        if (typeof specieId !== 'number') {
            return
        }

        getSpecie(specieId)
    }, [specieId])


    if (error) {
        return (
            <p>{error}</p>
        )
    }

    return (
        <div className="species">
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
                                    Classification: {searchResult.classification}
                                </p>
                                <p>
                                    Language: {searchResult.language}
                                </p>
                                <ListGroup>
                                    <h3>Characters</h3>
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

                                </ListGroup>

                                <ListGroup>
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

export default SpeciePage