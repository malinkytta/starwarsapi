import { useParams } from "react-router-dom"
import * as SW_API from '../services/StarWarsAPI'
import { useEffect, useState } from "react"
import ListGroup from "react-bootstrap/ListGroup"
import { SW_SingleVehicleData } from "../types"
import Container from 'react-bootstrap/Container'


const VehiclePage = () => {
    const [searchResult, setSearchResult] = useState<SW_SingleVehicleData | null>(null)
    const [error, setError] = useState<string | null>(null)
    const { id } = useParams()
    const vehicleId = Number(id)

    const getVehicle = async (id: number) => {

        try {
            const data = await SW_API.getVehicle(id)
            console.log(data)
            setSearchResult(data)

        } catch (err: any) {
            console.log(err)
            setError(err.message)
        }
    }

    useEffect(() => {
        if (typeof vehicleId !== 'number') {
            return
        }

        getVehicle(vehicleId)
    }, [vehicleId])


    if (error) {
        return (
            <p>{error}</p>
        )
    }

    return (
        <div className="vehicles">
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
                                    <strong>Vehicle class:</strong> {searchResult.vehicle_class}
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

export default VehiclePage