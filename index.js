import { retornaPresidentes, retornaPresidentesAno, retornaPresidentesID, retornaPresidentesTime} from './servico/retornaPresidentes_servico.js';

import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());

app.listen(9000, async () => {
    const data = new Date();
    console.log("Servidor node iniciado em: "+data);
})

app.get('/presidentes', async (req, res) => {
    let presidentes;

    const ano = req.query.ano;
    const time = req.query.time;

    if(typeof ano === 'undefined' && typeof time === 'undefined') {
        presidentes = await retornaPresidentes();
    } 
    else if (typeof ano !== 'undefined') {
        presidentes = await retornaPresidentesAno(ano);
    } 
    else if (typeof time !== 'undefined') {
        presidentes = await retornaPresidentesTime(time);
    }

    if(presidentes.length > 0) {
        res.json(presidentes);
    } else {
        res.status(404).json({mensagem: "Nenhum presidentes encontrado"})
    }
});

app.get('/presidentes/:id', async (req, res) => {
    const id = req.params.id;
     
    const presidente = await retornaPresidentesID(id);

    if(presidente.length > 0) {
        res.json(presidente);
    } else {
        res.status(404).json({mensagem: "Nenhum presidente encontrado"})
    }
});