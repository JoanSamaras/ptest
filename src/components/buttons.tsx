import React from 'react';
import styled, { css } from 'styled-components';
import { colours } from 'design-system/colours';
import { spacings } from 'design-system/spacings';
import { fontSizes } from 'design-system/font-sizes';
import { fontWeights } from 'design-system/font-weights';
import { ArrowLeftIcon, ArrowRightIcon } from 'components/icons';
import { Margins, margins } from 'helpers/css-utils';

type ButtonProfileType = 'default' | 'primary'
type ButtonSize = 'default' | 'small'

type ButtonStyleProps = {
    profile: ButtonProfileType
    size: ButtonSize
    disabled?: boolean
    margins?: Margins
}

type ButtonProps = {
    disabled?: boolean
    onClick: () => void
}

const profileColourSettings = ( p: ButtonProfileType ) => {
    if ( p === 'primary' ) {
        return css`
            background-color: ${ colours.primary5 };
            color: ${ colours.grey1 };

            :hover {
                cursor: pointer;
                background-color: ${ colours.primary4 };
            }
            :active {
                cursor: pointer;
                background-color: ${ colours.primary6 };
            }
        `
    } else {
        return css`
            background-color: ${ colours.grey3 };
            color: ${ colours.grey4 };

            :hover {
                cursor: pointer;
                background-color: ${ colours.grey5 };
                color: ${ colours.grey5 };
            }
            :active {
                cursor: pointer;
                background-color: ${ colours.grey6 };
                color: ${ colours.grey6 };
            }
        `
    }
};

export const Button = styled.button<ButtonStyleProps>`
    user-select: none;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: ${ spacings._1 };
    text-align: center;
    font-weight: ${ fontWeights.bold };
    transition: background-color 0.3s;
    opacity: ${ p => p.disabled ? '0.6' : 'unset' };
    pointer-events: ${ p => p.disabled ? 'none' : 'unset' };
    padding: ${ spacings._4 } ${ spacings._6 };
    border: none;

    ${ p => p.profile && profileColourSettings( p.profile ) }
    :focus {
        outline: none;
    }

    ${ p => p.size === 'small' && css`
        padding: ${ spacings._1 } ${ spacings._3 };
        font-size: ${ fontSizes.secondary };
    ` }

    ${ p => p.margins && margins( p.margins ) }
`;

export const LeftButtonIcon = ( p: ButtonProps ): JSX.Element => (
    <Button 
        profile='default' 
        size='small' 
        disabled={ p.disabled }
        margins={ {
            left: spacings._1,
            right: spacings._1
        } }
        onClick={ p.onClick }
    >
        <ArrowLeftIcon />
    </Button>
);


export const RightButtonIcon = ( p: ButtonProps ): JSX.Element => (
    <Button
        profile='default' 
        size='small' 
        disabled={ p.disabled }
        margins={ {
            left: spacings._1,
            right: spacings._1
        } }
        onClick={ p.onClick }
    >
        <ArrowRightIcon />
    </Button>
);
