import React, { FC } from 'react';
import styled from 'styled-components';
import { Button, LeftButtonIcon, RightButtonIcon } from 'components/buttons';
import { Column, Row } from 'components/row-column';
import { Text } from 'components/text';
import { spacings } from 'design-system/spacings';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { colours } from 'design-system/colours';
import { borderSizes } from 'design-system/border-sizes';

const RightButton = styled( RightButtonIcon )`
    margin-left: ${ spacings._1 };
    margin-right: ${ spacings._1 };
`;

const HoverableRow = styled( Row )`
    padding: ${ spacings._3 };
    width: 80%;
    justify-content: center;

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
                    style={{
                        marginLeft: spacings._6
                    }}
                >
                    <Popup 
                        trigger={ 
                            <Button profile='primary' size='default'>
                                Items per page ({ pageSize })
                            </Button> 
                        }
                        position='top center'
                        contentStyle={{
                            width: '3em',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center'
                        }}
                    >
                        { ( close: () => void ) => (
                            itemsPerPage.map( item => (
                                <HoverableRow 
                                    key={ item } 
                                    onClick={ () => {
                                        setPageSize( item );
                                        toPage( 1 );
                                        close();
                                    } }
                                >
                                    <Text colour='dark' weight='medium'>
                                        { item }
                                    </Text>
                                </HoverableRow>
                            ) )
                        ) }
                    </Popup>
                </Column>
            ) }
        </Row>
    );
};