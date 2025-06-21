<p align="center">
  <img src="src/assets/logo_plum.svg" width="160" alt="Logotipo MAIA">
</p>

<h1 align="center">Frontend Web – MAIA</h1>
<p align="center"><em>Interface web da plataforma MAIA – mulher de apoio e informação.</em></p>

---

## 🌐 Sobre o Projeto

Este repositório contém o **frontend em Angular** da plataforma [MAIA]([https://github.com/SEU_USUARIO/maia](https://github.com/Projeto-Maia/Maia-Front)), criada durante o hackathon da **Campus Party 2025** com o tema _"Mulher Mais Segura"_.

A MAIA é uma plataforma que une **educação preventiva** e **acesso à ajuda geolocalizada** para mulheres em situação de violência no Distrito Federal.

A interface foi pensada para ser acolhedora, acessível e responsiva. Todo o conteúdo e decisões visuais foram baseados em diretrizes de segurança digital e empatia no design.

---

## ✨ Funcionalidades

- **Quiz Interativo** com 7 perguntas pedagógicas inspiradas no Formulário FRIDA (CNJ/CNMP).
- **Tela de Resultado** com feedback baseado em red flags identificadas, sem score de risco.
- **Mapa Interativo (Leaflet + OSM)** com filtros por tipo de serviço de apoio.
- **Design Mobile-first** com foco em segurança, legibilidade e leveza.
- **Progressive Web App (PWA Ready)**.
- **Integração via API REST NestJS**.

---

## 🧑‍🎨 Experiência de Usuário (UX)

- **Paleta de Cores Segura e Confortável**: tons suaves de rosa, lilás e azul claro.
- **Tipografia Personalizada**: Work Sans, Montserrat.
- **Feedback visual claro**: uso de ícones, destaques para respostas corretas/red flags.
- **Logo MAIA presente para reforço de marca institucional e acolhimento.**

---

## 🧪 Tecnologias

| Tecnologia        | Descrição |
|-------------------|-----------|
| Angular 20        | Framework principal da aplicação. |
| Angular Material  | Biblioteca de UI utilizada com tema customizado. |
| SCSS              | Estilização com variáveis, mixins e responsividade. |
| Leaflet.js        | Mapa interativo e leve com OpenStreetMap. |
| RxJS              | Observables e reatividade para consumo da API. |
| Vite              | Build otimizado e ambiente de preview local. |
| NestJS (API)      | Backend externo que serve dados para o frontend. |

---

## 🚀 Como Rodar o Projeto

```bash
git clone [https://github.com/Projeto-Maia/Maia-Front.git](https://github.com/Projeto-Maia/Maia-Front.git)
cd maia

npm install
ng serve -o
```

Acesse: [http://localhost:4200](http://localhost:4200)

---

## 🌍 Estrutura de Pastas

```
src/
├── app/
│   ├── core/             # Serviços (API, interfaces, helpers)
│   ├── features/
│   │   ├── home/         # Tela inicial
│   │   ├── quiz/         # Componente do quiz
│   │   ├── results/      # Tela de resultado 
│   │   └── map/          # Tela com mapa de apoio
│   └── assets/
│       └── logo/         # Logotipo MAIA (svg)
├── styles.scss           # Tema global e fontes
└── index.html
```

---

## 📡 Integração com a API

A API NestJS expõe os seguintes endpoints utilizados:

| Método | Endpoint       | Utilização                |
|--------|----------------|---------------------------|
| GET    | `/quiz`        | Perguntas e explicações do quiz |
| GET    | `/locations`   | Dados geolocalizados dos serviços de apoio |

Variável de ambiente:
```env
VITE_API_URL=https://maia-back-production.up.railway.app
```

---

## 📦 Deploy

| Plataforma | Status     |
|------------|------------|
| Netlify    | 🌐 Frontend Web |
| Railway    | 🔌 API Backend  |
| Expo (dev) | 📱 Protótipo mobile (React Native) |

---

## 📍 Equipe

| Nome    | Função             |
|---------|--------------------|
| Erick   | Frontend Developer |
| Arthur  | Backend Developer  |

---

<p align="center">
  Feito com ❤️ para o Hackathon Campus Party 2025
</p>