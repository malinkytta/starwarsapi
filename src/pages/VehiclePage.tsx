import { Link, useParams } from "react-router-dom"
import * as SW_API from '../services/StarWarsAPI'
import { useEffect, useState } from "react"
import ListGroup from "react-bootstrap/ListGroup"
import { SW_SingleVehicleData } from "../types"
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import Loading from "../components/Loading"
import ErrorComponent from "../components/Error"


const VehiclePage = () => {
    const [searchResult, setSearchResult] = useState<SW_SingleVehicleData | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [showErr, setShowErr] = useState(false)
    const [loading, setLoading] = useState(false)
    const { id } = useParams()
    const vehicleId = Number(id)

    const getVehicle = async (id: number) => {
        setLoading(true)
        setError(null)
        setShowErr(false)

        try {
            const data = await SW_API.getVehicle(id)
            setSearchResult(data)

        } catch (err: any) {
            setError(err.message)
            setShowErr(true)
        }
        setLoading(false)
    }

    useEffect(() => {
        if (typeof vehicleId !== 'number') {
            return
        }

        getVehicle(vehicleId)
    }, [vehicleId])

    return (
        <div className="vehicles">
            <Container className="py-3">

                <Loading show={loading}></Loading>
                <ErrorComponent show={showErr} >{error}</ErrorComponent>

                {searchResult && (
                    <div className="search-result" >

                        <Link to="/vehicles">
                            <Button className="mb-3" variant='dark'>&laquo; All vehicles</Button>
                        </Link>
                        <ListGroup className="mb-3">
                            <ListGroup.Item
                                className="glass"
                                key={searchResult.id}
                            >
                                <h2>{searchResult.name}</h2>
                                <hr />
                                <p><strong>Model:</strong> {searchResult.model}</p>
                                <p><strong>Manufacturer:</strong> {searchResult.manufacturer}</p>
                                <p><strong>Vehicle class:</strong> {searchResult.vehicle_class}</p>
                                <p><strong>Crew:</strong> {searchResult.crew}</p>
                                <p><strong>Passengers:</strong> {searchResult.passengers}</p>
                                <p><strong>Consumables:</strong> {searchResult.consumables}</p>
                                <p><strong>Max atmosphering speed:</strong> {searchResult.max_atmosphering_speed} km/h</p>


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
            </Container>
        </div>
    )
}

export default VehiclePage