let format = {
    gas: 0,
    price: 2,
    percent: 2,
    volume: 3,
    usd: 2,
}

export const toFixed = (data, type) => {
    return parseFloat(data).toFixed(format[type]);
}