import React, { useEffect } from 'react';

export enum EWindowEvent {
	click = 'click',
	scroll = 'scroll',
	mousedown = 'mousedown',
	resize = 'resize',
	orientationchange = 'orientationchange',
}

interface WindowHandlerProps {
	event: EWindowEvent;
	callback: (e: any) => void;
}

export const WindowHandler: React.FC<WindowHandlerProps> = ({ event, callback }) => {
	useEffect(() => {
		const handler = callback;

		window.addEventListener(event, handler);

		return () => {
			window.removeEventListener(event, handler);
		};
	}, [event, callback]);

	return null;
};
