class PagineBook {
    private pagine: number;
    constructor(pagine: number) {
        this.pagine = this.checkIsNumber(pagine);
    }

    private checkIsNumber(pagine: number) {
        if (Number.isFinite(pagine)) {
            return pagine;
        } else {
            throw new Error("il valore fornito per pagine non è un numero.");
        }
    }
}

export default PagineBook;
