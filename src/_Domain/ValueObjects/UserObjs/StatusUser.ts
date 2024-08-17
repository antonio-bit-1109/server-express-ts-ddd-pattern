class StatusUser {
    private status: boolean;
    constructor(status: boolean) {
        if (typeof status !== "boolean") {
            throw new Error("status deve essere un valore true o false.");
        }

        this.status = status;
    }

    getValue(): boolean {
        return this.status;
    }
}

export default StatusUser;
