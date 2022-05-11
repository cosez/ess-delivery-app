import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by } from 'protractor';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

defineSupportCode(function ({ Given, When, Then }) {
    Given(/^que o visitante esteja na página home do sistema$/, {timeout: 100 * 1000}, async () => {
        await browser.get("http://localhost:4200/home");
    });

    When(/^o visitante preencha o campo de pesquisar com o nome "Comida da" e exista um restaurante cadastrado com o nome "Comida da tia"$/, {timeout: 100 * 1000},async () => {
        await element(by.id("search-box")).contains("Comida da");
    });

    When(/^o campo pesquisar está vazio$/, {timeout: 100 * 1000},async () => {
        await element(by.id("search-box")).contains("");
    });

    When(/^ o visitante preencha o campo de pesquisar com o nome "Cinfood"$/, {timeout: 100 * 1000},async () => {
        await element(by.id("search-box")).contains("Cinfood");
    });

    Then(/^aparece campo com resultado da pesquisa$/, {timeout: 100 * 1000},async() => {
        await element(by.tagName("tbody")).isDisplayed();
    })

})
