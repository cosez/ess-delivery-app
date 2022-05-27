Feature: Profile Restaurant
         As Usuário do sistema
         want to visualizar as informações no perfil do restaurante

Scenario: Usuário visualiza horario de funcionamento do restaurante
    Given eu estou na página de perfil do restaurante "Recanto do jô"
    When eu vou até a aba "horarios"
    Then eu vejo "Horario de abertura" e "Horario de Encerramento na tela" 

Scenario: Usuário visualiza metodos de pagamento do restaurante
    Given eu estou na página de perfil do restaurante "Recanto do jô"
    When eu vou até a aba "pagamentos"
    Then eu vejo os "Métodos de pagamento" na tela 

