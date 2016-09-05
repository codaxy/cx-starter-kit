export function round2(value) {
    //return parseFloat(value.toFixed(2));
    return Math.round(value * 100) / 100;
}
