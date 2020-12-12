import React from 'react';
import styled from 'styled-components';
import { Row } from 'components/row-column';
import { Text } from 'components/text';
import { colours } from 'design-system/colours';
import { borderSizes } from 'design-system/border-sizes';
import { spacings } from 'design-system/spacings';

const BackgroundWrapper = styled.div`
    background-color: ${ colours.danger2 };
    border-left: ${ borderSizes._7 } solid ${ colours.danger5 };
    border-radius: ${ borderSizes._4 };
`;

const PaddedDiv = styled.div`
    padding: ${ spacings._5 } ${ spacings._7 };
`;

type Props = {
    text: string | JSX.Element
}

export const ErrorMessage = ( p: Props ): JSX.Element => {
    const { text } = p;
    
    return (
        <Row>
            <BackgroundWrapper>
                <PaddedDiv>
                    { typeof text === 'string' 
                        ? <Text colour='dark' size='primary' weight='bold'>{ text }</Text>
                        : text
                    }
                </PaddedDiv>
            </BackgroundWrapper>
        </Row>
    )
};
