document.addEventListener('DOMContentLoaded', function () {
  // Função para exibir os funcionários na tabela
  function exibirFuncionario(id, status, nome, trabalho, email, telefone, horario) {
      const tableBody = document.querySelector('tbody');
      const row = document.createElement('tr');

      row.innerHTML = `
          <td>${id}</td>
          <td><span class="status ${status.toLowerCase()}">${status}</span></td>
          <td>${nome}</td>
          <td>${trabalho}</td>
          <td>${email}</td>
          <td>${telefone}</td>
          <td>${horario}</td>
      `;

      tableBody.appendChild(row);
  }

  // Função para processar o CSV e exibir na tabela
  function processarCSV(csvContent) {
      const linhas = csvContent.split('\n');
      const tableBody = document.querySelector('tbody');

      // Limpar a tabela antes de adicionar novos dados
      tableBody.innerHTML = '';

      linhas.forEach((linha, index) => {
          if (index > 0 && linha.trim() !== '') { // Pular a primeira linha (cabeçalhos) e evitar linhas vazias
              const colunas = linha.split(',');

              const id = colunas[0];
              const status = colunas[1];
              const nome = colunas[2];
              const trabalho = colunas[3];
              const email = colunas[4];
              const telefone = colunas[5];
              const horario = colunas[6];

              exibirFuncionario(id, status, nome, trabalho, email, telefone, horario);
          }
      });
  }

  // Evento ao clicar no botão de importação de CSV
  document.getElementById('importCsvButton').addEventListener('click', function () {
      const inputFile = document.getElementById('csvFileInput').files[0];

      if (inputFile) {
          const reader = new FileReader();

          reader.onload = function (e) {
              const csvContent = e.target.result;
              processarCSV(csvContent);
          };

          reader.readAsText(inputFile);
      } else {
          alert('Por favor, selecione um arquivo CSV!');
      }
  });

  // Função de busca na tabela de funcionários
  const searchBar = document.getElementById('searchBar');
  searchBar.addEventListener('input', function () {
      const searchTerm = searchBar.value.toLowerCase();
      const tableRows = document.querySelectorAll('tbody tr');

      tableRows.forEach(function (row) {
          const rowText = row.textContent.toLowerCase();
          row.style.display = rowText.includes(searchTerm) ? '' : 'none';
      });
  });
});