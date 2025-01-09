# RespondeAI
## _Aplicação Web vinculada a Inteligência Artificial com a finalidade de ajudar profissionais de saúde a executar consultas de forma rápida de informações relevantes e verídicas de doenças emergentes com foco na Mpox_

Projeto em desenvolvimento por alunos da Universidade Virtual do Estado de São Paulo - UNIVESP matriculados na disciplina PJI240 - Projeto Integrador em Computação II.

## Grupo 10.

- Carla Frezarin da Silva Talhati
- Douglas Andrade Fernandes
- Elisandra Márcia Rodrigues
- Jackson Andson de Medeiros
- Pablo Miguel dos Santos Andrade
- Tiago José Schiabelli
- Rubens Antônio Rodrigues
- Wallerya Sanally Nobrega Ventura

## Funcionalidades

- Consultas
- Cadastro de conhecimento
- Cadastro de usuário
- Treinamento da IA vinculada

## Como Usar

### Requisitos

Antes de executar o projeto, você precisa ter o **Docker** instalado e configurado no seu sistema. Se não tiver o Docker instalado, siga as instruções oficiais: [Instalação do Docker](https://docs.docker.com/get-docker/).

### Execução

1. **Criar um banco de dados**

Para a aplicação funcionar corretamente, é necessário criar uma base de dados com a estrutura definida abaixo. Execute os seguintes comandos no seu PostgreSQL: 

```sql
CREATE TABLE public.kuser (
	id serial4 NOT NULL,
	username varchar NOT NULL,
	useremail varchar NOT NULL,
	"password" varchar NULL,
	CONSTRAINT kuser_pkey PRIMARY KEY (id),
	CONSTRAINT kuser_useremail_key UNIQUE (useremail),
	CONSTRAINT kuser_username_key UNIQUE (username)
);

CREATE TABLE public.knowledge (
	id serial4 NOT NULL,
	subject varchar NOT NULL,
	information text NOT NULL,
	token_count int4 NOT NULL,
	kuser_id int4 NOT NULL,
	CONSTRAINT knowledge_pkey PRIMARY KEY (id)
);

ALTER TABLE public.knowledge ADD CONSTRAINT knowledge_kuser_id_fkey FOREIGN KEY (kuser_id) REFERENCES public.kuser(id);


CREATE TABLE public.knowledge_formated (
	id serial4 NOT NULL,
	token_count int4 NOT NULL,
	resized text NOT NULL,
	embeddings text NULL,
	is_created bool NULL,
	knowledge_id int4 NOT NULL,
	CONSTRAINT knowledge_formated_pkey PRIMARY KEY (id)
);

ALTER TABLE public.knowledge_formated ADD CONSTRAINT knowledge_formated_knowledge_id_fkey FOREIGN KEY (knowledge_id) REFERENCES public.knowledge(id);
```

2. **Rodando a aplicação com Docker**

Para rodar a aplicação utilizando o Docker, siga os passos abaixo:

**Passo 1. Baixar a imagem do Docker:**

   Se você ainda não tiver a imagem localmente, use o seguinte comando para baixá-la:

   ```bash
   docker pull rubensanrodrigues/respondeai:1.0
   ```


**Passo 2. Executar o contêiner:**

Para iniciar a aplicação, execute o seguinte comando:

   ```bash
   docker run -it -d -p 80:80 \
   -e SECRET_KEY="minha-secret-key" \
   -e ALGORITHM=HS256 \
   -e SQLALCHEMY_DATABASE_URI=postgresql://dbuser:dbpass@localhost:5432/meudb \
   -e OPENAI_KEY="open-api-key" \
   rubensanrodrigues/respondeai:1.0
   ```

**Parâmetros:**

- `SECRET_KEY="minha-secret-key"`: Defina uma chave secreta para a aplicação.
- `ALGORITHM=HS256`: Especifique o algoritmo para criptografia (por exemplo, `HS256`).
- `SQLALCHEMY_DATABASE_URI=postgresql://dbuser:dbpass@localhost:5432/meudb`: A URL de conexão com o banco de dados PostgreSQL (ajuste conforme o seu ambiente de banco de dados).
- `OPENAI_KEY="open-api-key"`: A chave de API para a integração com o OpenAI (substitua pela sua chave real).

**Esse comando irá:**
- Rodar a aplicação em segundo plano (`-d`).
- Mapear a porta **80** do contêiner para a porta **80** do seu host.
- Iniciar a aplicação com as variáveis de ambiente necessárias para o funcionamento correto.

3. **Acessando a aplicação:**

Após executar o comando acima, você pode acessar a aplicação no navegador através do seguinte endereço:

`http://localhost`