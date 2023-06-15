import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import Card from "react-bootstrap/Card"
import { SW_SingleMovieData } from "../types"
import { Link } from "react-router-dom"
import ListGroup from "react-bootstrap/ListGroup"

interface IProps {
    searchResult: SW_SingleMovieData
}

const CardComponent: React.FC<IProps> = ({ searchResult }) => {

    return (
        <>
            <ListGroup className="mb-3 my-3">
                <ListGroup.Item
                    className="glass px-4 py-4"
                    key={searchResult.id}
                >
                    <h2>{searchResult.title}</h2>
                    <hr />
                    <p><strong>Episode:</strong> {searchResult.episode_id}</p>
                    <p><strong>Director:</strong> {searchResult.director} </p>
                    <p><strong>Producer:</strong> {searchResult.producer}</p>
                    <p><strong>Realease date:</strong> {searchResult.release_date}</p>

                    <h3>Opening</h3>
                    {searchResult.opening_crawl.split("\r\n\r").map((item, index) => (
                        <p key={index}>
                            {item}
                        </p>
                    ))}

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

                    <h3 className="mt-3">Planets</h3>
                    <Row xs={1} md={2} lg={4} className="g-4">
                        {searchResult.planets.map(data => (
                            <Col key={data.id}>
                                <Card as={Link} to={`/planets/${data.id}`} className="card-hover">
                                    <Card.Body>
                                        <Card.Text>{data.name}</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>

                    <h3 className="mt-3">Starships</h3>
                    <Row xs={1} md={2} lg={4} className="g-4">
                        {searchResult.starships.map(data => (
                            <Col key={data.id}>
                                <Card as={Link} to={`/starships/${data.id}`} className="card-hover">
                                    <Card.Body>
                                        <Card.Text>{data.name}</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>

                    <h3 className="mt-3">Vehicles</h3>
                    <Row xs={1} md={2} lg={4} className="g-4">
                        {searchResult.vehicles.map(data => (
                            <Col key={data.id}>
                                <Card as={Link} to={`/vehicles/${data.id}`} className="card-hover">
                                    <Card.Body>
                                        <Card.Text>{data.name}</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>

                    <h3 className="mt-3">Species</h3>
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
        </>
    )
}

export default CardComponent
