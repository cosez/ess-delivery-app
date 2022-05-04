import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { Restaurante } from '../cadastro/restaurante';
import { CadastroService } from '../cadastro/cadastro.service';
//import { RestaurantesService } from '../../../../server/src/restaurantes-service';

@Component({
  selector: 'app-listaRestaurantes',
  templateUrl: './restlist.component.html',
  styleUrls: ['./restlist.component.scss']
})
export class RestListComponent implements OnInit {
  constructor(private cadastrosService: CadastroService/*, private restaurantesService: RestaurantesService*/){}
  
  restaurantes: Restaurante[] = [];

  ngOnInit(): void {
    this.getRestaurantes();
  }

  getRestaurantes(): void{
    this.cadastrosService.getRestaurantes().then(response => {
      this.restaurantes = response
    })
    .catch(erro => alert(erro))
  }
  getById(restCnpj: String){
    this.cadastrosService.getRestauranteByCNPJ(restCnpj).then(response => {
      
    })
  }/*
  deleteRestaurant(restaurante: Restaurante): void{
    console.log('a')
    let restCnpj = restaurante.cnpj
    this.cadastrosService.deleteRestaurant(restCnpj).then(response => {

      console.log('Rest deletado')
    }), (err) => {
      console.log(err)
    },() => {
      this.getRestaurantes()
    }
  }*/

}
 