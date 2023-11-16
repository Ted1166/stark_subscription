import { shortString } from "starknet"
import { BigNumber } from "bignumber.js"


export function isDarkMode(colorscheme) {
    return colorscheme === 'dark' ? true : false
}

export function limitChars(str, count, show_dots) {
    if (count <= str.length) {
        return `${str.substring(0, count)} ${show_dots ? '...' : ''}`
    }
    return str
}

export function bigintToShortStr(bigintstr) {
    if (!bigintstr) return ""
    const bn = BigNumber(bigintstr)
    const hex_sentence = `0x` + bn.toString(16)

    return shortString.decodeShortString(hex_sentence)
}

export function convertToReadableTokens(tokens, decimals) {
    if (!tokens || !decimals) return ""
    return new BigNumber(tokens).dividedBy(10 ** decimals).toNumber().toFixed(6)
}

export function bigintToLongStrAddress(bigintstr) {
    if (!bigintstr) return ""
    const bn = BigNumber(bigintstr)
    const hex_sentence = `0x` + bn.toString(16)
    return hex_sentence;
}

export function bnCompare(bn, b) {
    return BigNumber(bn).toString() === b
}

export function timeStampToDate(timestamp) {
    if(!timestamp) return null
    const timestampInMilliseconds = timestamp * 1000;
    const date = new Date(timestampInMilliseconds);
    return date;
}


export function getTwoAddressLetters(address){
    if (!address) return "0x"
    return  address?.substring(0, 4).substring(2, 4) ?? "0x"
}

export const encoder = (str) => {
    return shortString.encodeShortString(str);
}