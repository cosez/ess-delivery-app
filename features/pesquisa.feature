Feature: Pesquisa de Restaurantes
As a visitante
I want to pesquisar um restaurante existente

Scenario: Pesquisa rápida de nome bem sucedida de apenas um restaurante
    Given que o visitante esteja na página home do sistema
    When o visitante preencha o campo de pesquisa o nome "Comida da"
    And exista um restaurante cadastrado com o nome "Comida da tia"
    Then campos de Listas de Restaurantes são filtrados

Scenario: Pesquisa rápida de nome bem sucedida de vários restaurantes
    Given que o visitante esteja na página home do sistema
    When o visitante preencha o campo de pesquisa o nome "Comida"
    And exista dois ou mais restaurantes cadastrados com "Comida" em seu nome
    Then aparece campos de Listas de Restaurantes são filtrados

Scenario: Pesquisa rápida de nome mal sucedida de restaurante
    Given que o visitante esteja na página home do sistema
    When o visitante preencha o campo de pesquisa o nome "Cinfood"
    And não exista um restaurante cadastrado com "Cinfood" em seu nome
    Then aparece campos filtrados de Listas de Restaurantes com nenhum restaurante
