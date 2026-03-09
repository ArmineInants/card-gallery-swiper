import React from 'react';

export const ExitIcon: React.FC<{ className?: string }> = ({ className }) => {
	return (
		<svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="#4C43A5">
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M12.0001 13.4138L20.293 21.7067L21.7072 20.2925L13.4143 11.9996L21.7072 3.70669L20.293 2.29248L12.0001 10.5854L3.70718 2.29248L2.29297 3.7067L10.5859 11.9996L2.29297 20.2925L3.70718 21.7067L12.0001 13.4138Z"
			/>
		</svg>
	);
};
