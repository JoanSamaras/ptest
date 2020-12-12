import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { TermDefinition } from 'helpers/types';
import { api } from 'services';
import { Row } from 'components/row-column';
import { Text } from 'components/text';
import { StyledTable } from './table-view';
import { spacings } from 'design-system/spacings';

const Wrapper = styled( Row )`
    width: 95vh;
`;

export const Table = (): JSX.Element => {
    const [ error, setError ] = useState<string>( '' );
    const [ terms, setTerms ] = useState<TermDefinition[]>( [] );

    const getTerms = async () => {
        try {
            const res = await api.getTermDefinitions();

            console.log( res );
            if ( res ) {
                setTerms( res.embedded.terms );
            }

            return res;
        } catch ( error ) {
            console.error( error )
            setError( 'Content not found. Table could not be loaded. Try refreshing the page.' );
        }
    }

    useEffect( () => {
        ( async () => await getTerms() )();
    }, [] );

    return (
        <Wrapper alignCenter>
            <Text colour='white' size='h3' bottom={ spacings._6 }>
                Terms Table
            </Text>
            <StyledTable 
                columnHeaders={ terms.length > 0 ? Object.keys( terms[0] ) : [] }
                data={ terms }
            />
        </Wrapper>
    );
}
