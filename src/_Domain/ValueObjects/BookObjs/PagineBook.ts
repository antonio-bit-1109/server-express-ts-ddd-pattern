class PagineBook {
    private pagine: number | null;
    constructor(pagine: number, method: string) {
        this.pagine = this.checkIsNumber(pagine, method);
    }

    private checkIsNumber(pagine: number, method: string) {
        if (method === "EDIT") {
            if (pagine === 0) {
                return (this.pagine = null);
            }
        }

        if (Number.isFinite(pagine)) {
            return pagine;
        } else {
            throw new Error("il valore fornito per pagine non è un numero.");
        }
    }

    public getValue() {
        return this.pagine;
    }
}

export default PagineBook;
