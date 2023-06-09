import { useParams } from "react-router-dom"
import * as SW_API from '../services/StarWarsAPI'
import { useEffect, useState } from "react"
import ListGroup from "react-bootstrap/ListGroup"
import { SW_SingleStarshipsData } from "../types"
import Container from 'react-bootstrap/Container'


const StarShip = () => {
    const [searchResult, setSearchResult] = useState<SW_SingleStarshipsData | null>(null)
    const [error, setError] = useState<string | null>(null)
    const { id } = useParams()
    const starshipId = Number(id)

    const getStarship = async (id: number) => {

        try {
            const data = await SW_API.getStarship(id)
            console.log(data)
            setSearchResult(data)

        } catch (err: any) {
            console.log(err)
            setError(err.message)
        }
    }

    useEffect(() => {
        if (typeof starshipId !== 'number') {
            return
        }

        getStarship(starshipId)
    }, [starshipId])


    if (error) {
        return (
            <p>{error}</p>
        )
    }

    return (
        <div className="starships">
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
                                    <strong>Crew:</strong> {searchResult.crew}
                                </p>
                                <p>
                                    <strong>Passenger:</strong> {searchResult.passengers}
                                </p>

                                <p>
                                    <strong>Model:</strong>  {searchResult.model}
                                </p>

                                <ListGroup>
                                    <h3>Pilots:</h3>
                                    {searchResult.pilots.map(data =>
                                        <ListGroup.Item
                                            action
                                            href={`/characters/${data.id}`}
                                            key={data.id}
                                        >

                                            <p>{data.name}</p>
                                        </ListGroup.Item>)}
                                </ListGroup>


                                <ListGroup>
                                    <h3>Movies:</h3>

                                    {searchResult.films.map(data =>
                                        < ListGroup.Item
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
                )
                }
            </Container >
        </div >
    )
}

export default StarShip