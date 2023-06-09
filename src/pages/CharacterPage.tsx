import { Link, useParams } from "react-router-dom"
import * as SW_API from '../services/StarWarsAPI'
import { useEffect, useState } from "react"
import ListGroup from "react-bootstrap/ListGroup"
import { SW_SingleMovieData } from "../types"
import Container from 'react-bootstrap/Container'
import { SW_SingleCharacterData } from "../types/index"
import Row from 'react-bootstrap/Row'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'




const CharacterPage = () => {
    const [searchResult, setSearchResult] = useState<SW_SingleCharacterData | null>(null)
    const [error, setError] = useState<string | null>(null)
    const { id } = useParams()
    const characterId = Number(id)

    const getCharacter = async (id: number) => {

        try {
            const data = await SW_API.getCharacter(id)
            // console.log(data)
            setSearchResult(data)

        } catch (err: any) {
            console.log(err)
            setError(err.message)
        }
    }

    useEffect(() => {
        if (typeof characterId !== 'number') {
            return
        }

        getCharacter(characterId)
    }, [characterId])


    if (error) {
        return (
            <p>{error}</p>
        )
    }

    return (
        <div className="characters">
            <Container className="py-3">

                {searchResult && (
                    <div className="search-result">
                        <ListGroup className="mb-3 my-3">
                            <ListGroup.Item
                                className='glass'
                                key={searchResult.id}
                            >
                                <h2>{searchResult.name}</h2>
                                <p><strong>Birth year:</strong> {searchResult.birth_year}</p>
                                <p><strong>Height:</strong> {searchResult.height}</p>
                                <p><strong>Homeworld:</strong> {searchResult.homeworld.name}</p>

                                <h3>Movies</h3>
                                {/* <ListGroup> */}

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
                                {/* </ListGroup> */}

                                <h3 className="mt-3">Species</h3>
                                {/* <ListGroup> */}
                                {searchResult.species.length < 1 && (
                                    <>
                                        <Row className="mb-4">
                                            <Col>
                                                {/* <Card className="none"> */}
                                                <Card.Body>
                                                    <Card.Text>No species</Card.Text>
                                                </Card.Body>
                                                {/* </Card> */}
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
                            </ListGroup.Item>
                        </ListGroup>

                    </div>
                )
                }
            </Container >
        </div >
    )
}

export default CharacterPage