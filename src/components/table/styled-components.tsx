import styled, { css } from 'styled-components';
import { colours } from 'design-system/colours';
import { spacings } from 'design-system/spacings';
import { borderSizes } from 'design-system/border-sizes';

export const TableWrapper = styled.table`
    display: flex;
    flex-direction: column;
    width: 100%;
    background-color: ${ colours.grey2 };
    padding: ${ spacings._3 };
`;

export const Thead = styled.thead`
    display: flex;
    padding-bottom: ${ spacings._2 };
    border-bottom: ${ borderSizes._2 } solid ${ colours.primary5 };
`;

export const Tbody = styled.tbody`
    display: flex;
    flex-direction: column;
`;

export const Tfoot = styled.tfoot`
    display: flex;
    padding-top: ${ spacings._2 };
    align-self: flex-end;
`;

export const Cell = styled.td<{ width: number, withPaddingBottom?: boolean }>`
    width: ${ p => `${ p.width }%` };
    display: flex;
    ${ p => p.withPaddingBottom && css`
        padding-bottom: ${ spacings._2 };
    ` }
`;

export const FullWidthRow = styled.tr`
    width: 100%;
    display: flex;
    flex-direction: row;
`;