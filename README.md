# Teste Técnico - Central de Aprovações

Este projeto implementa uma central de aprovação com busca, seleção e ações em massa, usando Nuxt 3, Pinia, Tailwind CSS e Nuxt UI.

## Stack utilizada

- [Nuxt 3](https://nuxt.com/)
- [Pinia](https://pinia.vuejs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Nuxt UI ](https://ui.nuxt.com/)

## Decisões técnicas e observações

- **Separação de responsabilidades**: Componentes e store separados de forma clara para facilitar manutenção.
- **Persistência local**: Os dados são salvos no localStorage simulando uma API offline.
- **Ações em massa**: Implementado com feedback visual, confirmação via modal e tratamento de loading.

---
## Funcionalidades implementadas
- [x] Listagem de aprovações pendentes.
- [x] Ação em massa: botão **"Aprovar Selecionados"**.
- [x] Mudança de status do item para `APPROVED` após aprovação.
- [x] Modal de confirmação para aprovação em massa.
- [x] Badge com cor condicional: verde (aprovado), cinza (pendente).
- [x] Filtro de busca.
- [x] Persistência com `localStorage`
>

## Como rodar

```bash
git clone https://github.com/bungaantonio/central-aprovacoes.git
cd central-aprovacoes
npm install
npm run dev
```

## Estrutura
`Uma estrutura modular que me permite manter e atualizar o aplicativo`
```
components/
├── ApprovalItem.vue
├── SearchBox.vue
├── BulkApproveModal.vue

pages/
└── index.vue

stores/
├── approvalService.ts
├── mockApprovals.ts
└── approvals.ts
```
