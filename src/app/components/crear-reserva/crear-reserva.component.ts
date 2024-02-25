import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Reserva } from 'src/app/models/reserva';
import { ReservasService } from 'src/app/services/reservas.service';

@Component({
  selector: 'app-crear-reserva',
  templateUrl: './crear-reserva.component.html',
  styleUrls: ['./crear-reserva.component.css']
})
export class CrearReservaComponent implements OnInit {

  reservaForm: FormGroup;
  // titulo = 'Crear Reserva';
  // id: string | null;

  constructor(private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private _reservaService: ReservasService,
    private aRouter: ActivatedRoute) {

    this.reservaForm = this.fb.group({
      nombre:['', [Validators.required, Validators.maxLength(50), Validators.minLength(4)]],
      libro:['', [Validators.required, Validators.maxLength(50), Validators.minLength(4)]]
  })
     }

  ngOnInit(): void {
  }



  
  agregarReserva(){
    
    const RESERVA: Reserva = {
      nombre: this.reservaForm.get('nombre')?.value,
      libro: this.reservaForm.get('libro')?.value,
    }

    console.log(RESERVA);

    this._reservaService.guardarReserva(RESERVA).subscribe(data =>{
      this.toastr.success('La reserva fue creada con exito', 'Reserva Creada');
      this.router.navigate(['listar-reservas']);
    }, error =>{
      console.log(error);
      this.reservaForm.reset();  
    })

  }
  

  
}

