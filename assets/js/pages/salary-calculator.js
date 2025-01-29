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
  moneyMask.mask(document.querySelectorAll('#gross-salary'));


  const grossSalaryInput = document.getElementById("gross-salary");
  const dependentsInput = document.getElementById("dependents");
  const discountsInput = document.getElementById("discounts");
  const calculateButton = document.getElementById("calculate-salary-btn");
  const resultDiv = document.getElementById("salary-result");    

  // Função para limpar a máscara de moeda e converter em número
  const cleanCurrency = (value) => {
    // Remove o prefixo "R$ " e a vírgula
    return parseFloat(value.replace('R$', '').replace('.', '').replace(',', '.'));
  };
  

  function calculateINSS(salary) {
    let discount = 0;

    if (salary <= 1518.00) {
      discount = salary * 0.075;
    } else if (salary <= 2793.88) {
      discount = (1518.00 * 0.075) + ((salary - 1518.00) * 0.09);
    } else if (salary <= 4190.83) {
      discount = (1518.00 * 0.075) + ((2793.88 - 1518.00) * 0.09) + ((salary - 2793.88) * 0.12);
    } else if (salary <= 8157.41) {
      discount = (1518.00 * 0.075) + ((2793.88 - 1518.00) * 0.09) + ((3856.94 - 2793.88) * 0.12) + ((salary - 4190.83) * 0.14);
    } else {
      discount = 877.24; // Teto do INSS em 2025
    }

    return discount;
  }

  function calculateIRPF(salary, dependents) {
      const dependentDeduction = dependents * 189.59; // Dedução por dependente
      const taxableSalary = salary - dependentDeduction;

      let irpf = 0;

      if (taxableSalary <= 2259.20) {
        irpf = 0;
      } else if (taxableSalary <= 2826.65) {
        irpf = taxableSalary * 0.075 - 169.44;        
      } else if (taxableSalary <= 3751) {
        irpf = taxableSalary * 0.15 - 381.44;        
      } else if (taxableSalary <= 4664.68) {
        irpf = taxableSalary * 0.225 - 662.77;        
      } else {
        irpf = taxableSalary * 0.275 - 896;        
      }  
      return irpf > 0 ? irpf : 0;
  }

  calculateButton.addEventListener("click", () => {
     // Obter os valores dos campos de entrada após validação
    let grossSalaryValue = cleanCurrency(grossSalaryInput.value);
    const grossSalary = parseFloat(grossSalaryValue) || 0;
    const dependents = parseInt(dependentsInput.value) || 0;
    const otherDiscounts = parseFloat(discountsInput.value) || 0;

    if (grossSalary <= 0) {
      console.log(grossSalary);
      resultDiv.innerHTML = `<p style="color: red;">Por favor, insira um salário bruto válido.</p>`;
      return;
    }      

    // Cálculo do INSS
    const inss = calculateINSS(grossSalary);

    // Cálculo do IRPF
    const irpf = calculateIRPF(grossSalary - inss, dependents);

    // Salário líquido
    const netSalary = grossSalary - inss - irpf - otherDiscounts;

    // Exibir resultado
    resultDiv.innerHTML = `
      <p class="p">Salário Bruto: R$ ${grossSalary.toFixed(2)}</p>
      <p class="p">Desconto INSS: R$ ${inss.toFixed(2)}</p>
      <p class="p">Desconto IRPF: R$ ${irpf.toFixed(2)}</p>
      <p class="p">Outros Descontos: R$ ${otherDiscounts.toFixed(2)}</p>
      <p ><strong>Salário Líquido: R$ ${netSalary.toFixed(2)}</strong></p>
    `;
  });
});
  