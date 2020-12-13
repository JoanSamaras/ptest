import React from 'react';
import { Dictionary } from 'helpers/types';
import { Cell, TableWrapper, Thead, Tbody, Tfoot, FullWidthRow } from './styled-components';
import { Text } from 'components/text';
import { calculateCellView } from './cell-view';

type Props = {
    columnHeaders: string[]
    displayedColumnHeaders?: Dictionary<string>
    data: any[]
}

export const StyledTable = ( p: Props ): JSX.Element => {
    const {
        columnHeaders,
        displayedColumnHeaders,
        data
    } = p;

    return (
        <TableWrapper
            style={{
                height: '95%'
            }}
        >
            <Thead>
                <FullWidthRow>
                    { columnHeaders.map( header => (
                        <Cell 
                            key={ header }
                            style={{
                                width: '10rem',
                                textAlign: 'center'
                            }}
                        >
                            <Text colour='extraDark' weight='bold'>
                                { displayedColumnHeaders && displayedColumnHeaders[ header ] 
                                    ? displayedColumnHeaders[ header ] 
                                    : header 
                                }
                            </Text>
                        </Cell>
                    ) ) }
                </FullWidthRow>
            </Thead>

            <Tbody>
                { data.map( d => (
                    <FullWidthRow key={ JSON.stringify( d ) } withBorderBottom>
                        { columnHeaders.map( ( header, index ) => (
                            calculateCellView( d[ header ], columnHeaders[index] )
                        ) ) }
                    </FullWidthRow>
                ) ) }
            </Tbody>

            <Tfoot>
                <FullWidthRow>
                    <Cell>Cats win!</Cell>
                </FullWidthRow>
            </Tfoot>

        </TableWrapper>
    );
}; 
