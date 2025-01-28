// Função para gerar um CNPJ válido
function gerarCNPJ(semMascara = false) {
  const randomDigits = () => Math.floor(Math.random() * 9);

  // Gerar os 12 primeiros dígitos
  const cnpjBase = Array.from({ length: 12 }, randomDigits);

  // Função para calcular os dígitos verificadores
  const calcularDigito = (base) => {
    const multiplicadores = base.length === 12
      ? [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
      : [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

    const soma = base.reduce((acc, num, i) => acc + num * multiplicadores[i], 0);
    const resto = soma % 11;

    return resto < 2 ? 0 : 11 - resto;
  };

  // Calcular os dígitos verificadores
  const digito1 = calcularDigito(cnpjBase);
  const digito2 = calcularDigito([...cnpjBase, digito1]);

  // Retornar o CNPJ completo
  const cnpj = [...cnpjBase, digito1, digito2].join('');
  return semMascara
    ? cnpj
    : cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5');
}

// Função para validar um CNPJ
function validarCNPJ(cnpj) {
  const cnpjLimpo = cnpj.replace(/\D/g, '');
  if (cnpjLimpo.length !== 14) return false;

  const base = cnpjLimpo.slice(0, 12).split('').map(Number);
  const digito1 = Number(cnpjLimpo[12]);
  const digito2 = Number(cnpjLimpo[13]);

  const calcularDigito = (base) => {
    const multiplicadores = base.length === 12
      ? [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
      : [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

    const soma = base.reduce((acc, num, i) => acc + num * multiplicadores[i], 0);
    const resto = soma % 11;

    return resto < 2 ? 0 : 11 - resto;
  };

  return digito1 === calcularDigito(base) && digito2 === calcularDigito([...base, digito1]);
}

// Adicionar eventos
document.addEventListener('DOMContentLoaded', () => {
  const btnGerar = document.getElementById('generate-cnpj-btn');
  const btnValidar = document.getElementById('validate-cnpj-btn');
  const resultContainer = document.getElementById('cnpj-result');
  const validationResult = document.getElementById('validation-result');
  const cnpjInput = document.getElementById('cnpj-input');
  const checkBoxSemMascara = document.getElementById('generate-without-mask');

  // Gerar CNPJ
  btnGerar.addEventListener('click', () => {
    const semMascara = checkBoxSemMascara.checked;
    const cnpj = gerarCNPJ(semMascara);
    resultContainer.innerHTML = `
      <div>
        <span>${cnpj}</span>
        <button class="copy-btn">Copiar</button>
      </div>
    `;

    // Copiar para a área de transferência
    const copyBtn = resultContainer.querySelector('.copy-btn');
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(cnpj).then(() => {
        
      });
    });
  });

  // Validar CNPJ
  btnValidar.addEventListener('click', () => {
    const cnpj = cnpjInput.value;
    const isValid = validarCNPJ(cnpj);
    validationResult.textContent = isValid ? 'CNPJ válido!' : 'CNPJ inválido!';
    validationResult.style.color = isValid ? 'green' : 'red';
  });


  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove a classe 'active' de todas as abas e botões
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));

      // Adiciona a classe 'active' à aba e ao botão clicado
      const tab = button.getAttribute('data-tab');
      button.classList.add('active');
      document.getElementById(`${tab}-id`).classList.add('active');
    });
  });

});

