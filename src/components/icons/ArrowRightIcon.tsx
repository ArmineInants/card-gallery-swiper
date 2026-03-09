import React from 'react';

export interface ArrowRightIconProps extends React.SVGProps<SVGSVGElement> {
	color?: string;
}

export const ArrowRightIcon: React.FC<ArrowRightIconProps> = ({
	color = 'white',
	width = 24,
	height = 24,
	...rest
}) => {
	return (
		<svg
			width={width}
			height={height}
			viewBox="0 0 24 24"
			fill={color}
			xmlns="http://www.w3.org/2000/svg"
			{...rest}
		>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M14.7437 11.999L6.90088 22.4137L8.53351 23.582L17.2562 11.999L8.53351 0.416016L6.90088 1.58438L14.7437 11.999Z"
			/>
		</svg>
	);
};

