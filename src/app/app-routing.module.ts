import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//componentes
import { ListarLibrosComponent } from './components/listar-libros/listar-libros.component';
import { CrearLibroComponent } from './components/crear-libro/crear-libro.component';
import { CrearUsuarioComponent } from './components/crear-usuario/crear-usuario.component';
import { ListarUsuariosComponent } from './components/listar-usuarios/listar-usuarios.component';

const routes: Routes = [
  {path: '', component: ListarLibrosComponent},
  {path: 'crear-libro', component: CrearLibroComponent },
  {path: 'editar-libro/:id', component: CrearLibroComponent },
  {path: 'crear-usuario', component: CrearUsuarioComponent  },
  {path: 'listar-usuarios', component: ListarUsuariosComponent  },
  {path: 'editar-usuario/:id', component: CrearUsuarioComponent },
  // {path: 'reservas', component:  },
  {path: '**', redirectTo: '', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
