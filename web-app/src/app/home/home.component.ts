import { Component, OnInit } from '@angular/core';
import { Restaurante } from '../cadastro/restaurante';
import { CadastroService } from '../cadastro/cadastro.service';
import { AuthenticationService } from '../service/authentication/authentication.service';
import { NgModule } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService, private cadastrosService: CadastroService, private actRoute: ActivatedRoute, private router: Router) { 
  }
    restaurantes: Restaurante[] = [];
    restaurante: Restaurante = new Restaurante();
    resultadoPesquisaNomeDinamica: Restaurante[] = [];
    resultadoPesquisaFiltrada: Restaurante[] = [];

  ngOnInit(): void {
    
    this.restaurante = this.authenticationService.restaurante;
    this.getRestaurantes()
  }
  
  getRestaurantes(): void{
    this.cadastrosService.getRestaurantes().then(response => {
      this.restaurantes = response
    })
    .catch(erro => alert(erro))
  }

  getRestauranteByNameDinamica(nome: string): void{
    this.resultadoPesquisaNomeDinamica = []
    this.cadastrosService.getRestaurantes().then(res => {
      res.forEach(element => {
        if(element.nome_restaurante.toLowerCase().includes(nome.toLowerCase()) && nome != ''){
          this.resultadoPesquisaNomeDinamica.push(element)
        }else if(nome == ''){
          this.resultadoPesquisaNomeDinamica = []
        }
      });
      this.resultadoPesquisaNomeDinamica
  
    })
    .catch(erro => alert(erro))

  }

  getPesquisaFiltrada(nome: string, cidadeRest:string, filter = false): void{
    if(nome == undefined){
      nome = ''
    }if(cidadeRest == undefined){
      cidadeRest = ''
    }
    if (filter == true) {
      this.cadastrosService.getRestaurantes().then(res => {
        res.forEach(element => {
          if(element.nome_restaurante.toLowerCase().includes(nome.toLowerCase()) && element.cidade.toLowerCase().includes(cidadeRest.toLowerCase())){
            this.resultadoPesquisaFiltrada.push(element)
          }
        });
      })
      .catch(erro => alert(erro))
    }
    
    this.resultadoPesquisaFiltrada = []
  }

}
