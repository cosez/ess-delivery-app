Feature: Update Restaurant
As O dono do restaurante
I want to editar as informações da minha conta 

Scenario: Admin edita as informações do restaurante com sucesso
    Given eu estou logado como admin com email "jfs@mail.com" e senha "1Senha1"
    Given eu estou na página de perfil
    When eu entro no modo de edição
    When eu mudo "Nome do Restaurante" para "Restaurante do Bairro"
    When tento salvar as mudanças
    When eu digito a senha "1Senha1" no modal de confirmação 
    Then eu vejo uma mensagem de sucesso

Scenario: Admin edita as informações do restaurante com senha incorreta
    Given eu estou logado como admin com email "jfs@mail.com" e senha "1Senha1"
    Given eu estou na página de perfil
    When eu entro no modo de edição
    When eu mudo "Nome do Restaurante" para "Restaurante do Bairro"
    When tento salvar as mudanças
    When eu digito a senha "1Senha2" no modal de confirmação 
    Then eu vejo uma mensagem de erro

Scenario: Admin edita horario de funcionamento com sucesso 
    Given eu estou logado como admin com email "jfs@mail.com" e senha "1Senha1"
    Given eu estou na página de perfil
    When eu vou até o horário de funcionamento 
    When eu entro no modo de edição
    When eu mudo "Hora de Abrir" para "10:00"
    When eu mudo "Hora de Fechar" para "23:00"
    When tento salvar as mudanças
    When eu digito a senha "1Senha1" no modal de confirmação 
    Then eu vejo uma mensagem de sucesso 

Scenario: Admin edita horario de funcionamento com erro
    Given eu estou logado como admin com email "jfs@mail.com" e senha "1Senha1"
    Given eu estou na página de perfil
    When eu vou até o horário de funcionamento 
    When eu entro no modo de edição
    When eu mudo "Hora de Abrir" para "22:00"
    When eu mudo "Hora de Fechar" para "08:00"
    When tento salvar as mudanças 
    Then eu vejo uma mensagem de erro sobre o horario 

Scenario: Admin edita horario de funcionamento com erro senha incorreta
    Given eu estou logado como admin com email "jfs@mail.com" e senha "1Senha1"
    Given eu estou na página de perfil
    When eu vou até o horário de funcionamento 
    When eu entro no modo de edição
    When eu mudo "Hora de Abrir" para "22:00"
    When eu mudo "Hora de Fechar" para "08:00"
    When tento salvar as mudanças
    When eu digito a senha "1Senha2" no modal de confirmação 
    Then eu vejo uma mensagem de erro

Scenario: Admin edita informações do responsável com sucesso
    Given eu estou logado como admin com email "jfs@mail.com" e senha "1Senha1"
    Given eu estou na página de perfil
    When eu entro no modo de edição
    When eu vou até as informações do responsável 
    When eu mudo "Nome do Responsavel" para "Pedro Henrique"
    When tento salvar as mudanças 
    When eu digito a senha "1Senha1" no modal de confirmação 
    Then eu vejo uma mensagem de sucesso

Scenario: Admin edita informações do responsável com sucesso
    Given eu estou logado como admin com email "jfs@mail.com" e senha "1Senha1"
    Given eu estou na página de perfil
    When eu entro no modo de edição
    When eu vou até as informações do responsável 
    When eu mudo "Nome do Responsavel" para "Pedro Henrique"
    When tento salvar as mudanças 
    When eu digito a senha "1Senha2" no modal de confirmação 
    Then eu vejo uma mensagem de erro 