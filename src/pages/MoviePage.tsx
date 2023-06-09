import { Link, useParams } from "react-router-dom"
import * as SW_API from '../services/StarWarsAPI'
import { useEffect, useState } from "react"
import ListGroup from "react-bootstrap/ListGroup"
import { SW_SingleMovieData } from "../types"
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'


const MoviePage = () => {
    const [searchResult, setSearchResult] = useState<SW_SingleMovieData | null>(null)
    const [error, setError] = useState<string | null>(null)
    const { id } = useParams()
    const movieId = Number(id)

    const getMovie = async (id: number) => {

        try {
            const data = await SW_API.getMovie(id)
            console.log(data)
            setSearchResult(data)

        } catch (err: any) {
            console.log(err)
            setError(err.message)
        }
    }

    useEffect(() => {
        if (typeof movieId !== 'number') {
            return
        }

        getMovie(movieId)
    }, [movieId])


    if (error) {
        return (
            <p>{error}</p>
        )
    }



    return (
        <div className="movies">
            <Container className="py-3">
                {searchResult && (
                    <div className="search-result" >
                        <ListGroup className="mb-3">
                            <ListGroup.Item
                                className="glass"
                                key={searchResult.id}
                            >
                                <h2>{searchResult.title}</h2>
                                <hr />

                                <p> <strong> Episode: </strong>{searchResult.episode_id} </p>
                                <p>
                                    <strong>Director: </strong>{searchResult.director}
                                </p>
                                <p>
                                    <strong> Producer: </strong>{searchResult.producer}
                                </p>
                                <p>
                                    <strong>  Realease date: </strong>{searchResult.release_date}
                                </p>
                                <h3>Opening</h3>
                                {searchResult.opening_crawl.split("\r\n\r").map(function (item, index) {
                                    return (
                                        <p key={index}>
                                            {item}
                                        </p>
                                    )
                                })}

                                {/* <ListGroup> */}
                                <h3>Characters</h3>

                                <Row xs={1} md={2} lg={4} className="g-4">
                                    {searchResult.characters.map(data => (
                                        <Col key={data.id}>
                                            <Card as={Link} to={`/characters/${data.id}`} className="card-hover">
                                                <Card.Body>
                                                    <Card.Text>{data.name}</Card.Text>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    ))}
                                </Row>

                                {/* </ListGroup> */}

                            </ListGroup.Item>
                        </ListGroup>
                    </div>
                )}
            </Container>
        </div>
    )
}

export default MoviePage