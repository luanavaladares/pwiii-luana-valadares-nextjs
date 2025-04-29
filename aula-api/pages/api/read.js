// pages/api/read.js
import { createConnection } from 'mysql2/promise';

//Função para conectar no MySQL
async function connectToDatabase() {
    return createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'teste-api',
    });
}

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Metodo não permitido' });
    }

    try{
        //Conexão no MysQL
        const connection = await connectToDatabase();

        //execução da query para receber dados da tabela "user"
        const [rows] = await connection.execute('SELECT * FROM users WHERE id = 1', );

        //verificar se o usuario existe
        if (rows.lenght === 0) {
            return res.status(404).json({ error: 'usuario não encontrado '}); 
        }

        //fechar a conexão
        await connection.end();

        //resposta com os dados do usuario
        res.status(200).json(rows);
    } catch (error) {
        console.error('erro de conexão com o banco: ', error);
        res.status(500).json({ error: 'erro interno de servidor' });
    }
}