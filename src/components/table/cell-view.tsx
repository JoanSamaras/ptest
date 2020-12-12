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
    parentHeader: string
};

export const SimpleTextCellView = ( p: TextCellProps ): JSX.Element => {
    const {
        text,
        parentHeader,
        colour,
        size,
        withPaddingBottom
    } = p;

    return (
        <Cell 
            key={ `${ text }_${ parentHeader }` } 
            withPaddingBottom={ withPaddingBottom }
            style={{
                width: '10rem',
                textAlign: 'center',
                marginTop: '1em'
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
        <Cell withPaddingBottom={ withPaddingBottom }>
            <Text colour={ colour } size={ size }>
                <ul key={ JSON.stringify( data ) }>
                    { data.map( ( d, index ) => (
                        <li 
                            style={{
                                marginBottom: spacings._4,
                                maxWidth: '10rem'
                            }}
                            key={ `${ d }_${ index }` }
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
    parentHeader: string
}

export const EmbeddedTableCellView = ( p: EmbeddedTableProps ): JSX.Element => {
    const {
        data,
        headers,
        displayedHeaders,
        parentHeader
    } = p;

    const filteredHeaders = headers.filter( h => h.length > 1 && !parseInt( h ) );
    const view = useCallback( ( data: any | null, parent: string ) => {
        const fromattedData = Array.isArray( data ) && data.length === 1
            ? data[0]
            : data;

        return calculateCellView( fromattedData, parent );
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
                    <FullWidthRow key={ JSON.stringify( [ parentHeader, ...data, ...headers ] ) }>
                        { data.map( ( d, index ) => (
                            view( d, filteredHeaders[index] )
                        ) ) }
                    </FullWidthRow>
                </Tbody>
            </TableWrapper>
        </Cell>
    );
};

const views = {
    [ CellViewType.plainText ]: ( props: TextCellProps ) => {
        if ( props.text ) {
            return (
                <SimpleTextCellView 
                    key={ `${ props.text }_${ props.parentHeader }` }
                    text={ props.text }
                    parentHeader={ props.parentHeader }
                    colour={ props.colour }
                    size={ props.size }
                    withPaddingBottom={ props.withPaddingBottom }
                />
            );
        } else {
            return <SimpleTextCellView key={ `${ props.text }__${ props.parentHeader }` } parentHeader={ props.parentHeader } />
        }
    },

    [ CellViewType.unorderedList ]: ( props: ListCellProps ) => {
        return (
            <UnorderedListCellView 
                key={ JSON.stringify( props.data ) }
                data={ props.data }
                colour={ props.colour }
                size={ props.size }
                withPaddingBottom={ props.withPaddingBottom }
            />
        );
    },

    [ CellViewType.embeddedTable ]: ( props: EmbeddedTableProps ) => {
        return (
            <EmbeddedTableCellView
                key={ JSON.stringify( [ ...props.headers, ...props.data ] ) }
                data={ props.data }
                headers={ props.headers }
                displayedHeaders={ props.displayedHeaders } 
                parentHeader={ props.parentHeader }
            />
        );
    }
};

export const calculateCellView = ( cellData: any | null, parentHeader: string ): JSX.Element => {
    let cellView;
    
    if ( cellData ) {
        if ( typeof cellData === 'string' ) {
            cellView = views[ CellViewType.plainText ]( {
                text: cellData,
                parentHeader 
            } );
        } else {
            if ( Array.isArray( cellData ) && typeof cellData[0] === 'string' ) {
                // presenting a string array as unordered list
                cellView = views[ CellViewType.unorderedList ]( {
                    data: cellData
                } );
            } else {
                if ( Object.values( cellData ).length > 0 ) {
                    cellView = views[ CellViewType.embeddedTable ]( {
                        data: Object.values( cellData ),
                        headers: Object.keys( cellData ),
                        parentHeader
                    } );
                } else {
                    cellView = views[ CellViewType.plainText ]( {
                        parentHeader
                    } );
                }
            }
        }
    } else {
        cellView = views[ CellViewType.plainText ]( {
            parentHeader
        } );
    }

    return cellView;
};
