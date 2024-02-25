export class Reserva {
    _id?: number;
    nombre: string;
    libro: string;

    constructor(nombre: string, libro: string){
        this.nombre = nombre;
        this.libro = libro;
    }
}