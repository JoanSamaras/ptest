import React, { useState } from 'react';
import { Dictionary } from 'helpers/types';
import { Cell, TableWrapper, Thead, Tbody, Tfoot, FullWidthRow } from './styled-components';
import { Text } from 'components/text';
import { calculateCellView } from './cell-view';
import { Paginator } from 'components/paginator';

type Props = {
    columnHeaders: string[]
    displayedColumnHeaders?: Dictionary<string>
    data: any[]
}

const availablePageSizes: number[] = [
    5,
    10,
    15,
    20,
    25
];

export const StyledTable = ( p: Props ): JSX.Element => {
    const {
        columnHeaders,
        displayedColumnHeaders,
        data
    } = p;

    const [ currentPage, setPage ] = useState( 1 );
    const [ currentPageSize, setPageSize ] = useState( availablePageSizes[0] );
    
    const paginatedData = data.slice( ( currentPage-1 ) * currentPageSize, currentPage * currentPageSize );

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
                { paginatedData.map( d => (
                    <FullWidthRow key={ JSON.stringify( d ) } withBorderBottom>
                        { columnHeaders.map( ( header, index ) => (
                            calculateCellView( d[ header ], columnHeaders[index] )
                        ) ) }
                    </FullWidthRow>
                ) ) }
            </Tbody>

            <Tfoot>
                <FullWidthRow>
                    <Cell>
                        <Paginator 
                            total={ data.length }
                            page={ currentPage } 
                            pageSize={ currentPageSize } 
                            toPage={ page => setPage( page ) } 
                            setPageSize={ setPageSize }
                            itemsPerPage={ availablePageSizes }
                        />
                    </Cell>
                </FullWidthRow>
            </Tfoot>

        </TableWrapper>
    );
}; 
