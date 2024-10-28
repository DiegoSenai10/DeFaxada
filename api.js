// api.js
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const csv = require('csv-parser');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const app = express();
const port = 3000;

const API_KEY = '1234567890abcdef';
const CSV_FILE_PATH = 'funcionarios.csv'; // Caminho do arquivo CSV

app.use(express.json());
app.use(cors());

const authenticateAPIKey = (req, res, next) => {
  const apiKey = req.header('x-api-key');
  if (!apiKey) {
    return res.status(401).json({ message: 'Chave de API ausente.' });
  }
  if (apiKey !== API_KEY) {
    return res.status(403).json({ message: 'Chave de API inválida.' });
  }
  next();
};

app.use(authenticateAPIKey);

app.post('/funcionarios', (req, res) => {
  const { nome, horario_entrada, horario_saida } = req.body;
  const csvWriter = createCsvWriter({
    path: CSV_FILE_PATH,
    header: [
      { id: 'Nome', title: 'Nome' },
      { id: 'Horario_Entrada', title: 'Horario_Entrada' },
      { id: 'Horario_Saida', title: 'Horario_Saida' },
    ],
    append: true,
  });

  csvWriter
    .writeRecords([{ Nome: nome, Horario_Entrada: horario_entrada, Horario_Saida: horario_saida }])
    .then(() => res.status(201).json({ message: 'Funcionário adicionado com sucesso' }))
    .catch((error) => res.status(500).json({ message: 'Erro ao adicionar funcionário', error }));
});

app.get('/funcionarios', (req, res) => {
  const results = [];
  fs.createReadStream(CSV_FILE_PATH)
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => res.status(200).json(results))
    .on('error', (error) => res.status(500).json({ message: 'Erro ao ler o arquivo CSV', error }));
});

app.put('/funcionarios/:nome', (req, res) => {
  const nomeFuncionario = req.params.nome;
  const { horario_entrada, horario_saida } = req.body;

  const results = [];
  fs.createReadStream(CSV_FILE_PATH)
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
      const funcionarioIndex = results.findIndex((f) => f.Nome === nomeFuncionario);
      if (funcionarioIndex === -1) {
        return res.status(404).json({ message: 'Funcionário não encontrado' });
      }
      results[funcionarioIndex].Horario_Entrada = horario_entrada;
      results[funcionarioIndex].Horario_Saida = horario_saida;

      const csvWriter = createCsvWriter({
        path: CSV_FILE_PATH,
        header: [
          { id: 'Nome', title: 'Nome' },
          { id: 'Horario_Entrada', title: 'Horario_Entrada' },
          { id: 'Horario_Saida', title: 'Horario_Saida' },
        ],
      });

      csvWriter.writeRecords(results)
        .then(() => res.status(200).json({ message: 'Funcionário atualizado com sucesso' }))
        .catch((error) => res.status(500).json({ message: 'Erro ao atualizar funcionário', error }));
    })
    .on('error', (error) => res.status(500).json({ message: 'Erro ao ler o arquivo CSV', error }));
});

app.delete('/funcionarios/:nome', (req, res) => {
  const nomeFuncionario = req.params.nome;
  const results = [];

  fs.createReadStream(CSV_FILE_PATH)
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
      const updatedResults = results.filter((f) => f.Nome !== nomeFuncionario);
      if (updatedResults.length === results.length) {
        return res.status(404).json({ message: 'Funcionário não encontrado' });
      }

      const csvWriter = createCsvWriter({
        path: CSV_FILE_PATH,
        header: [
          { id: 'Nome', title: 'Nome' },
          { id: 'Horario_Entrada', title: 'Horario_Entrada' },
          { id: 'Horario_Saida', title: 'Horario_Saida' },
        ],
      });

      csvWriter.writeRecords(updatedResults)
        .then(() => res.status(200).json({ message: 'Funcionário removido com sucesso' }))
        .catch((error) => res.status(500).json({ message: 'Erro ao remover funcionário', error }));
    })
    .on('error', (error) => res.status(500).json({ message: 'Erro ao ler o arquivo CSV', error }));
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
