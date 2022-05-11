Feature: Pesquisa de Restaurantes
As a visitante
I want to pesquisar um restaurante existente

Scenario: Pesquisa rápida de nome bem sucedida de apenas um restaurante
    Given que o visitante esteja na página home do sistema
    When o visitante preencha o campo de pesquisa o nome "Comida da"
    And exista um restaurante cadastrado com o nome "Comida da tia"
    Then aparece campo abaixo com resultado da pesquisa

Scenario: Pesquisa rápida de nome bem sucedida de vários restaurantes
    Given que o visitante esteja na página home do sistema
    When o visitante preencha o campo de pesquisa o nome "Comida"
    And exista dois ou mais restaurantes cadastrados com "Comida" em seu nome
    Then aparece campo abaixo com resultado da pesquisa

Scenario: Pesquisa rápida de nome mal sucedida de restaurante
    Given que o visitante esteja na página home do sistema
    When o visitante preencha o campo de pesquisa o nome "Cinfood"
    And não exista um restaurante cadastrado com "Cinfood" em seu nome
    Then não aparece nenhum campo abaixo com o restaurante

Scenario: Pesquisa filtrada bem sucedida sem preenchimento de filtros
    Given que o visitante esteja na página home do sistema
    When o visitante seleciona a opção Pesquisar
    And exista um ou mais restaurantes cadastrados
    Then aparece tabela abaixo de Listas de Restaurantes com restaurantes pesquisados
    And campos de Listas de Restaurantes preenchidos

Scenario: Pesquisa filtrada bem sucedida com preenchimento de filtro nome
    Given que o visitante esteja na página home do sistema
    When o visitante preencha o campo nome com "Comida da"
    And exista um ou mais restaurantes cadastrados com o nome "Comida da tia"
    And seja selecionada a opção Pesquisar
    Then aparece tabela abaixo de Listas de Restaurantes com resultado da pesquisa
    And campos de Listas de Restaurantes preenchidos

Scenario: Pesquisa filtrada bem sucedida com preenchimento de filtro cidade
    Given que o visitante esteja na página home do sistema
    When o visitante preencha o campo cidade com "Rec"
    And exista um ou mais restaurantes cadastrados na cidades "Recife" e "Recando das Almas"
    And seja selecionada a opção Pesquisar
    Then aparece tabela abaixo de Listas de Restaurantes com resultado da pesquisa
    And campos de Listas de Restaurantes preenchidos
   
Scenario: Pesquisa filtrada bem sucedida com preenchimento de filtro cidade e nome
    Given que o visitante esteja na página home do sistema
    When o visitante preencha o campo cidade com "Rec"
    And o visitante preencha o campo nome com "Pizza"
    And exista um restaurante cadastrado na cidade "Recife"
    And com o nome "Pizzaria"
    And seja selecionada a opção Pesquisar
    Then aparece tabela abaixo de Listas de Restaurantes com resultado da pesquisa
    And campos de Listas de Restaurantes preenchidos

Scenario: Pesquisa filtrada mal sucedida com preenchimento de filtro cidade ou nome
    Given que o visitante esteja na página home do sistema
    When o visitante preencha o campo cidade com "Rec"
    And não exista restaurante cadastrado na cidade "Recife"
    And seja selecionada a opção Pesquisar
    Then aparece abaixo de Listas de Restaurantes com resultado da pesquisa
    And campos de Listas de Restaurantes vazios
