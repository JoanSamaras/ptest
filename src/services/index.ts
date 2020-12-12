import Axios from 'axios';
import { EventEmitter } from 'events';
import { OntologiesRES } from 'helpers/types';
import convertToCamelcase from 'camelcase-keys';

const ev = new EventEmitter();

const Get = <REQ, RES>( url: string ) => async ( req: REQ ) => {
    try {
        const resp = await Axios.get( url, {
            params: req,
        } );

        const res = convertToCamelcase( 
            resp.data,
            {
                deep: true
            } 
        ) as RES;

        return res;
    } catch ( error ) {
        ev.emit( 'error', error );
        console.error( error );
        return null;
    }
};

export const api = {
    getTermDefinitions: Get<void, OntologiesRES>( 'https://www.ebi.ac.uk/ols/api/ontologies/efo/terms' ),
};
