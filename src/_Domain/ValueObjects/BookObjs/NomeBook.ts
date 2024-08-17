class NomeBook {
    private nomeBook: string;
    constructor(nomeBook: string) {
        if (this.validate(nomeBook)) {
            this.nomeBook = nomeBook;
        } else {
            throw new Error(
                "il titolo contiene caratteri non supportati. usare solo lettere, numeri e i seguenti caratteri speciali: '.,!?;:()-]\\' "
            );
        }
    }

    private validate(nomeBook: string): boolean {
        return /^[A-Za-z0-9.,! ?;:()\-]+$/.test(nomeBook);
    }

    public getValue() {
        return this.nomeBook;
    }
}

export default NomeBook;
