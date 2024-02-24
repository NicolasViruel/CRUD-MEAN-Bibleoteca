export class Libro {
    _id?: number;
    nombre: string;
    author: string;

    constructor(nombre: string, author: string){
        this.nombre = nombre;
        this.author = author;
    }
}