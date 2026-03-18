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

export function patchObject(oldObject: { [key: string]: any }, update: object) {
	for (const [key, value] of Object.entries(update)) {
		if (oldObject[key] !== undefined && oldObject[key] != value) {
			console.log(key, oldObject[key], "=>", value);
			oldObject[key] = value;
		}
	}
	return oldObject;
}

export function toNumber(string: string) {
	return Number(string);
}

export function clamp(from: number, to: number, value: number) {
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
