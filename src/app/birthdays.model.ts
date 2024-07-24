export class Birthday {
  constructor(
    public id?: string,
    public firstName: string = '',
    public lastName: string = '',
    public birthdate: Date = new Date()
  ) {}
}
