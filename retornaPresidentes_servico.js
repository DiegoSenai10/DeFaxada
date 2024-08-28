import pool from "./conexao.js";

async function executaQuery(conexao, query) {
    
    const resultado_query = await conexao.query(query);

    const resposta = resultado_query[0];

    return resposta;
}

export async function retornaPresidentes() {
    const conexao = await pool.getConnection();
    const query = 'SELECT id, presidente, vice, ano FROM presidentes'

    const presidentes = executaQuery(conexao, query);

    conexao.release();

    return presidentes;
}

export async function retornaPresidentesID(id) {
    const conexao = await pool.getConnection();
    const query = 'SELECT id, presidente, vice, ano FROM presidentes WHERE id = '+id

    const presidentes = executaQuery(conexao, query);

    conexao.release();

    return presidentes;
}

export async function retornaPresidentesAno(ano) {
    const conexao = await pool.getConnection();
    const query = 'SELECT id, presidente, vice, ano FROM presidentes WHERE ano = '+ano

    const presidentes = executaQuery(conexao, query);

    conexao.release();

    return presidentes;
}

export async function retornaPresidentesTime(time) {
    const conexao = await pool.getConnection();
    const query = 'SELECT id, presidente, vice, ano FROM presidentes WHERE presidente = "'+time+'"'

    const presidentes = executaQuery(conexao, query);

    conexao.release();

    return presidentes;
}