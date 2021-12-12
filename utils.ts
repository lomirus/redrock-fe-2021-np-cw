function drawElements<T>(arr: Array<T>, n: number): Array<T> {
    const keys = new Set<number>();
    while(keys.size < n) keys.add(randInt(0, arr.length));
    return arr.filter((_, key) => keys.has(key));
}

function randInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min)) + min
}

export {
    drawElements,
    randInt
}