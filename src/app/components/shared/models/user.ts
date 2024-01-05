export class User {
  id: string = '';
  username: string = '';
  name: string = '';
  cpf: string = '';
  role: string = '';
  active: boolean = false;
  birthDate: string = '';
  lastAccessAt: string = '';
  token: string = '';

  contructor(
    id: string,
    username: string,
    name: string,
    cpf: string,
    role: string,
    active: boolean,
    birthDate: string,
    lastAccessAt: string,
    token: string
  ) {
    this.id = id;
    this.username = username;
    this.name = name;
    this.cpf = cpf;
    this.role = role;
    this.active = active;
    this.birthDate = birthDate;
    this.lastAccessAt = lastAccessAt;
    this.token = token;
  }
}


