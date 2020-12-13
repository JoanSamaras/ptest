import React, { useCallback } from 'react';
import { Cell, FullWidthRow, TableWrapper, Tbody, Thead } from './styled-components';
import { Text } from 'components/text';
import { fontColours } from 'design-system/font-colours';
import { fontSizes } from 'design-system/font-sizes';
import { Dictionary } from 'helpers/types';
import { spacings } from 'design-system/spacings';

export enum CellViewType {
    plainText,
    unorderedList,
    embeddedTable
}

type BasicCellProps = {
    colour?: keyof typeof fontColours 
    size?: keyof typeof fontSizes
    withPaddingBottom?: boolean
};

export type TextCellProps = BasicCellProps & {
    text?: string 
};

export const SimpleTextCellView = ( p: TextCellProps ): JSX.Element => {
    const {
        text,
        colour,
        size,
        withPaddingBottom
    } = p;

    return (
        <Cell 
            key={ text } 
            withPaddingBottom={ withPaddingBottom }
            style={{
                width: '10rem',
                textAlign: 'center'
            }}
        >
            <Text colour={ colour } size={ size }>
                { text }
            </Text>
        </Cell>
    );
};

export type ListCellProps = BasicCellProps & {
    data: string[]
};

export const UnorderedListCellView = ( p: ListCellProps ): JSX.Element => {
    const {
        data,
        colour,
        size,
        withPaddingBottom
    } = p;

    return (
        <Cell key={ data.join( '' ) } withPaddingBottom={ withPaddingBottom }>
            <Text colour={ colour } size={ size }>
                <ul>
                    { data.map( d => (
                        <li 
                            style={{
                                marginBottom: spacings._4,
                                maxWidth: '10rem'
                            }}
                            key={ d }
                        >
                            { d }
                        </li>
                    ) ) }
                </ul>
            </Text>
        </Cell>
    );
};

export type EmbeddedTableProps = {
    data: any[]
    headers: string[]
    displayedHeaders?: Dictionary<string>
}

export const EmbeddedTableCellView = ( p: EmbeddedTableProps ) => {
    const {
        data,
        headers,
        displayedHeaders
    } = p;

    const filteredHeaders = headers.filter( h => h.length > 1 && !parseInt( h ) );
    const view = useCallback( ( data: any | null ) => {
        const fromattedData = Array.isArray( data ) && data.length === 1
            ? data[0]
            : data;

        return calculateCellView( fromattedData );
    }, [] );

    return (
        <Cell key={ JSON.stringify( data ) }>
            <TableWrapper>
                { filteredHeaders.length > 0 && (
                    <Thead>
                        <FullWidthRow>
                            { filteredHeaders.map( header => (
                                <Cell 
                                    key={ header }
                                    style={{
                                        width: '10rem'
                                    }}
                                >
                                    <Text colour='extraDark' weight='bold'>
                                        { displayedHeaders && displayedHeaders[header] 
                                            ? displayedHeaders[header]
                                            : header 
                                        }
                                    </Text>
                                </Cell>
                            ) ) }
                        </FullWidthRow>
                    </Thead>
                ) }

                <Tbody>
                    <FullWidthRow>
                        { data.map( d => (
                            view( d )
                        ) ) }
                    </FullWidthRow>
                </Tbody>
            </TableWrapper>
        </Cell>
    );
};

const views = {
    [ CellViewType.plainText ]: ( props?: TextCellProps ) => {
        if ( props ) {
            return (
                <SimpleTextCellView 
                    text={ props.text }
                    colour={ props.colour }
                    size={ props.size }
                    withPaddingBottom={ props.withPaddingBottom }
                />
            )
        } else {
            return <SimpleTextCellView />
        }
    },

    [ CellViewType.unorderedList ]: ( props: ListCellProps ) => {
        return (
            <UnorderedListCellView
                data={ props.data }
                colour={ props.colour }
                size={ props.size }
                withPaddingBottom={ props.withPaddingBottom }
            />
        )
    },

    [ CellViewType.embeddedTable ]: ( props: EmbeddedTableProps ) => {
        return (
            <EmbeddedTableCellView
                data={ props.data }
                headers={ props.headers }
                displayedHeaders={ props.displayedHeaders }
            />
        )
    }
};

export const calculateCellView = ( cellData: any | null ) => {
    let cellView;
    
    if ( cellData ) {
        if ( typeof cellData === 'string' ) {
            cellView = views[ CellViewType.plainText ]( {
                text: cellData
            } )
        } else {
            if ( Array.isArray( cellData ) && typeof cellData[0] === 'string' ) {
                cellView = views[ CellViewType.unorderedList ]( {
                    data: cellData
                } );

                return cellView;
            } else {
                cellView = views[ CellViewType.embeddedTable ]( {
                    data: Object.values( cellData ),
                    headers: Object.keys( cellData )
                } );

                return cellView;
            }
        }
    } else {
        console.log( 'in' )
        cellView = views[ CellViewType.plainText ]()
    }

    return cellView;
};
