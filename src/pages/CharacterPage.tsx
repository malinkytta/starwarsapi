import { Link, useParams } from "react-router-dom"
import * as SW_API from '../services/StarWarsAPI'
import { useEffect, useState } from "react"
import ListGroup from "react-bootstrap/ListGroup"
import { SW_SingleMovieData } from "../types"
import Container from 'react-bootstrap/Container'
import { SW_SingleCharacterData } from "../types/index"

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
        <div className="movies">
            <Container className="py-3">
                {searchResult && (

                    <div className="search-result">
                        <ListGroup className="mb-3">
                            <ListGroup.Item
                                key={searchResult.id}
                            >
                                <h2>{searchResult.name}</h2>
                                <p>
                                    Birth year: {searchResult.birth_year}
                                </p>
                                <p>
                                    Height: {searchResult.height}
                                </p>
                                <p>
                                    Homeworld: {searchResult.homeworld.name}
                                </p>
                                {/* <ListGroup>
                                    {searchResult.species.map(data =>
                                        <ListGroup.Item
                                            action
                                            href={''}
                                            key={data.id}
                                        >
                                            <p>{data.name}</p>
                                        </ListGroup.Item>)}
                                </ListGroup> */}


                                <p>
                                    Movies:
                                </p>
                                <ListGroup>
                                    {searchResult.films.map(data =>
                                        <ListGroup.Item
                                            action
                                            href={`/movies/${data.id}`}
                                            key={data.id}
                                        >
                                            <p>{data.title}</p>
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

export default CharacterPage