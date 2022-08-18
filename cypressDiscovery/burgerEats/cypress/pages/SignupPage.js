///// <reference types="cypress" />

class SignupPage {

    //Função para acessar a página do formulário de cadastro de um novo entregador
    go() {
        cy.viewport(1440, 900);
        cy.visit('https://buger-eats-qa.vercel.app');
        
        cy.get('a[href="/deliver"]').click();
        cy.get('#page-deliver form h1').should('have.text', 'Cadastre-se para  fazer entregas');
    }

    //Função para o preenchimento do formulário de cadastro do entregador
    fillForm(deliver) {
        //Dados
        cy.get('input[name="fullName"]').type(deliver.name);
        cy.get('input[name="cpf"]').type(deliver.cpf);
        cy.get('input[name="email"]').type(deliver.email);
        cy.get('input[name="whatsapp"]').type(deliver.whatsapp);
  
        //Endereço
        cy.get('input[name="postalcode"]').type(deliver.address.postalcode);
        cy.get('input[type="button"][value="Buscar CEP"]').click();
        //cy.get('input[name="address"]')
        //  .type(deliver.address.street, { force: true })
        //  .should("have.value", deliver.address.street);
        //cy.get('input[name="district"]')
        //  .type(deliver.address.district, { force: true })
        //  .should("have.value", deliver.address.district);
        cy.get('input[name="address-number"]').type(deliver.address.number);
        cy.get('input[name="address-details"]').type(deliver.address.details);
        cy.get('input[name="city-uf"]').should(
          "have.value",
          deliver.address.city_state
        );
  
        //Método de entrega
        cy.contains(".delivery-method li", deliver.delivery_method).click();
  
        //upload arquivo CNH
        cy.get('input[accept^="image"]').attachFile("/images/" + deliver.cnh);
    }

    //Função que realiza a ção de clique para envio do formulário de cadastro do entregador
    submit() {
        //Enviar o formulário
        cy.get('form button[type="submit"]').click();
    }

    //Função de validação para o modal de confirmação de envio de formulário de cadastro de um novo entregador
    modalContentShouldBe(expectedMessage) {
        cy.get('.swal2-container .swal2-html-container')
      .should('have.text', expectedMessage);
        //fechamento do modal
        cy.get('button[class="swal2-confirm swal2-styled"]').click();
    }

    //Mensagem de alerta para ao usuário para dados cadastrais incorretos
    alertMessageShouldBe(expectedMessage) {
        //cy.get('span[class="alert-error"]').should('have.text', expectedMessage);
        cy.contains('.alert-error', expectedMessage).should('be.visible');
    }
}

export default new SignupPage;