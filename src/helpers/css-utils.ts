import styled, { css } from 'styled-components';

export type Margins = {
    top?: string
    left?: string
    right?: string
    bottom?: string
    padding?: string
};

export const margins = ( p: Margins ) => css`
    ${ p.top && css`
        margin-top: ${ p.top }; 
    ` }
    ${ p.left && css`
        margin-left: ${ p.left }; 
    ` }
    ${ p.right && css`
        margin-right: ${ p.right }; 
    ` }
    ${ p.bottom && css`
        margin-bottom: ${ p.bottom }; 
    ` }
    ${ p.padding && css`
        padding: ${ p.padding }; 
    ` }
`;