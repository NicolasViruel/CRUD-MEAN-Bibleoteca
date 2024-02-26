export class Reserva {
    _id?: string;
    usuario_id: {
      _id: string;
      nombre: string;
      apellido: string;
    };
    libro_id: {
      _id: string;
      nombre: string;
      author: string;
    };
    fechaCreacion: string;
    devuelto: boolean;
  
    constructor(
      usuario_id: { _id: string; nombre: string; apellido: string },
      libro_id: { _id: string; nombre: string; author: string },
      fechaCreacion: string,
      devuelto: boolean
    ) {
      this.usuario_id = usuario_id;
      this.libro_id = libro_id;
      this.fechaCreacion = fechaCreacion;
      this.devuelto = devuelto;
    }
  }

// export class Reserva {
//   _id?: number;
//   usuario_id: string;  // Cambiado de objeto a string
//   libro_id: string;    // Cambiado de objeto a string
//   fechaCreacion: string;
//   devuelto: boolean;

//   constructor(
//     usuario_id: string,  // Cambiado de objeto a string
//     libro_id: string,    // Cambiado de objeto a string
//     fechaCreacion: string,
//     devuelto: boolean
//   ) {
//     this.usuario_id = usuario_id;
//     this.libro_id = libro_id;
//     this.fechaCreacion = fechaCreacion;
//     this.devuelto = devuelto;
//   }
// }