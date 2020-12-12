import React from 'react';
import { Dictionary } from 'helpers/types';
import { Cell, TableWrapper, Thead, Tbody, Tfoot, FullWidthRow } from './styled-components';
import { Text } from 'components/text';

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
    const cellWidth = columnHeaders.length ? 100 / columnHeaders.length : 0;

    return (
        <TableWrapper>
            <Thead>
                <FullWidthRow>
                    { columnHeaders.map( header => (
                        <Cell width={ cellWidth } key={ header }>
                            <Text colour='extraDark' weight='bold'>
                                { header }
                            </Text>
                        </Cell>
                    ) ) }
                </FullWidthRow>
            </Thead>

            <Tbody>
                { data.map( d => (
                    <FullWidthRow key={ JSON.stringify( d ) }>
                        { columnHeaders.map( header => (
                            <Cell width={ cellWidth } key={ `${ header }_${ cellWidth }` } withPaddingBottom>
                                <Text>{ d[ header ] }</Text>
                            </Cell>
                        ) ) }
                    </FullWidthRow>
                ) ) }
            </Tbody>

            <Tfoot>
                <FullWidthRow>
                    <Cell width={ 100 }>Cats win!</Cell>
                </FullWidthRow>
            </Tfoot>

        </TableWrapper>
    );
}; 
