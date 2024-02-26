import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Reserva } from 'src/app/models/reserva';
import { ReservasService } from 'src/app/services/reservas.service';

@Component({
  selector: 'app-listar-reserva',
  templateUrl: './listar-reserva.component.html',
  styleUrls: ['./listar-reserva.component.css']
})
export class ListarReservaComponent implements OnInit {
  listReservas: Reserva[] = [];


  constructor(private _reservaService: ReservasService,
              private toastr: ToastrService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.obtenerReservas()
  }


  obtenerReservas(){
    this._reservaService.getReservas().subscribe(data =>{
      console.log(data);
      this.listReservas = data;
    }, error =>{
      console.log(error);
      
    })
  }

  eliminarReserva(id: any){
    if (window.confirm('¿Estás seguro de que deseas eliminar este libro?')) {
    this._reservaService.eliminarReserva(id).subscribe(data =>{
      this.toastr.error('La reserva fue eliminada con exito', 'Reserva Eliminada');
      this.obtenerReservas();
    }, error =>{
      console.log(error);
      
    })
  }
}

}
