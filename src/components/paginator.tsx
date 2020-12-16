import React, { createRef, FC, useState } from 'react';
import styled, { css } from 'styled-components';
import { Button, LeftButtonIcon, RightButtonIcon } from 'components/buttons';
import { Column, Row } from 'components/row-column';
import { Text } from 'components/text';
import { spacings } from 'design-system/spacings';
import { colours } from 'design-system/colours';
import { borderSizes } from 'design-system/border-sizes';
import { zIndexes } from 'design-system/z-indexes';

const RightButton = styled( RightButtonIcon )`
    margin-left: ${ spacings._1 };
    margin-right: ${ spacings._1 };
`;

const HoverableRow = styled( Row )`
    padding: ${ spacings._3 };
    width: 80%;
    justify-content: center;
    z-index: ${ zIndexes._9 };

    :hover {
        background-color: ${ colours.grey9 };
        transition: background-color 0.2s;
        opacity: 0.1;
        border-radius: ${ borderSizes._3 };
        cursor: pointer;
        > ${ Text } {
            color: ${ colours.grey1 };
        }
    }
`;

const Popup = styled.div<{ open?: boolean }>`
    background-color: ${ colours.grey1 };
    border-radius: ${ borderSizes._5 };
    position: absolute;
    z-index: ${ zIndexes._10 };
    display: flex;
    flex-direction: column;
    align-items: center;
    pointer-events: auto;
    box-shadow: 0 0 ${ borderSizes._3 } rgba(0,0,0,.16);
    padding: ${ spacings._3 };
    width: 3em;
    ${ p => !p.open && css`
        display: none;
    ` }
    bottom: 2.6rem;
    left: 25%;
`;

type Props = {
    toPage: ( page: number ) => void
    page: number
    total: number
    pageSize: number
    itemsPerPage?: number[]
    setPageSize?: ( n: number ) => void
};

export const Paginator: FC<Props> = p => {
    const { 
        toPage, 
        page, 
        total,
        itemsPerPage,
        pageSize,
        setPageSize
    } = p;

    let firstIndex = ( page - 1 ) * pageSize + 1;

    if ( firstIndex > total ) {
        firstIndex = total
    }
    let lastIndex = page * pageSize;
    
    if ( lastIndex > total ) {
        lastIndex = total
    }
    const has_previous = ( page !== 1 );
    const has_next = ( total !== lastIndex );

    const [ open, setOpen ] = useState( false );

    return (
        <Row alignCenter>
            <Column>
                <Row>
                    <LeftButtonIcon disabled={ !has_previous } onClick={ () => toPage( page - 1 ) } />
                    <RightButton disabled={ !has_next } onClick={ () => toPage( page + 1 ) } />
                    <Text colour='dark' weight='bold' left={ spacings._3 }>
                        { firstIndex } - { lastIndex } of { total }
                    </Text>
                </Row>
            </Column>

            { itemsPerPage && itemsPerPage.length > 0 && setPageSize && (
                <Column
                    alignCenter
                    style={{
                        marginLeft: spacings._6
                    }}
                    onMouseOver={ () => setOpen( true ) }
                    onMouseOut={ () => setOpen( false ) }
                >
                    <Button profile='primary' size='default' as='div' onClick={ () => setOpen( !open ) }>
                        Items per page ({ pageSize })
                    </Button> 
                    
                    <Popup open={ open }>
                        { itemsPerPage.map( item => (
                            <HoverableRow 
                                key={ item } 
                                onClick={ () => {
                                    setPageSize( item );
                                    setOpen( false );
                                    toPage( 1 );
                                } }
                            >
                                <Text colour='dark' weight='medium'>
                                    { item }
                                </Text>
                            </HoverableRow>
                        ) ) }
                    </Popup>
                </Column>
            ) }
        </Row>
    );
};