import { useEffect, useState } from "react";

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

export function isBetween(from: number, to: number, compare: number) {
	return compare >= from && compare <= to;
}

export function stayRange(from: number, to: number, value: number) {
	return Math.min(Math.max(from, value), to);
}
