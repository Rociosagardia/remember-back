import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuarios } from './usuarios.entity';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuarios)
    private usersRepository: Repository<Usuarios>,
  ) {}

  findAll(): Promise<Usuarios[]> {
    return this.usersRepository.find();
  }

  findOne(rut: string): Promise<Usuarios> {
    return this.usersRepository.findOne({ rut });
  }

  async remove(rut: string): Promise<void> {
    await this.usersRepository.delete({ rut });
  }

  crear(body: any): Promise<any> {
    return this.usersRepository.save(body);
  }

  async login(email: string, contraseña: string) {
    const usuarioLogin = await this.usersRepository.findOne({ email });
    if (contraseña === usuarioLogin.contraseña) {
      return usuarioLogin;
    } else {
      throw new HttpException('usuario o contraseña invalida', 400);
    }
  }
}
