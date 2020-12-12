import React from 'react';
import logo from './logo.svg';
import './App.css';
import styled from 'styled-components';
import { Table } from 'components/table';

const Header = styled.div`
    background-color: #282c34;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: calc(10px + 2vmin);
    color: white;
`;

const App = (): JSX.Element => {
    return (
        <div className="App">
            <Table />
            <Header>
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/App.tsx</code> and save to reload.
                </p>
            </Header>
        </div>
    );
}

export default App;
