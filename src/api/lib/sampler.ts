function sample<T>(array: Array<T>, size: number): Array<T> {
    if (size >= array.length) {
        return array;
    }

    const randomIndices: Array<number> = [];

    // can get hung here if looking for an allowed index where size >= 1/2*array.length
    while (randomIndices.length < size) {
        const newIndex = Math.ceil(Math.random() * size) - 1;
        if (!randomIndices.includes(newIndex)) {
            randomIndices.push(newIndex);
        }
    }

    const sampledArray = randomIndices.map(
        (randomIndex) => array[randomIndex]
    ) as Array<T>;

    return sampledArray;
}

export { sample };
