# Testes com Playwright

## Pré-requisitos

- Node.js 18 ou superior
- npm

## Instalação

Clone o repositório, entre na pasta do projeto e instale as dependências:

```bash
npm install
npx playwright install chromium
```

O segundo comando instala o navegador usado pela configuração atual do projeto.

## Executando os testes

Executar todos os testes:

```bash
npx playwright test
```

Executar os testes com a interface visual do Playwright:

```bash
npx playwright test --ui
```

Executar um arquivo específico:

```bash
npx playwright test login.spec.ts
```

Executar um teste pelo título:

```bash
npx playwright test -g "Login válido"
```

## Relatório

A suíte utiliza o repórter HTML. Após a execução, abra o relatório com:

```bash
npx playwright show-report
```

Para visualizar o navegador durante a execução:

```bash
npx playwright test --headed
```

## Suíte OrangeHRM Demo

Os fluxos funcionais do OrangeHRM Demo ficam nos arquivos `tests/orange-*.spec.ts`.
Eles usam o ambiente:

`https://opensource-demo.orangehrmlive.com/web/index.php`

Executar somente os testes OrangeHRM:

```bash
npx playwright test tests/orange-auth.spec.ts tests/orange-reset.spec.ts tests/orange-pim.spec.ts
```
