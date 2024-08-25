class NomeBook {
    private nomeBook: string | null;
    constructor(nomeBook: string, method: string) {
        if (this.validate(nomeBook, method)) {
            if (method === "EDIT" && nomeBook === "") {
                this.nomeBook = null;
            } else {
                this.nomeBook = nomeBook;
            }
        } else {
            throw new Error(
                "il titolo contiene caratteri non supportati. usare solo lettere, numeri e i seguenti caratteri speciali: '.,!?;:()-]\\' "
            );
        }
    }

    private validate(nomeBook: string, method: string): boolean | null {
        if (method === "EDIT" && nomeBook === "") {
            return true; /* (this.nomeBook = null); */
        }

        return /^[A-Za-z0-9.,! ?;:()\-]+$/.test(nomeBook);
    }

    public getValue() {
        return this.nomeBook;
    }
}

export default NomeBook;
