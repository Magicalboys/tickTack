export const jsonToObject = (json) => {
    return JSON.parse(json);
}

export const jsonToArr = (json) => {
    const arr = Object.keys(json).map((item: string) => ({key: item, value: json[item]}))
    return arr;
}
