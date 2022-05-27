import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by } from 'protractor';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

defineSupportCode(function ({ Given, When, Then }) {


    When(/^eu estou logado como admin com email "([^\"]*)" e senha "([^\"]*)"$/, async (email, senha) => {
        await browser.get("http://localhost:4200/login");
        await element(by.name("email")).clear();
        await element(by.name("email")).sendKeys(<string> email);
        await element(by.name("password")).clear();
        await element(by.name("password")).sendKeys(<string> senha);
    });
    
    Given(/^eu estou na página de perfil$/, async () => {
        await browser.get("http://localhost:4200/profile");
    });

    When(/^eu entro no modo de edição$/, async () => {
        await element(by.id("buttonEditar")).click();
    })

    When(/^eu vou até o horário de funcionamento$/, async () => {
        await element(by.name("buttonTab1")).click();
    })

    When(/^eu vou até as informações do responsável$/, async () => {
        await element(by.name("buttonTab3")).click();
    })

    When(/^eu mudo "([^\"]*)" para "([^\"]*)"$/, async (field, content) => {
        await element(by.name(<string> field)).clear();
        await element(by.name(<string> field)).sendKeys(<string> content);
    });

    When(/^eu digito a senha "([^\"]*)" no modal de confirmação$/, async (senha) => {
        await element(by.name("Senha Modal")).clear();
        await element(by.name("Senha Modal")).sendKeys(<string> senha);
        await element(by.name("buttonContinuarModal")).click();
    });

    When(/^tento salvar as mudanças$/, async () => {
        await element(by.name("buttonSalvar")).click();
    })

    Then(/^eu vejo uma mensagem de sucesso$/, async() => {
        await element(by.className("success_popup")).isDisplayed();
    })

    Then(/^eu vejo uma mensagem de erro sobre o horario$/, async() => {
        await element(by.name("mensagem horario")).isDisplayed();
    })

    Then(/^eu vejo uma mensagem de erro$/, async() => {
        await element(by.className("erro_senha")).isDisplayed();
    })



})