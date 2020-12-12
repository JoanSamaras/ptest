import React, { useEffect, useState } from 'react';
import { TermDefinition } from 'helpers/types';
import { api } from 'services';
import { Text } from 'components/text';

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
        <Text colour='dark'>hello</Text>
    );
}
