import React from 'react';

import { ConstrainedWrapper, ConstrainedBoxInner } from './ConstrainedBox.styles';

interface IConstrainedBoxProps {
	wrapperClass?: string;
	boxClass?: string;
	children: React.ReactNode;
	containerMaxWidth: number;
}

export const ConstrainedBox: React.FC<IConstrainedBoxProps> = ({
	children,
	wrapperClass,
	boxClass,
	containerMaxWidth,
}) => {
	return (
		<ConstrainedWrapper className={wrapperClass}>
			<ConstrainedBoxInner className={boxClass} $maxWidth={containerMaxWidth}>
				{children}
			</ConstrainedBoxInner>
		</ConstrainedWrapper>
	);
};
