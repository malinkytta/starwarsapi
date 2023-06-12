import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import { SW_MovieSearchResponse } from "../types"


interface IProps {
    searchResult: SW_MovieSearchResponse
}

const OverviewCard: React.FC<IProps> = ({ searchResult }) => {

    return (
        <Row xs={1} md={2} lg={3} className="g-4">
            {searchResult.data.map(data => (
                <Col key={data.id} className="d-flex align-items-stretch">
                    <Card className="glass">
                        <Card.Body className=" d-flex row px-4">
                            <Card.Title>{data.title}</Card.Title>
                            <hr />
                            <Card.Text>
                                <strong>Episode:</strong> {data.episode_id}
                            </Card.Text>
                            <Card.Text>
                                <strong>Released: </strong> {data.release_date}
                            </Card.Text>
                            <Card.Text>
                                <strong>Characters:</strong>  {data.characters_count}
                            </Card.Text>
                            <Button
                                variant="dark"
                                href={`movies/${data.id}`}
                            >
                                Read more
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
            ))}
        </Row>
    )
}

export default OverviewCard