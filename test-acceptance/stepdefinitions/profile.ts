import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by } from 'protractor';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

defineSupportCode(function ({ Given, When, Then }) {

    Given(/^eu estou na página de perfil do restaurante "Recanto do jô"$/, async () => {
        await browser.get("http://localhost:4200/profile");

    });

    When(/^eu vou até a aba "horarios"$/, async (aba) => {
        await element(by.id("horarios")).click();
    })
    When(/^eu vou até a aba "pagamentos"$/, async (aba) => {
        await element(by.id("pagamentos")).click();
    })

    Then(/^eu vejo os "Métodos de pagamento" na tela$/, async ()=>{
        await element(by.id("Nome do Restaurante")).isDisplayed();
    })
    Then(/^eu vejo "Horario de abertura" e "Horario de Encerramento na tela"$/, async ()=>{
        await element(by.id("Hora de Abrir")).isDisplayed();
        await element(by.id("Hora de Fechar")).isDisplayed();

    })
})