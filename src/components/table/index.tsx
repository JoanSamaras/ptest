import React, { useEffect, useState } from 'react';
import { api } from 'services';

export const Table = (): JSX.Element => {
    const [ error, setError ] = useState( '' );

    const getTerms = async () => {
        try {
            const res = await api.getTermDefinitions();

            console.log( res );

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
        <div />
    );
}
