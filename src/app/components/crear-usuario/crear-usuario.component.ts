import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})
export class CrearUsuarioComponent implements OnInit {
  usuarioForm: FormGroup;
  titulo = 'Crear Usuario';
  id: string | null;

  constructor(private fb: FormBuilder,
              private router: Router,
              private toastr: ToastrService,
              private _usuarioService: UsuarioService,
              private aRouter: ActivatedRoute) {

    this.usuarioForm = this.fb.group({
      nombre:['', [Validators.required, Validators.maxLength(50), Validators.minLength(4)]],
      apellido:['', [Validators.required, Validators.maxLength(50), Validators.minLength(4)]],
      email:['', [Validators.required, Validators.maxLength(30), Validators.minLength(4), Validators.email]]
    })
    //accedemos al id de la ruta para poder editar
    this.id = this.aRouter.snapshot.paramMap.get('id')
   }

  ngOnInit(): void {
    this.esEditar()
  }

  agregarUsuario(){
    const USUARIO : Usuario ={
      nombre: this.usuarioForm.get('nombre')?.value,
      apellido: this.usuarioForm.get('apellido')?.value,
      email: this.usuarioForm.get('email')?.value,
    }

    if (this.id !== null) {
      //editamos Usuario

      this._usuarioService.editarUsuario(this.id, USUARIO).subscribe(data =>{
        this.toastr.info('El usuario fue actualizado con exito', 'Usuario Actualizado!');
        this.router.navigate(['listar-usuarios']);
      }, error =>{
        console.log(error);
        this.toastr.error('ERROR', 'Ocurrio un error no esperado');
        this.usuarioForm.reset();
      })

    } else{
      //agregamos producto
      this._usuarioService.guardarUsuario(USUARIO).subscribe(data =>{
        this.toastr.success('El usuario fue creado con exito', 'Usuario Creado!');
        this.router.navigate(['listar-usuarios']);
      }, error =>{
        console.log(error);
        this.toastr.error('ERROR', 'Ocurrio un error no esperado');
        this.usuarioForm.reset();
      })
    }
    
  }

  //para Revisar el id no sea null
  esEditar() {
    
    if (this.id !== null) {
      this.titulo = 'Editar Producto';
      this._usuarioService.obtenerUsuario(this.id).subscribe(data =>{
        this.usuarioForm.setValue({
          nombre: data.nombre,
          apellido: data.apellido,
          email: data.email
        })
      })
    }

  }

}
