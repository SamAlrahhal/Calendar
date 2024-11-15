export class Birthday {
  constructor(
    public id?: string,
    public firstName: string = '',
    public lastName: string = '',
    public birthdate: Date = new Date(),
    public phoneNumber: string = '',
    public image?: string,
    public belongsTo?: string
  ) {}
}
