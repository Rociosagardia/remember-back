import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';

@Controller('usuarios')
export class UsuariosController {
  constructor(private usuarios: UsuariosService) {}

  @Get()
  buscarUsuario() {
    return this.usuarios.findAll();
  }

  @Post()
  agregarUsuario(@Body() body) {
    return this.usuarios.crear(body);
  }

  @Post('login')
  logearUsuario(@Body() body) {
    return this.usuarios.login(body.email, body.contraseña);
  }
}
