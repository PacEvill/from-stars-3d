#!/bin/bash
# Script de build para Render

set -o errexit

echo "🚀 Iniciando build para Render..."

# Instalar dependências
echo "📦 Instalando dependências..."
npm ci

# Gerar Prisma Client
echo "🔧 Gerando Prisma Client..."
npx prisma generate

# Executar migrações
echo "🗄️ Executando migrações do banco de dados..."
npx prisma migrate deploy

# Build do Next.js
echo "⚡ Building Next.js..."
npm run build

echo "✅ Build concluído com sucesso!"
