import React from 'react';
import { InputGroup, Form } from 'react-bootstrap';

function Search({ searchTerm, setSearchTerm }) {
    return (
        <InputGroup style={{ width: '500px' }}>
            <Form.Control
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </InputGroup>
    );
}

export default Search;