import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { forkJoin } from 'rxjs';
import { Reserva } from 'src/app/models/reserva';
import { ReservasService } from 'src/app/services/reservas.service';

@Component({
  selector: 'app-crear-reserva',
  templateUrl: './crear-reserva.component.html',
  styleUrls: ['./crear-reserva.component.css']
})
export class CrearReservaComponent implements OnInit {

  reservaForm: FormGroup;

  constructor(private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private _reservaService: ReservasService,
    private aRouter: ActivatedRoute) {

    this.reservaForm = this.fb.group({
      nombre:['', [Validators.required, Validators.maxLength(50), Validators.minLength(4)]],
      libro:['', [Validators.required, Validators.maxLength(50), Validators.minLength(4)]],
      fechaCreacion:['', Validators.required],
      devuelto:['']
  })
     }

  ngOnInit(): void {
  }

  agregarReserva() {
    const usuarioNombre = this.reservaForm.get('nombre')?.value;
    const libroNombre = this.reservaForm.get('libro')?.value;

    forkJoin([
        this._reservaService.obtenerIdUsuarioPorNombre(usuarioNombre),
        this._reservaService.obtenerIdLibroPorNombre(libroNombre)
    ]).subscribe(
        ([responseUsuario, responseLibro]) => {
            
            const idUsuario = responseUsuario.idUsuario;
            const idLibro = responseLibro.idLibro;

            const usuarioObj = { _id: idUsuario, nombre: usuarioNombre, apellido: '' };
            const libroObj = { _id: idLibro, nombre: libroNombre, author: '' };

            const nuevaReserva: Reserva = {
                usuario_id: usuarioObj,
                libro_id: libroObj,
                fechaCreacion: this.reservaForm.get('fechaCreacion')?.value,
                devuelto: this.reservaForm.get('devuelto')?.value
            };

            // Validacion: Verificar si el libro ya está reservado por otro usuario
            this._reservaService.verificarLibroReservado(libroObj._id).subscribe(
                (reservaExistente) => {
                    if (reservaExistente) {
                        this.toastr.error('Este libro ya está reservado por otro usuario', 'Error');
                    } else {
                        // Validacion: Verificar el limite de 5 libros por usuario
                        this._reservaService.traerReservasUsuario(usuarioObj._id).subscribe(
                            (reservasUsuario) => {
                                if (reservasUsuario.length >= 5) {
                                    this.toastr.error('El usuario ya tiene reservados 5 libros', 'Error');
                                } else {
                                    // Crear la reserva
                                    this._reservaService.guardarReserva(nuevaReserva).subscribe(
                                        data => {
                                            this.toastr.success('La reserva fue creada con éxito', 'Reserva Creada');
                                            this.router.navigate(['listar-reservas']);
                                        },
                                        error => {
                                            console.log(error);
                                            this.toastr.error('Error al guardar la reserva', 'Error');
                                        }
                                    );
                                }
                            },
                            error => {
                                console.error('Error al obtener las reservas del usuario:', error);
                            }
                        );
                    }
                },
                error => {
                    console.error('Error al verificar si el libro está reservado:', error);
                }
            );
        },
        error => {
            console.error('Error al obtener IDs:', error);
        }
    );
}

}


