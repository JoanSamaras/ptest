import styled, { css } from 'styled-components';

type RowColumnProps = {
    grow?: boolean 
    spaceBetween?: boolean 
    alignCenter?: boolean 
    alignEnd?: boolean 
    fullWidth?: boolean 
}

const BasicDivCssConfig = styled.div<RowColumnProps>`
    position: relative;
    display: flex;
    ${ p => p.grow && css`
        flex-grow: 1;
    ` }
    ${ p => p.spaceBetween && css`
        justify-content: space-between;
    ` }
    ${ p => p.alignCenter && css`
        align-items: center;
    ` }
    ${ p => p.alignEnd && css`
        align-items: flex-end;
    ` }
    ${ p => p.fullWidth && css`
        width: 100%;
    ` }
`;

export const Row = styled( BasicDivCssConfig )`
    ${ BasicDivCssConfig };
    flex-flow: row wrap;
`;

export const Column = styled( BasicDivCssConfig )`
    flex-flow: column wrap;
`;