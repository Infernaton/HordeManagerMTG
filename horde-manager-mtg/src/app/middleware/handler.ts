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
