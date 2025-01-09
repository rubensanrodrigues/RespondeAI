# RespondeAI
## _Aplicação Web vinculada a Inteligência Artificial com a finalidade de ajudar profissionais de saúde executar consultas de forma rápida de informações relevantes e verídicas de doenças emergentes com foco na Mpox_

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

Para rodar a aplicação utilizando o Docker, siga as instruções abaixo:

1. **Baixe a imagem do Docker:**

   Se você ainda não tiver a imagem localmente, use o seguinte comando para baixá-la:

   ```bash
   docker pull rubensanrodrigues/respondeai:1.0
   ```


2. **Execute o contêiner:**

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

Esse comando irá:
- Rodar a aplicação em segundo plano (`-d`).
- Mapear a porta **80** do contêiner para a porta **80** do seu host.
- Iniciar a aplicação com as variáveis de ambiente necessárias para o funcionamento correto.


3. **Acessando a aplicação:**

Após executar o comando acima, você pode acessar a aplicação no navegador através do seguinte endereço:

`http://localhost`