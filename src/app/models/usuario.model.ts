export class Usuario {

  static instanceFirebase({userId, nombre, email}) {
    return new Usuario(userId, nombre, email);
  }

  constructor(
    public userId: string,
    public nombre: string,
    public email: string
  ) {
  }
}
