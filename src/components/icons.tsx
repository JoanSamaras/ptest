import React from 'react';
import styled from 'styled-components';
import { colours } from 'design-system/colours';
import { spacings } from 'design-system/spacings';
import { KeyboardArrowRight as KeyboardArrowRightSVG } from '@styled-icons/material/KeyboardArrowRight';
import { KeyboardArrowLeft as KeyboardArrowLeftSVG } from '@styled-icons/material/KeyboardArrowLeft';

type IconProps = {
    colour?: string
    height?: string
};

export const ArrowRightIcon = styled( KeyboardArrowRightSVG )<IconProps>`
    height: ${ p => p.height ? p.height : spacings._5 };
    color: ${ p => p.colour ? p.colour : colours.grey4 };
`;

export const ArrowLeftIcon = styled( KeyboardArrowLeftSVG )<IconProps>`
    height: ${ p => p.height ? p.height : spacings._5 };
    color: ${ p => p.colour ? p.colour : colours.grey4 };
`;
