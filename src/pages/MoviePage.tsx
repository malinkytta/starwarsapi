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

                                <p>
                                    Episode: {searchResult.episode_id}
                                </p>
                                <p>
                                    Director: {searchResult.director}
                                </p>
                                <p>
                                    Producer: {searchResult.producer}
                                </p>
                                <p>
                                    Realease date: {searchResult.release_date}
                                </p>
                                <p>
                                    Characters:
                                </p>
                                <ListGroup>
                                    {searchResult.characters.map(data =>
                                        <ListGroup.Item
                                            action
                                            href={`/characters/${data.id}`}
                                            key={data.id}
                                        >
                                            <p>{data.name}</p>
                                        </ListGroup.Item>)}
                                </ListGroup>

                            </ListGroup.Item>
                        </ListGroup>
                    </div>
                )}
            </Container>
        </div>
    )
}

export default MoviePage