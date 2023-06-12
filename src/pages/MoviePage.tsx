import { Link, useParams } from "react-router-dom"
import * as SW_API from '../services/StarWarsAPI'
import { useEffect, useState } from "react"
import { SW_SingleMovieData } from "../types"
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import CardComponent from "../components/CardComponent"
import Loading from "../components/Loading"
import ErrorComponent from "../components/Error"


const MoviePage = () => {
    const [searchResult, setSearchResult] = useState<SW_SingleMovieData | null>(null)
    const [loading, setLoading] = useState(false)
    const [showErr, setShowErr] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const { id } = useParams()
    const movieId = Number(id)

    const getMovie = async (id: number) => {
        setLoading(true)
        setError(null)
        setShowErr(false)

        try {
            const data = await SW_API.getMovie(id)
            setSearchResult(data)

        } catch (err: any) {
            setError(err.message)
            setShowErr(true)
        }
        setLoading(false)
    }

    useEffect(() => {
        if (typeof movieId !== 'number') {
            return
        }

        getMovie(movieId)
    }, [movieId])

    return (
        <div className="movies">
            <Loading show={loading}></Loading>
            <ErrorComponent show={showErr} >{error}</ErrorComponent>

            <Container className="py-3">
                <Link to="/movies">
                    <Button className="mb-3" variant='dark'>&laquo; All movies</Button>
                </Link>
                {searchResult && (
                    <div className="search-result" >
                        <CardComponent searchResult={searchResult} />
                    </div>
                )}
            </Container>
        </div>
    )
}

export default MoviePage