export class NewCategory {
    constructor(
      private _name: string,
      private _type: string,
      private _userId: number
    ) {}
    
  public get userId(): number {
      return this._userId;
  }
  public set userId(value: number) {
      this._userId = value;
  }
  public get type(): string {
      return this._type;
  }
  public set type(value: string) {
      this._type = value;
  }
  public get name(): string {
      return this._name;
  }
  public set name(value: string) {
      this._name = value;
  }
}