export interface IDictionary<TValue> {
	[id: string]: TValue;
}

export interface IBulkReturn {
	apiCallBody: Array<{}>;
	sortedCard: Array<IDictionary<number>>;
}
