CREATE TABLE Administrador (
    id_admin INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100),
    email VARCHAR(100) NOT NULL UNIQUE,
    senha_hash VARCHAR(255) NOT NULL,
    data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Cliente (
    id_cliente INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha_hash VARCHAR(255) NOT NULL,
    telefone VARCHAR(20) NOT NULL
);

CREATE TABLE Endereco (
    id_endereco INT PRIMARY KEY AUTO_INCREMENT,
    rua VARCHAR(120) NOT NULL,
    numero VARCHAR(20) NOT NULL,
    bairro VARCHAR(100) NOT NULL,
    cidade VARCHAR(100) NOT NULL,
    estado VARCHAR(100) NOT NULL,
    cep VARCHAR(20) NOT NULL,
    complemento VARCHAR(150),
    id_cliente INT NOT NULL,
    FOREIGN KEY (id_cliente) REFERENCES Cliente(id_cliente)
);

CREATE TABLE Status_Pedido (
    id_status INT PRIMARY KEY AUTO_INCREMENT,
    nome_status VARCHAR(50) NOT NULL
);

CREATE TABLE Pedido (
    id_pedido INT PRIMARY KEY AUTO_INCREMENT,
    id_cliente INT NOT NULL,
    data_pedido DATETIME DEFAULT CURRENT_TIMESTAMP,
    tipo ENUM('delivery','retirada') NOT NULL,
    taxa_entrega DECIMAL(10,2),
    valor_total DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    id_endereco INT,
    id_status INT NOT NULL,
    FOREIGN KEY (id_cliente) REFERENCES Cliente(id_cliente),
    FOREIGN KEY (id_endereco) REFERENCES Endereco(id_endereco),
    FOREIGN KEY (id_status) REFERENCES Status_Pedido(id_status)
);

CREATE TABLE Categoria (
    id_categoria INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    descricao VARCHAR(255) NOT NULL
);

CREATE TABLE Item_Cardapio (
    id_item INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(120) NOT NULL,
    descricao VARCHAR(255) NOT NULL,
    preco DECIMAL(10,2) NOT NULL,
    disponibilidade BOOLEAN DEFAULT TRUE NOT NULL,
    id_categoria INT NOT NULL,
    FOREIGN KEY (id_categoria) REFERENCES Categorias(id_categoria)
);

CREATE TABLE Item_Pedido (
    id_item_pedido INT PRIMARY KEY AUTO_INCREMENT,
    id_pedido INT NOT NULL,
    id_item INT NOT NULL,
    quantidade INT NOT NULL,
    preco_unitario DECIMAL(10,2) NOT NULL,
    subtotal DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (id_pedido) REFERENCES Pedidos(id_pedido),
    FOREIGN KEY (id_item) REFERENCES Item_Cardapio(id_item)
);

CREATE TABLE Promocao (
    id_promocao INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(120) NOT NULL,
    descricao VARCHAR(255) NOT NULL,
    desconto DECIMAL(10,2) NOT NULL,
    status BOOLEAN DEFAULT TRUE NOT NULL,
    data_inicio DATE NOT NULL,
    data_fim DATE NOT NULL
);

CREATE TABLE Promocao_Item (
    id_promocao INT NOT NULL,
    id_item INT NOT NULL,
    PRIMARY KEY (id_promocao, id_item),
    FOREIGN KEY (id_promocao) REFERENCES Promocao(id_promocao),
    FOREIGN KEY (id_item) REFERENCES Item_Cardapio(id_item)
);

CREATE TABLE Forma_Pagamento (
    id_pagamento INT PRIMARY KEY AUTO_INCREMENT,
    forma_pagamento VARCHAR(50) NOT NULL
);

CREATE TABLE Pedido_Pagamento (
    id_pedido INT NOT NULL,
    id_pagamento INT NOT NULL,
    valor_pago DECIMAL(10,2),
    troco_para DECIMAL(10,2),
    PRIMARY KEY (id_pedido, id_pagamento),
    FOREIGN KEY (id_pedido) REFERENCES Pedidos(id_pedido),
    FOREIGN KEY (id_pagamento) REFERENCES Forma_Pagamento(id_pagamento)
);
