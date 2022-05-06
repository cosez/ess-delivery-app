import { Component, OnInit } from '@angular/core';
import { Restaurante } from '../cadastro/restaurante';
import { CadastroService } from '../cadastro/cadastro.service';
import { AuthenticationService } from '../service/authentication/authentication.service';
import { NgModule } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService, private cadastrosService: CadastroService) { }
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

  getPesquisaFiltrada(nome: string, cidadeRest:string): void{

    if (nome == undefined){
      nome = ''
    }if (cidadeRest == undefined){
      cidadeRest = ''
    }
    if (nome != '' && cidadeRest != '') {
      this.cadastrosService.getRestaurantes().then(res => {
        res.forEach(element => {
          if(element.nome_restaurante.toLowerCase().includes(nome.toLowerCase()) && element.cidade.toLowerCase().includes(cidadeRest.toLowerCase())){
            this.resultadoPesquisaFiltrada.push(element)
          }
        });
        console.log(this.resultadoPesquisaFiltrada)
      })
      .catch(erro => alert(erro))
    }else if (nome != '' && cidadeRest == '') {
      this.cadastrosService.getRestaurantes().then(res => {
        res.forEach(element => {
          if(element.nome_restaurante.toLowerCase().includes(nome.toLowerCase())){
            this.resultadoPesquisaFiltrada.push(element)
          }
        });
        console.log(this.resultadoPesquisaFiltrada)
      })
      .catch(erro => alert(erro))
    }else if (nome == '' && cidadeRest != '') {
      this.cadastrosService.getRestaurantes().then(res => {
        res.forEach(element => {
          if(element.cidade.toLowerCase().includes(cidadeRest.toLowerCase())){
            this.resultadoPesquisaFiltrada.push(element)
          }
        });
        console.log(this.resultadoPesquisaFiltrada)
      })
      .catch(erro => alert(erro))
    }
    this.resultadoPesquisaFiltrada = []
  }

}
 
/*
getRestauranteByName(nome: string): void{
  if (nome != '') {
    this.cadastrosService.getRestaurantes().then(res => {
      res.forEach(element => {
        if(element.nome_restaurante.toLowerCase().includes(nome.toLowerCase())){
          this.resultadoPesquisaNome.push(element)
        }
      });
    })
    .catch(erro => alert(erro))
  }
  this.resultadoPesquisaNome = []
}
*/