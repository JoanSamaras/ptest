import styled, { css } from 'styled-components';
import { colours } from 'design-system/colours';
import { spacings } from 'design-system/spacings';
import { borderSizes } from 'design-system/border-sizes';
import { Text } from 'components/text';

export const TableWrapper = styled.table`
    display: flex;
    flex-direction: column;
    width: 100%;
    background-color: ${ colours.grey2 };
    padding: ${ spacings._3 };
    overflow: auto;
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

export const Cell = styled.td<{ withPaddingBottom?: boolean }>`
    display: flex;
    padding-right: ${ spacings._2 };
    flex-wrap: wrap;
    word-break: break-word;
    ${ p => p.withPaddingBottom && css`
        padding-bottom: ${ spacings._2 };
    ` }
     
    > ${ Text } {
        width: 100%;
    }
`;

export const FullWidthRow = styled.tr<{ withBorderBottom?: boolean }>`
    width: fit-content;
    display: flex;
    flex-direction: row;
    ${ p => p.withBorderBottom && css`
        border-bottom: ${ borderSizes._1 } solid ${ colours.info5 };
    ` }
`;