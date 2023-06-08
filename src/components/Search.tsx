import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import React from 'react'

interface IProps {
    handleSubmit: (e: React.FormEvent) => void
    searchInput: string
    setSearchInput: (value: React.SetStateAction<string>) => void
    handleResetForm: () => void
}

const Search: React.FC<IProps> = ({ handleSubmit, searchInput, setSearchInput, handleResetForm }) => {

    return (
        <>
            <Form
                className="mb-4"
                onSubmit={handleSubmit}
            >
                <Form.Group className="mb-3" controlId="searchQuery">
                    <Form.Label>Search Query</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="May the search be with you..."
                        onChange={e => setSearchInput(e.target.value)}
                        value={searchInput}
                    />
                </Form.Group>

                <div className="d-flex justify-content-end gap-2" >
                    <Button
                        variant="dark"
                        type="submit"
                        disabled={!searchInput.trim().length}
                        className="border border-dark"
                    >
                        Search
                    </Button>

                    <Button
                        variant='dark'
                        onClick={handleResetForm}
                    >
                        Reset

                    </Button>
                </div>
            </Form>
        </>
    )
}

export default Search