/// <reference types="cypress" />

//import {go, fillForm, submit, modalContentShouldBe} from '../../pages/SignupPage';

import SignupPage from '../../pages/SignupPage';
import signup from '../../pages/SignupPage';

describe('Cadastro', ()=> { 
  
  beforeEach(function() {
    //Massa de dados para o preenchimento do formulário de cadastro de um novo entregador
    cy.fixture('deliver').then((d)=> {
      this.deliver = d
    })
  })

  it('User should be deliver', function() {  
    //Função para acessar a página do formulário de cadastro de um novo entregador
    signup.go();      
    //Função para o preenchimento do formulário de cadastro do entregador
    signup.fillForm(this.deliver.signup);
    //Função que realiza a ção de clique para envio do formulário de cadastro do entregador
    signup.submit();
    //Função de validação para o modal de confirmação de envio de formulário de cadastro de um novo entregador
    const expectedMessage = 'Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.';
    signup.modalContentShouldBe(expectedMessage);
  })

  it('Incorrect document', function() {
    //Função para acessar a página do formulário de cadastro de um novo entregador
    signup.go();       
    //Função para o preenchimento do formulário de cadastro do entregador
    signup.fillForm(this.deliver.cpf_inv);
    //Função que realiza a ção de clique para envio do formulário de cadastro do entregador
    signup.submit();    
    //Aleta de CPF incorreto
    signup.alertMessageShouldBe('Oops! CPF inválido');
  })

  it('Incorrect email', function() {
    //Função para acessar a página do formulário de cadastro de um novo entregador
    signup.go();       
    //Função para o preenchimento do formulário de cadastro do entregador
    signup.fillForm(this.deliver.email_inv);
    //Função que realiza a ção de clique para envio do formulário de cadastro do entregador
    signup.submit();    
    //Aleta de email incorreto
    signup.alertMessageShouldBe('Oops! Email com formato inválido.');
  })

  //Dessa forma evitamos que quando uma validação falhe o teste não seja abortado e valide as demais.
  //Criamos um contexto para testar campos obrigador, este define uma massa de teste com o nome do campo a ser testado e com a mensagem esperada através da chave output.
  context('Required fields', function(){
    const messages = 
    [
      {field: 'name', output: 'É necessário informar o nome'},
      {field: 'CPF', output: 'É necessário informar o CPF'},
      {field: 'email', output: 'É necessário informar o email'},
      {field: 'postalcode', output: 'É necessário informar o CEP'},
      {field: 'number', output: 'É necessário informar o número do endereço'},
      {field: 'delivery_method', output: 'Selecione o método de entrega'},        
      {field: 'cnh', output: 'Adicione uma foto da sua CNH'}
    ]

    //Será executado uma única vez, para acessar a página e submeter o formulário
    before(function() {
      SignupPage.go();
      SignupPage.submit();
    })

    //Realiza a validação campo por campo
    messages.forEach(function(msg){
      it(`$ {msg.field} is required`, function(){
        SignupPage.alertMessageShouldBe(msg.output);
      })
    })
  })
})