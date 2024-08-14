export const checkBodyStructure = (bodyFromRequest: object, expectedBody: object): boolean => {
    const receivedKeys = Object.keys(bodyFromRequest);
    console.log(receivedKeys);
    const expectedkeys = Object.keys(expectedBody);
    console.log(expectedkeys);

    // i due arr contenenti il body atteso e ricevuto non hanno stessa lunghezza, sicuro non sono uguali.
    if (receivedKeys.length !== expectedkeys.length) {
        return false;
    }

    for (const key of receivedKeys) {
        if (!expectedkeys.includes(key)) {
            return false;
        }
    }

    return true;
};
