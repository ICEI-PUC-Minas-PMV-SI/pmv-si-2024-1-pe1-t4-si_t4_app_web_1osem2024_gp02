# Especificações do Projeto

<span style="color:red">Pré-requisitos: <a href="1-Documentação de Contexto.md"> Documentação de Contexto</a></span>

Definição do problema e ideia de solução a partir da perspectiva do usuário. É composta pela definição do  diagrama de personas, histórias de usuários, requisitos funcionais e não funcionais além das restrições do projeto.

Apresente uma visão geral do que será abordado nesta parte do documento, enumerando as técnicas e/ou ferramentas utilizadas para realizar a especificações do projeto

## Personas

Pedro Paulo tem 26 anos, é arquiteto recém-formado e autônomo. Pensa em se desenvolver profissionalmente através de um mestrado fora do país, pois adora viajar, é solteiro e sempre quis fazer um intercâmbio. Está buscando uma agência que o ajude a encontrar universidades na Europa que aceitem alunos estrangeiros.

Enumere e detalhe as personas da sua solução. Para tanto, baseie-se tanto nos documentos disponibilizados na disciplina e/ou nos seguintes links:

> **Links Úteis**:
> - [Rock Content](https://rockcontent.com/blog/personas/)
> - [Hotmart](https://blog.hotmart.com/pt-br/como-criar-persona-negocio/)
> - [O que é persona?](https://resultadosdigitais.com.br/blog/persona-o-que-e/)
> - [Persona x Público-alvo](https://flammo.com.br/blog/persona-e-publico-alvo-qual-a-diferenca/)
> - [Mapa de Empatia](https://resultadosdigitais.com.br/blog/mapa-da-empatia/)
> - [Mapa de Stalkeholders](https://www.racecomunicacao.com.br/blog/como-fazer-o-mapeamento-de-stakeholders/)
>
Lembre-se que você deve ser enumerar e descrever precisamente e personalizada todos os clientes ideais que sua solução almeja.

## Histórias de Usuários

Com base na análise das personas forma identificadas as seguintes histórias de usuários:

|EU COMO... `PERSONA`| QUERO/PRECISO ... `FUNCIONALIDADE` |PARA ... `MOTIVO/VALOR`                 |
|--------------------|------------------------------------|----------------------------------------|
|Usuário do sistema  | Registrar minhas tarefas           | Não esquecer de fazê-las               |
|Administrador       | Alterar permissões                 | Permitir que possam administrar contas |

Apresente aqui as histórias de usuário que são relevantes para o projeto de sua solução. As Histórias de Usuário consistem em uma ferramenta poderosa para a compreensão e elicitação dos requisitos funcionais e não funcionais da sua aplicação. Se possível, agrupe as histórias de usuário por contexto, para facilitar consultas recorrentes à essa parte do documento.

> **Links Úteis**:
> - [Histórias de usuários com exemplos e template](https://www.atlassian.com/br/agile/project-management/user-stories)
> - [Como escrever boas histórias de usuário (User Stories)](https://medium.com/vertice/como-escrever-boas-users-stories-hist%C3%B3rias-de-usu%C3%A1rios-b29c75043fac)
> - [User Stories: requisitos que humanos entendem](https://www.luiztools.com.br/post/user-stories-descricao-de-requisitos-que-humanos-entendem/)
> - [Histórias de Usuários: mais exemplos](https://www.reqview.com/doc/user-stories-example.html)
> - [9 Common User Story Mistakes](https://airfocus.com/blog/user-story-mistakes/)

## Requisitos

As tabelas que se seguem apresentam os requisitos funcionais e não funcionais que detalham o escopo do projeto.

### Requisitos Funcionais

|  ID  |                                                   Descrição do Requisito                                                          | Prioridade |
|------|-----------------------------------------------------------------------------------------------------------------------------------|------------|
|RF-001| Permitir que o usuário insira suas receitas e despesas na plataforma                                                              |    ALTA    | 
|RF-002| Garantir que o usuário possa visualizar o saldo resultante de suas operações de forma clara e acessível.                          |    ALTA    | 
|RF-003| Implementar um sistema que permita ao usuário estabelecer e acompanhar metas de gastos, auxiliando na gestão financeira pessoal.  |    MÉDIA   |
|RF-004| Desenvolver funcionalidade para gerar relatórios financeiros detalhados, oferecendo uma análise abrangente de suas finanças       |    MÉDIA   |
|RF-005| Permitir que o usuário utilize categorias pré-estabelecidas para classificar suas transações.                                     |    BAIXA   |
|RF-006| Incluir gráficos para que o usuário possa visualizar de forma mais clara suas receitas e despesas ao longo do mês.                |    BAIXA   |
|RF-007| Implementar a capacidade de utilizar IA para analisar relatórios e fornecer insights personalizados aos usuários.                 |    BAIXA   |


### Requisitos não Funcionais

|ID     | Descrição do Requisito  |Prioridade |
|-------|-------------------------------------------------------------------------------------------------------------------------------|-------|
|RNF-001| O sistema deve ser compatível com diversos navegadores de internet para garantir uma experiência consistente para os usuários.| ALTA  | 
|RNF-002| As requisições do usuário devem ser processadas de forma eficiente, mantendo um tempo de resposta adequado para as operações. | MÉDIA | 
|RNF-003| O sistema deve ser responsivo, adaptando-se de forma adequada para funcionar de maneira eficaz em dispositivos móveis.        | BAIXA | 

## Restrições

O projeto está restrito pelos itens apresentados na tabela a seguir.

|ID| Restrição                                             |
|--|-------------------------------------------------------|
|01| O projeto deve ser concluído até o término do semestre acadêmico. |
|02| Não deverá ser utilizado frameworks para o desenvolvimento de front-end além de bootstrap. |
|03| Não deverá ser utilizado frameworks complexos para o desenvolvimento de back-end, apenas local storage e firebase serão permitidos. |

