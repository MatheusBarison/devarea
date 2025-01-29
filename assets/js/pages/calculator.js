document.addEventListener("DOMContentLoaded", function () {
  // Máscara para Valor Inicial e Aporte Mensal (R$ 1.000,00)
  var moneyMask = new Inputmask('numeric', {
    prefix: 'R$ ',
    groupSeparator: '.',
    alias: 'numeric',
    digits: 2,
    radixPoint: ',',
    autoGroup: true,
    rightAlign: false,
    clearMaskOnLostFocus: true,
    removeMaskOnSubmit: true // Remove a máscara ao submeter o valor
  });

  // Aplica a máscara nos campos de Valor Inicial e Aporte Mensal
  moneyMask.mask(document.querySelectorAll('#principal, #monthly'));
});
  
  document.getElementById("calculate").addEventListener("click", function () {
    // Obter os valores dos campos de entrada
    const principal = document.getElementById("principal");
    const monthly = document.getElementById("monthly");
    const rate = document.getElementById("rate");
    const time = document.getElementById("time");
  
    const rateType = document.getElementById("rate-type");
    const timeType = document.getElementById("time-type");
  
    // Validar os campos obrigatórios
    let valid = true;
  
    // Função para validar os campos
    const validateInput = (input, input2) => {
      if (input.value.trim() === "" && input2.value.trim() === "") {
        input.classList.add("error");
        input2.classList.add("error");
        valid = false;
      } else {
        input.classList.remove("error");
        input2.classList.remove("error");
      }
    };
  
    // Validando todos os inputs obrigatórios
    validateInput(principal, monthly);
    validateInput(rate, rate);
    validateInput(time, time);
  
    // Se a validação falhar, não prosseguir
    if (!valid) {
      return;
    }
  
    // Função para limpar a máscara de moeda e converter em número
    const cleanCurrency = (value) => {
      // Remove o prefixo "R$ " e a vírgula      
      if(value == ''){
        return 0;
      }else{
        return parseFloat(value.replace('R$', '').replace('.', '').replace(',', '.'));       
      }
    };
  
    // Obter os valores dos campos de entrada após validação
    let principalValue = cleanCurrency(principal.value);
    let monthlyValue = cleanCurrency(monthly.value);
    let rateValue = parseFloat(rate.value);
    let timeValue = parseInt(time.value);
  
    const rateTypeValue = rateType.value; // "monthly" ou "yearly"
    const timeTypeValue = timeType.value; // "months" ou "years"
  
    // Ajustar a taxa de juros e o período de tempo
    if (timeTypeValue === "years") {
      timeValue = timeValue * 12; // Converte anos para meses
    }
    
    if (rateTypeValue === "yearly") {
      rateValue = rateValue / 12; // Converte a taxa anual para mensal
    }
  
    // Cálculo do montante final
    const compoundInterest = principalValue * Math.pow(1 + rateValue / 100, timeValue); // Juros compostos sobre o valor inicial
    const monthlyContribution = monthlyValue * ((Math.pow(1 + rateValue / 100, timeValue) - 1) / (rateValue / 100)); // Aportes mensais
    const total = compoundInterest + monthlyContribution;
  
  
    // Exibir os resultados nos cards    
    document.getElementById("total-value").innerHTML = `R$ ${total.toFixed(2)}`;
    document.getElementById("total-invested").innerHTML = `R$ ${(principalValue + monthlyValue * timeValue).toFixed(2)}`;
    document.getElementById("total-interest").innerHTML = `R$ ${(total - (principalValue + monthlyValue * timeValue)).toFixed(2)}`;
  });
  
  