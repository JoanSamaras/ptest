import React from 'react';
import { Cell } from './styled-components';
import { Text } from 'components/text';
import { fontColours } from 'design-system/font-colours';
import { fontSizes } from 'design-system/font-sizes';

export enum CellViewType {
    plainText,
    unorderedList,
    embeddedTable
}

export const SimpleTextCellView = ( 
    text?: string, 
    colour?: keyof typeof fontColours, 
    size?: keyof typeof fontSizes,
    withPaddingBottom?: boolean 
): JSX.Element => (
    <Cell key={ text } withPaddingBottom={ withPaddingBottom }>
        <Text colour={ colour } size={ size }>
            { text }
        </Text>
    </Cell>
);

export const UnorderedListCellView = ( 
    data: string[], 
    colour?: keyof typeof fontColours, 
    size?: keyof typeof fontSizes, 
    withPaddingBottom?: boolean 
): JSX.Element => (
    <Cell key={ data.join( '' ) } withPaddingBottom={ withPaddingBottom }>
        <Text colour={ colour } size={ size }>
            <ul>
                { data.map( d => (
                    <li key={ d }>{ d }</li>
                ) ) }
            </ul>
        </Text>
    </Cell>
);
