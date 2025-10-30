create database OS;
use database OS;

CREATE TABLE IF NOT EXISTS ordens_servico (
	id INT AUTO_INCREMENT PRIMARY KEY,
	cliente_nome VARCHAR(255) NOT NULL,
	equipamento VARCHAR(200) NOT NULL,
	descricao_problema TEXT NOT NULL,
	status VARCHAR(50) NOT NULL DEFAULT 'Aberto',
	data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);