import React from 'react';

import { IconContainer } from '~/shared/ui/icon-container/icon-container';

interface ChevronDownProps {
    color?: string;
    className?: string;
}

export const CircleQuestion = (props: ChevronDownProps): React.ReactElement => {
    const { className, color = 'black' } = props;

    return (
        <IconContainer className={className}>
            <svg width='100%' height='100%' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path
                    d='M11.967 12.75C12.967 11.75 13.967 11.3546 13.967 10.25C13.967 9.14543 13.0716 8.25 11.967 8.25C11.0351 8.25 10.252 8.88739 10.03 9.75M11.967 15.75H11.977M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z'
                    stroke={color}
                    strokeWidth='2'
                    strokeLinecap='round'
                />
            </svg>
        </IconContainer>
    );
};
