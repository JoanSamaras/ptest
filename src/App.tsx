import React from 'react';
import './App.css';
import styled from 'styled-components';
import { Table } from 'components/table';
import { Column } from 'components/row-column';

const Wrapper = styled( Column )`
    background-color: #282c34;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const App = (): JSX.Element => {
    return (
        <div className="App">
            <Wrapper>
                <Table />
            </Wrapper>
        </div>
    );
}

export default App;
