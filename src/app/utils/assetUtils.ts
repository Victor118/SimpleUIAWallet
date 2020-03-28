const lookupPrecision = {
    "BTC": 8,
    "BNB": 8
};

export function humanReadableFloat(satoshis, precision) {
    return satoshis / Math.pow(10, precision)
}

export function blockchainReadableAmount(satoshis, precision):number {
     let result = satoshis * Math.pow(10, precision);
     return Math.trunc(result);

}

export function formatAsset(satoshis, symbol, precision = null, addSymbol = true) {
    if (precision == null) {
        precision = lookupPrecision[symbol];
    }
    if (!addSymbol) {
        symbol = "";
    } else {
        symbol = " " + symbol;
    }
    if (!precision) {
        return satoshis + "sat of" + symbol;
    } else {
        return humanReadableFloat(satoshis, precision).toFixed(precision) + symbol;
    }
}
