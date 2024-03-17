# Especificações do Projeto

Esta seção detalha a definição do problema, a ideia de solução a partir da perspectiva do usuário, e estabelece as bases para o desenvolvimento do projeto. Utiliza-se de técnicas de análise e design de experiência do usuário, como a criação de personas e histórias de usuários, para identificar as necessidades e expectativas dos potenciais usuários da solução. Além disso, especifica os requisitos funcionais e não funcionais, e define as restrições sob as quais o projeto deve operar.

## Personas

Persona 1:

Isabella Lima, uma designer gráfica talentosa de 27 anos, está focada em controlar suas despesas para realizar o sonho de adquirir um automóvel. Sua determinação e habilidades criativas a impulsionam a buscar maneiras eficazes de gerenciar suas finanças para alcançar esse objetivo.

Persona 2:

Daniel Oliveira, um jovem de 25 anos, enfrenta o desafio de equilibrar as despesas familiares, quitar dívidas e melhorar sua gestão financeira. Sua dedicação à família e ao futuro de seu filho o motiva a buscar uma maior clareza e controle em suas finanças para garantir a estabilidade e segurança de sua família.

Persona 3:

Matheus Teixeira, um estudante de 21 anos, está determinado a construir uma reserva financeira sólida, compreender o mercado financeiro e realizar seu sonho de viajar para o exterior. Sua juventude e entusiasmo o impulsionam a buscar conhecimento e planejamento financeiro para alcançar seus objetivos.

Persona 4:

Deborah Silva, uma dedicada gerente de Recursos Humanos de 34 anos, enfrenta o desafio de controlar suas despesas, quitar dívidas atrasadas com juros e planejar uma viagem em família. Sua determinação em garantir o bem-estar de sua família a motiva a buscar soluções financeiras eficazes para alcançar seus objetivos.

## Histórias de Usuários

Com base na análise das personas forma identificadas as seguintes histórias de usuários:

|EU COMO... | QUERO/PRECISO ...  |PARA ...                |
|--------------------|------------------------------------|----------------------------------------|
|Isabella Lima| Registrar minhas despesas informando o valor, objetivo e vencimento.          | Economizar dinheiro                          |
|Isabella Lima| Verificar a diferença entre receitas e despesas                               | Conseguir dinheiro para comprar um automóvel |
|Daniel Oliveira| NECESSIDADE A SER SUPRIDA                               | OBJETIVO CUMPRIDO ATRAVÉS DA NECESSIDADE ANTERIOR |
|Daniel Oliveira| NECESSIDADE A SER SUPRIDA                               | OBJETIVO CUMPRIDO ATRAVÉS DA NECESSIDADE ANTERIOR |
|Matheus Teixeira| NECESSIDADE A SER SUPRIDA                               | OBJETIVO CUMPRIDO ATRAVÉS DA NECESSIDADE ANTERIOR |
|Matheus Teixeira| NECESSIDADE A SER SUPRIDA                               | OBJETIVO CUMPRIDO ATRAVÉS DA NECESSIDADE ANTERIOR |
|Deborah Silva| NECESSIDADE A SER SUPRIDA                               | OBJETIVO CUMPRIDO ATRAVÉS DA NECESSIDADE ANTERIOR |
|Deborah Silva| NECESSIDADE A SER SUPRIDA                               | OBJETIVO CUMPRIDO ATRAVÉS DA NECESSIDADE ANTERIOR |



## Requisitos

As tabelas que se seguem apresentam os requisitos funcionais e não funcionais que detalham o escopo do projeto.

### Requisitos Funcionais

|  ID  |                                                   Descrição do Requisito                                                          | Prioridade |
|------|-----------------------------------------------------------------------------------------------------------------------------------|------------|
|RF-001| Permitir que o usuário insira suas receitas e despesas na plataforma                                                              |    ALTA    | 
|RF-002| Garantir que o usuário possa visualizar o saldo resultante de suas operações de forma clara e acessível.                          |    ALTA    | 
|RF-003| Implementar um sistema que permita ao usuário estabelecer e acompanhar metas de gastos, auxiliando na gestão financeira pessoal.  |    ALTA   |
|RF-004| Desenvolver funcionalidade para gerar relatórios financeiros detalhados, oferecendo uma análise abrangente de suas finanças       |    MÉDIA   |
|RF-005| Permitir que o usuário utilize categorias pré-estabelecidas para classificar suas transações.                                     |    MÉDIA   |
|RF-006| Incluir gráficos para que o usuário possa visualizar de forma mais clara suas receitas e despesas ao longo do mês.                |    MÉDIA   |
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

