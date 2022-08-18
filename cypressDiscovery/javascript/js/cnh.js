 function checksAge() {
   var name = document.querySelector('input[name=name]');
   var age = document.querySelector('input[name=age]');   
   
   if(name.value.length == "") {
     alert('Name is a required field!')
     return
    }
    
    if(age.value.length == 0 || age.value.length == "") {
     alert('Age is a required field!')
     return
   }   var ageNum = parseInt(age.value)   
   
   if (ageNum >= 18) {
     alert('Ok, você pode tirar a sua CNH!')
   } else if (ageNum > 4) {
     alert('Você é menor de idade, por enquanto sugiro andar de bike!')
   } else {
     alert('Melhor você tomar leite!!!!')
   }   
 } 