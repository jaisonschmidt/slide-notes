# Configurando Vite para Deploy no GitHub Pages

1. **Edite o arquivo `vite.config.js`**

Adicione a opção `base` com o nome do repositório:

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/slide-notes/', // substitua pelo nome do seu repositório
  plugins: [react()],
})
```

2. **Deploy automático**

O workflow já está configurado para publicar na branch `gh-pages`.

3. **Acesse seu site**

Após o deploy, acesse:
```
https://jaisonschmidt.github.io/slide-notes/
```

---

# Configurando domínio personalizado (opcional)

1. **Adicione um arquivo `CNAME`**

Crie um arquivo chamado `CNAME` dentro da pasta `public/` do projeto com o seu domínio personalizado, por exemplo:
```
meuslides.com.br
```

2. **Configure o domínio no GitHub Pages**

- Vá até as configurações do repositório no GitHub > Pages.
- Em "Custom domain", insira o domínio desejado.
- Siga as instruções do GitHub para configurar os registros DNS do seu domínio (geralmente um registro CNAME apontando para `jaisonschmidt.github.io`).

3. **Confirme a propagação**

Aguarde a propagação do DNS (pode levar algumas horas).

---

Se precisar de ajuda para configurar o DNS do seu domínio, envie o provedor e o domínio que te ajudo com os registros!
