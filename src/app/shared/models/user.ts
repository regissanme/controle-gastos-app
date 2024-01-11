export class User {
  id: string = '';
  username: string = '';
  name: string = '';
  role: string = '';
  active: boolean = false;
  birthdate: string = '';
  lastAccessAt: string = '';
  token: string = '';

  contructor(
    id: string,
    username: string,
    name: string,
    role: string,
    active: boolean,
    birthdate: string,
    lastAccessAt: string,
    token: string
  ) {
    this.id = id;
    this.username = username;
    this.name = name;
    this.role = role;
    this.active = active;
    this.birthdate = birthdate;
    this.lastAccessAt = lastAccessAt;
    this.token = token;
  }
}


