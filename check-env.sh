#!/bin/bash
# Script para verificar se todas as variáveis de ambiente necessárias estão configuradas

echo "🔍 Verificando variáveis de ambiente..."

error=0

# Verificar DATABASE_URL
if [ -z "$DATABASE_URL" ]; then
    echo "❌ DATABASE_URL não está configurada"
    error=1
else
    echo "✅ DATABASE_URL está configurada"
fi

# Verificar NEXTAUTH_SECRET
if [ -z "$NEXTAUTH_SECRET" ]; then
    echo "❌ NEXTAUTH_SECRET não está configurada"
    error=1
else
    echo "✅ NEXTAUTH_SECRET está configurada"
fi

# Verificar NEXTAUTH_URL
if [ -z "$NEXTAUTH_URL" ]; then
    echo "⚠️  NEXTAUTH_URL não está configurada (configure após o primeiro deploy)"
else
    echo "✅ NEXTAUTH_URL está configurada: $NEXTAUTH_URL"
fi

# Verificar NODE_VERSION
if [ -z "$NODE_VERSION" ]; then
    echo "⚠️  NODE_VERSION não está configurada (usará versão padrão do Render)"
else
    echo "✅ NODE_VERSION está configurada: $NODE_VERSION"
fi

echo ""
if [ $error -eq 0 ]; then
    echo "✅ Todas as variáveis obrigatórias estão configuradas!"
    exit 0
else
    echo "❌ Algumas variáveis obrigatórias estão faltando. Configure-as antes do deploy."
    exit 1
fi
