import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Libro } from 'src/app/models/libro';
import { LibrosService } from 'src/app/services/libros.service';

@Component({
  selector: 'app-crear-libro',
  templateUrl: './crear-libro.component.html',
  styleUrls: ['./crear-libro.component.css']
})
export class CrearLibroComponent implements OnInit {
  libroForm: FormGroup;
  titulo = 'Crear Libro';
  id:string | null;

  constructor(private fb: FormBuilder,
              private router: Router,
              private toastr: ToastrService,
              private _libroService: LibrosService,
              private aRouter: ActivatedRoute) {
    this.libroForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(4)]],
      author: ['', [Validators.required, Validators.maxLength(20), Validators.minLength(4)]]
    })
    this.id = this.aRouter.snapshot.paramMap.get('id')
   }

  ngOnInit(): void {
    this.esEditar()
  }

  agregarLibro() {

    const LIBRO: Libro = {
      nombre: this.libroForm.get('nombre')?.value,
      author: this.libroForm.get('author')?.value,
    }

    if (this.id !== null) {
      //editamos el Libro

      this._libroService.editarLibro(this.id, LIBRO).subscribe(data =>{
        this.toastr.info('El libro fue actualizado con exito', 'Libro Actualizado!');
        this.router.navigate(['/']);
      },error =>{
        console.log(error);
        this.toastr.error('Hubo un problema al crear el Libro', 'Fallo al crear');
        this.libroForm.reset();
      })
    }else{
      //agregamos el Libro
    this._libroService.guardarLibro(LIBRO).subscribe(data =>{
      this.toastr.success('El libro fue registrado con exito', 'Libro Registrado!');
      this.router.navigate(['/']);
    }, error =>{
      console.log(error);
      this.toastr.error('Hubo un problema al crear el Libro', 'Fallo al crear');
      this.libroForm.reset();
    })
    }
    
   
  }

  esEditar() {
    if(this.id !== null){
      this.titulo = 'Editar Libro';
      this._libroService.obtenerLibro(this.id).subscribe(data=>{
        this.libroForm.setValue({
          nombre: data.nombre,
          author: data.author,
        })
      })
    }
  }

}

