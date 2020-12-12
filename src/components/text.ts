import styled, { css } from 'styled-components';
import { Margins, margins } from 'helpers/css-utils';
import { fontColours } from 'design-system/font-colours';
import { fontSizes } from 'design-system/font-sizes';
import { lineHeights } from 'design-system/line-heights';
import { fontWeights } from 'design-system/font-weights';

type TextProps = Margins & {
    colour?: keyof typeof fontColours
    size?: keyof typeof fontSizes
    weight?: keyof typeof fontWeights
    centerAlign?: boolean
}

export const Text = styled.span<TextProps>`
    ${ p => margins( p ) }
    color: ${ p => p.colour ? fontColours[ p.colour ] : fontColours.medium };
    font-size: ${ p => p.size ? fontSizes[ p.size ] : fontSizes.primary };
    line-height: ${ p => p.size ? lineHeights[ p.size ] : lineHeights.primary };
    font-weight: ${ p => p.weight ? fontWeights[ p.weight ] : fontWeights.medium };
    ${ p => p.centerAlign && css`
        text-align: center;
    ` }
`