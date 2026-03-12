import { useCallback, useEffect, useRef, useState } from "react";

export function useData<T>(callback: (...args: any[]) => Promise<T>, ...args: any[]): T {
	const [data, setData] = useState(null as T);
	useEffect(() => {
		let ignore = false;
		if (ignore) return;
		callback(...args).then((json) => {
			setData(json);
		});
		ignore = true;
	}, [callback]);
	return data;
}

export function useLongPress(
	onLongPress: () => void,
	onClick: () => void,
	{ shouldPreventDefault = true, delay = 300 } = {},
) {
	const [longPressTriggered, setLongPressTriggered] = useState(false);
	const timeout = useRef<number>(undefined);
	const target = useRef<HTMLElement>(undefined);

	const start = useCallback(
		(event: React.UIEvent) => {
			if (shouldPreventDefault && event.target) {
				(event.target as HTMLElement).addEventListener("touchend", preventDefault, { passive: false });
				target.current = event.target as HTMLElement;
			}
			timeout.current = setTimeout(() => {
				onLongPress();
				setLongPressTriggered(true);
			}, delay);
		},
		[onLongPress, delay, shouldPreventDefault],
	);

	const clear = useCallback(
		(event: React.UIEvent, shouldTriggerClick = true) => {
			timeout.current && clearTimeout(timeout.current);
			shouldTriggerClick && !longPressTriggered && onClick();
			setLongPressTriggered(false);
			if (shouldPreventDefault && target.current) {
				(target.current as HTMLElement).removeEventListener("touchend", preventDefault);
			}
		},
		[shouldPreventDefault, onClick, longPressTriggered],
	);

	return {
		onMouseDown: (e: React.MouseEvent) => start(e),
		onTouchStart: (e: React.TouchEvent) => start(e),
		onMouseUp: (e: React.MouseEvent) => clear(e),
		onMouseLeave: (e: React.MouseEvent) => clear(e, false),
		onTouchEnd: (e: React.TouchEvent) => clear(e),
	};
}

const preventDefault = (event: TouchEvent) => {
	if (event.touches.length < 2 && event.preventDefault) {
		event.preventDefault();
	}
};

export function toNumber(string: string) {
	return Number(string);
}

export function stayRange(from: number, to: number, value: number) {
	return Math.min(Math.max(from, value), to);
}

export function isOverlapping(a: HTMLElement, b: HTMLElement) {
	const aBound = a.getBoundingClientRect();
	const bBound = b.getBoundingClientRect();

	return !(
		aBound.right < bBound.left ||
		aBound.left > bBound.right ||
		aBound.bottom < bBound.top ||
		aBound.top > bBound.bottom
	);
}

export function getLocalPosition(screenClick: [x: number, y: number], element: HTMLElement): [x: number, y: number] {
	const elementDimension = element.getBoundingClientRect();
	const xlocal = screenClick[0] - elementDimension.x;
	const ylocal = screenClick[1] - elementDimension.y;

	return [xlocal, ylocal];
}

export function isParent(child: HTMLElement, parent: HTMLElement) {
	const childParent = child.parentElement;

	if (childParent && childParent == parent) return true;
	else if (!childParent || childParent == document.getRootNode()) return false;
	else return isParent(childParent, parent);
}

export function shuffle(array: any[]) {
	return array
		.map((value) => ({ value, sort: Math.random() }))
		.sort((a, b) => a.sort - b.sort)
		.map(({ value }) => value);
}
