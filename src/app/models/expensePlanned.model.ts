export class ExpensePlanned{
    constructor(
    private _id: number,
    private _category: string,
    private _amount: number,
    private _month: number,
    private _year: number,
    private _userId: number
    ){}
    
    public get userId(): number {
        return this._userId;
    }
    public set userId(value: number) {
        this._userId = value;
    }
    public get year(): number {
        return this._year;
    }
    public set year(value: number) {
        this._year = value;
    }
    public get month(): number {
        return this._month;
    }
    public set month(value: number) {
        this._month = value;
    }
    public get amount(): number {
        return this._amount;
    }
    public set amount(value: number) {
        this._amount = value;
    }
    public get category(): string {
        return this._category;
    }
    public set category(value: string) {
        this._category = value;
    }
    public get id(): number {
        return this._id;
    }
    public set id(value: number) {
        this._id = value;
    }
}
