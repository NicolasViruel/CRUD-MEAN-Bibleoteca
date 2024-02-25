import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Libro } from 'src/app/models/libro';
import { LibrosService } from 'src/app/services/libros.service';

@Component({
  selector: 'app-listar-libros',
  templateUrl: './listar-libros.component.html',
  styleUrls: ['./listar-libros.component.css']
})
export class ListarLibrosComponent implements OnInit {
  listLibros: Libro[] = [];
  mostrarSpinner: boolean = false;

  constructor(private _libroService: LibrosService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.obtenerLibros();
  }

  // Es importante tener en cuenta que este metodo ordenara los libros directamente en el arreglo listLibros
  //  que se muestra en tu plantilla. Si quiero mantener el arreglo original intacto y mostrar
  //  una lista ordenada en la plantilla, podriamos crear un nuevo arreglo ordenado y asignarlo a listLibros en 
  // lugar de ordenar el arreglo original directamente.
  obtenerLibros() {
    this._libroService.getLibros().subscribe(data => {
      this.listLibros = data.sort((a: Libro, b: Libro) => a.nombre.localeCompare(b.nombre));
    }, error => {
      console.log(error);
    });
  }

  eliminarLibro(id: any) {
    if (window.confirm('¿Estás seguro de que deseas eliminar este libro?')) {
      this.mostrarSpinner = true;
  
      this._libroService.eliminarLibros(id).subscribe(data => {
        // Oculta el spinner cuando se realiza la eliminacion
        this.mostrarSpinner = false;
  
        this.toastr.success('El Libro fue eliminado con éxito', 'Libro Eliminado');
        this.obtenerLibros();
      }, error => {
        // En caso de error, oculta el spinner
        this.mostrarSpinner = false;
        console.log(error);
      });
    }
  }

}
