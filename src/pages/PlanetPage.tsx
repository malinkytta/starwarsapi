import { useParams } from "react-router-dom"
import * as SW_API from '../services/StarWarsAPI'
import { useEffect, useState } from "react"
import ListGroup from "react-bootstrap/ListGroup"
import { SW_SinglePlanetData } from "../types"
import Container from 'react-bootstrap/Container'


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
        <div className="movies">
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
                                    <h3>Residents:</h3>
                                    {searchResult.residents.map(data =>
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

export default PlanetPage