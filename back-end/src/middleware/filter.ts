// Function to use with Array.prototype.filter();

export const onlyUnique = (value: any, index: number, array: Array<any>) => array.indexOf(value) === index;
