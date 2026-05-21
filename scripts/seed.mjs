import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding demo data...');

  // Usuario
  let usuario = await prisma.usuario.findUnique({ where: { email: 'demo@fromstars3d.com' } });
  if (!usuario) {
    usuario = await prisma.usuario.create({ data: { nome: 'Usuário Demo', email: 'demo@fromstars3d.com', senha: 'demo' } });
    console.log('Created usuario:', usuario.email);
  } else {
    console.log('Usuario already exists:', usuario.email);
  }

  // Material
  let material = await prisma.material.findFirst({ where: { nome: 'PLA Standard' } });
  if (!material) {
    material = await prisma.material.create({ data: { nome: 'PLA Standard', imagem: '/frieren/sample.jpg', descricao: 'PLA padrão para prototipagem', propriedades: '{}', aplicacoes: 'protótipos' } });
    console.log('Created material:', material.nome);
  } else {
    console.log('Material already exists:', material.nome);
  }

  // Produto
  let produto = await prisma.produto.findFirst({ where: { nome: 'Figura Demo' } });
  if (!produto) {
    produto = await prisma.produto.create({ data: { nome: 'Figura Demo', descricao: 'Figura de demonstração', preco: 99.9, imagem: '/frieren/sample.jpg', usuarioId: usuario.id, materialId: material.id } });
    console.log('Created produto:', produto.nome);
  } else {
    console.log('Produto already exists:', produto.nome);
  }

  // Orcamento
  const orcamentoExists = await prisma.orcamento.findFirst({ where: { usuarioId: usuario.id, produtoId: produto.id } });
  if (!orcamentoExists) {
    const orc = await prisma.orcamento.create({ data: { usuarioId: usuario.id, produtoId: produto.id, quantidade: 1, valorTotal: produto.preco, status: 'Pendente' } });
    console.log('Created orcamento id:', orc.id);
  } else {
    console.log('Orcamento already exists for demo user/product');
  }

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
