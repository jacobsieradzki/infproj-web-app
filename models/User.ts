
export class User {

  public id: string;
  public username: string;
  public email: string;
  public first_name: string;
  public last_name: string;

  constructor(json: any) {
    let o: User = json;
    return o;
  }

}

export default User