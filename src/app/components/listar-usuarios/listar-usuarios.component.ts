import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-listar-usuarios',
  templateUrl: './listar-usuarios.component.html',
  styleUrls: ['./listar-usuarios.component.css']
})
export class ListarUsuariosComponent implements OnInit {

  listUsuarios: Usuario[] = []
  constructor(private _usuarioService: UsuarioService,
              private toastr: ToastrService ) { }

  ngOnInit(): void {
    this.obtenerUsuario();
  }

  obtenerUsuario() {
    this._usuarioService.getUsuarios().subscribe(data =>{
      this.listUsuarios = data
    }, error =>{
      console.log(error);
      
    })
  }

  eliminarUsuario(id: any){
    this._usuarioService.eliminarUsuario(id).subscribe(data =>{
      this.toastr.error('El usuario fue eliminado con exito', 'Usuario Eliminado');
      this.obtenerUsuario();
    }, error =>{
      console.log(error);
      this.toastr.error('ERROR', 'Ocurrio un error no esperado');
    })
  }

}
