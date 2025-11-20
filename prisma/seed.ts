import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...');

  // Limpar dados existentes (em ordem de dependência)
  await prisma.itemAdicional.deleteMany();
  await prisma.itemPedido.deleteMany();
  await prisma.historicoPedido.deleteMany();
  await prisma.pedido.deleteMany();
  await prisma.endereco.deleteMany();
  await prisma.produtoGrupoAdicional.deleteMany();
  await prisma.adicional.deleteMany();
  await prisma.grupoAdicional.deleteMany();
  await prisma.produto.deleteMany();
  await prisma.categoria.deleteMany();
  await prisma.usuario.deleteMany();
  await prisma.empresa.deleteMany();
  await prisma.permissao.deleteMany();

  console.log('✅ Dados antigos removidos');

  // 1. Criar Permissões
  const permissaoAdminGlobal = await prisma.permissao.create({
    data: {
      id: 1,
      nome: 'admin_global',
      descricao: 'Administrador global do sistema (dono do software)',
    },
  });

  const permissaoAdminRestaurante = await prisma.permissao.create({
    data: {
      id: 2,
      nome: 'admin_restaurante',
      descricao: 'Administrador do restaurante (dono do restaurante)',
    },
  });

  const permissaoFuncionarioRestaurante = await prisma.permissao.create({
    data: {
      id: 3,
      nome: 'funcionario_restaurante',
      descricao: 'Funcionário do restaurante (acesso limitado)',
    },
  });

  console.log('✅ Permissões criadas');

  // 2. Criar Empresas (Restaurantes)
  const empresa1 = await prisma.empresa.create({
    data: {
      cnpj: '12345678000190',
      razaoSocial: 'Burger House Ltda',
      nomeFantasia: 'Burger House',
      telefone: '11987654321',
      email: 'contato@burgerhouse.com',
      endereco: 'Rua das Flores',
      numero: '123',
      bairro: 'Centro',
      cidade: 'São Paulo',
      uf: 'SP',
      cep: '01310100',
      taxaEntrega: 8.50,
      tempoMedioEntrega: 40,
      horarioAbertura: '18:00',
      horarioFechamento: '23:00',
      ativo: true,
    },
  });

  const empresa2 = await prisma.empresa.create({
    data: {
      cnpj: '98765432000180',
      razaoSocial: 'Pizzaria Bella Napoli Ltda',
      nomeFantasia: 'Pizzaria Bella Napoli',
      telefone: '11912345678',
      email: 'contato@bellanapoli.com',
      endereco: 'Avenida Paulista',
      numero: '1000',
      bairro: 'Bela Vista',
      cidade: 'São Paulo',
      uf: 'SP',
      cep: '01310200',
      taxaEntrega: 10.00,
      tempoMedioEntrega: 50,
      horarioAbertura: '18:30',
      horarioFechamento: '00:00',
      ativo: true,
    },
  });

  console.log('✅ Empresas criadas');

  // 3. Criar Usuários
  const hashedPassword = await bcrypt.hash('123456', 10);

  const adminGlobal = await prisma.usuario.create({
    data: {
      empresaId: empresa1.id,
      nome: 'Admin Global',
      email: 'admin@climbdelivery.com',
      senha: hashedPassword,
      telefone: '11900000000',
      cpf: '00000000000',
      permissaoId: permissaoAdminGlobal.id,
      ativo: true,
    },
  });

  const adminRestaurante1 = await prisma.usuario.create({
    data: {
      empresaId: empresa1.id,
      nome: 'Carlos Silva - Dono Burger House',
      email: 'dono@burgerhouse.com',
      senha: hashedPassword,
      telefone: '11987654321',
      cpf: '12345678901',
      permissaoId: permissaoAdminRestaurante.id,
      ativo: true,
    },
  });

  const adminRestaurante2 = await prisma.usuario.create({
    data: {
      empresaId: empresa2.id,
      nome: 'Giuseppe Romano - Dono Bella Napoli',
      email: 'dono@bellanapoli.com',
      senha: hashedPassword,
      telefone: '11912345678',
      cpf: '98765432100',
      permissaoId: permissaoAdminRestaurante.id,
      ativo: true,
    },
  });

  const funcionario1 = await prisma.usuario.create({
    data: {
      empresaId: empresa1.id,
      nome: 'João Silva - Funcionário',
      email: 'joao@burgerhouse.com',
      senha: hashedPassword,
      telefone: '11999887766',
      cpf: '11122233344',
      permissaoId: permissaoFuncionarioRestaurante.id,
      ativo: true,
    },
  });

  const funcionario2 = await prisma.usuario.create({
    data: {
      empresaId: empresa2.id,
      nome: 'Maria Santos - Funcionária',
      email: 'maria@bellanapoli.com',
      senha: hashedPassword,
      telefone: '11988776655',
      cpf: '22233344455',
      permissaoId: permissaoFuncionarioRestaurante.id,
      ativo: true,
    },
  });

  console.log('✅ Usuários criados');

  // 4. Criar Endereços
  const endereco1 = await prisma.endereco.create({
    data: {
      usuarioId: funcionario1.id,
      titulo: 'Casa',
      cep: '01310100',
      logradouro: 'Rua das Palmeiras',
      numero: '456',
      bairro: 'Jardins',
      cidade: 'São Paulo',
      uf: 'SP',
      referencia: 'Próximo ao mercado',
      principal: true,
    },
  });

  const endereco2 = await prisma.endereco.create({
    data: {
      usuarioId: funcionario2.id,
      titulo: 'Trabalho',
      cep: '01310200',
      logradouro: 'Avenida Brigadeiro',
      numero: '789',
      bairro: 'Centro',
      cidade: 'São Paulo',
      uf: 'SP',
      referencia: 'Edifício comercial',
      principal: true,
    },
  });

  console.log('✅ Endereços criados');

  // 5. Criar Categorias
  const categoriaBurgers = await prisma.categoria.create({
    data: {
      empresaId: empresa1.id,
      nome: 'Burgers',
      descricao: 'Nossos deliciosos hambúrgueres artesanais',
      ordem: 1,
      ativo: true,
    },
  });

  const categoriaBebidas = await prisma.categoria.create({
    data: {
      empresaId: empresa1.id,
      nome: 'Bebidas',
      descricao: 'Bebidas geladas e refrescantes',
      ordem: 2,
      ativo: true,
    },
  });

  const categoriaPizzas = await prisma.categoria.create({
    data: {
      empresaId: empresa2.id,
      nome: 'Pizzas Tradicionais',
      descricao: 'Pizzas clássicas da casa',
      ordem: 1,
      ativo: true,
    },
  });

  console.log('✅ Categorias criadas');

  // 6. Criar Grupos de Adicionais
  const grupoPontoCarne = await prisma.grupoAdicional.create({
    data: {
      empresaId: empresa1.id,
      nome: 'Ponto da Carne',
      descricao: 'Escolha o ponto da carne',
      minimo: 1,
      maximo: 1,
      obrigatorio: true,
      tipoPrecificacao: 'somatorio',
      ordem: 1,
      ativo: true,
    },
  });

  const grupoAdicionais = await prisma.grupoAdicional.create({
    data: {
      empresaId: empresa1.id,
      nome: 'Adicionais',
      descricao: 'Adicione ingredientes extras',
      minimo: 0,
      maximo: 5,
      obrigatorio: false,
      tipoPrecificacao: 'somatorio',
      ordem: 2,
      ativo: true,
    },
  });

  const grupoBordas = await prisma.grupoAdicional.create({
    data: {
      empresaId: empresa2.id,
      nome: 'Bordas',
      descricao: 'Escolha a borda da pizza',
      minimo: 0,
      maximo: 1,
      obrigatorio: false,
      tipoPrecificacao: 'somatorio',
      ordem: 1,
      ativo: true,
    },
  });

  console.log('✅ Grupos de adicionais criados');

  // 7. Criar Adicionais
  await prisma.adicional.createMany({
    data: [
      // Ponto da Carne
      {
        grupoAdicionalId: grupoPontoCarne.id,
        nome: 'Mal Passada',
        preco: 0,
        ordem: 1,
        ativo: true,
      },
      {
        grupoAdicionalId: grupoPontoCarne.id,
        nome: 'Ao Ponto',
        preco: 0,
        ordem: 2,
        ativo: true,
      },
      {
        grupoAdicionalId: grupoPontoCarne.id,
        nome: 'Bem Passada',
        preco: 0,
        ordem: 3,
        ativo: true,
      },
      // Adicionais
      {
        grupoAdicionalId: grupoAdicionais.id,
        nome: 'Bacon',
        preco: 4.00,
        ordem: 1,
        ativo: true,
      },
      {
        grupoAdicionalId: grupoAdicionais.id,
        nome: 'Queijo Extra',
        preco: 3.50,
        ordem: 2,
        ativo: true,
      },
      {
        grupoAdicionalId: grupoAdicionais.id,
        nome: 'Cebola Caramelizada',
        preco: 2.50,
        ordem: 3,
        ativo: true,
      },
      {
        grupoAdicionalId: grupoAdicionais.id,
        nome: 'Ovo',
        preco: 2.00,
        ordem: 4,
        ativo: true,
      },
      // Bordas
      {
        grupoAdicionalId: grupoBordas.id,
        nome: 'Borda Catupiry',
        preco: 8.00,
        ordem: 1,
        ativo: true,
      },
      {
        grupoAdicionalId: grupoBordas.id,
        nome: 'Borda Cheddar',
        preco: 8.00,
        ordem: 2,
        ativo: true,
      },
    ],
  });

  console.log('✅ Adicionais criados');

  // 8. Criar Produtos
  const burger1 = await prisma.produto.create({
    data: {
      empresaId: empresa1.id,
      categoriaId: categoriaBurgers.id,
      nome: 'X-Bacon',
      descricao: 'Hambúrguer artesanal 180g, bacon crocante, queijo cheddar, alface, tomate',
      preco: 28.90,
      disponivel: true,
      destaque: true,
      ordem: 1,
    },
  });

  const burger2 = await prisma.produto.create({
    data: {
      empresaId: empresa1.id,
      categoriaId: categoriaBurgers.id,
      nome: 'X-Tudo',
      descricao: 'Hambúrguer 180g, bacon, queijo, presunto, ovo, alface, tomate, milho',
      preco: 32.90,
      disponivel: true,
      destaque: true,
      ordem: 2,
    },
  });

  const bebida1 = await prisma.produto.create({
    data: {
      empresaId: empresa1.id,
      categoriaId: categoriaBebidas.id,
      nome: 'Coca-Cola 350ml',
      descricao: 'Refrigerante gelado',
      preco: 6.00,
      disponivel: true,
      ordem: 1,
    },
  });

  const pizza1 = await prisma.produto.create({
    data: {
      empresaId: empresa2.id,
      categoriaId: categoriaPizzas.id,
      nome: 'Pizza Margherita',
      descricao: 'Molho de tomate, mussarela, tomate, manjericão',
      preco: 45.00,
      disponivel: true,
      destaque: true,
      ordem: 1,
    },
  });

  const pizza2 = await prisma.produto.create({
    data: {
      empresaId: empresa2.id,
      categoriaId: categoriaPizzas.id,
      nome: 'Pizza Calabresa',
      descricao: 'Molho de tomate, mussarela, calabresa, cebola',
      preco: 48.00,
      disponivel: true,
      ordem: 2,
    },
  });

  console.log('✅ Produtos criados');

  // 9. Associar Grupos de Adicionais aos Produtos
  await prisma.produtoGrupoAdicional.createMany({
    data: [
      { produtoId: burger1.id, grupoAdicionalId: grupoPontoCarne.id, ordem: 1 },
      { produtoId: burger1.id, grupoAdicionalId: grupoAdicionais.id, ordem: 2 },
      { produtoId: burger2.id, grupoAdicionalId: grupoPontoCarne.id, ordem: 1 },
      { produtoId: burger2.id, grupoAdicionalId: grupoAdicionais.id, ordem: 2 },
      { produtoId: pizza1.id, grupoAdicionalId: grupoBordas.id, ordem: 1 },
      { produtoId: pizza2.id, grupoAdicionalId: grupoBordas.id, ordem: 1 },
    ],
  });

  console.log('✅ Grupos associados aos produtos');

  // 10. Criar Pedidos de Exemplo
  const pedido1 = await prisma.pedido.create({
    data: {
      empresaId: empresa1.id,
      usuarioId: funcionario1.id,
      enderecoId: endereco1.id,
      numero: 'PED-001',
      status: 'entregue',
      subtotal: 28.90,
      taxaEntrega: 8.50,
      total: 37.40,
      formaPagamento: 'pix',
      tempoEstimado: 40,
      itens: {
        create: [
          {
            produtoId: burger1.id,
            quantidade: 1,
            precoUnitario: 28.90,
            subtotal: 28.90,
          },
        ],
      },
      historico: {
        create: [
          { status: 'pendente', observacao: 'Pedido criado' },
          { status: 'confirmado', observacao: 'Pedido confirmado pelo restaurante' },
          { status: 'preparando', observacao: 'Pedido em preparo' },
          { status: 'saiu_entrega', observacao: 'Saiu para entrega' },
          { status: 'entregue', observacao: 'Pedido entregue' },
        ],
      },
    },
  });

  const adicionais = await prisma.adicional.findMany({
    where: {
      grupoAdicionalId: grupoAdicionais.id,
    },
    take: 2,
  });

  const pedido2 = await prisma.pedido.create({
    data: {
      empresaId: empresa1.id,
      usuarioId: funcionario1.id,
      enderecoId: endereco1.id,
      numero: 'PED-002',
      status: 'preparando',
      subtotal: 39.90,
      taxaEntrega: 8.50,
      total: 48.40,
      formaPagamento: 'cartao',
      observacoes: 'Sem cebola, por favor',
      tempoEstimado: 40,
      itens: {
        create: [
          {
            produtoId: burger2.id,
            quantidade: 1,
            precoUnitario: 32.90,
            subtotal: 39.90,
            observacoes: 'Sem cebola',
            adicionais: {
              create: adicionais.map((adic) => ({
                adicionalId: adic.id,
                quantidade: 1,
                preco: adic.preco,
              })),
            },
          },
        ],
      },
      historico: {
        create: [
          { status: 'pendente', observacao: 'Pedido criado' },
          { status: 'confirmado', observacao: 'Pedido confirmado' },
          { status: 'preparando', observacao: 'Em preparo' },
        ],
      },
    },
  });

  const pedido3 = await prisma.pedido.create({
    data: {
      empresaId: empresa2.id,
      usuarioId: funcionario2.id,
      enderecoId: endereco2.id,
      numero: 'PED-003',
      status: 'pendente',
      subtotal: 45.00,
      taxaEntrega: 10.00,
      total: 55.00,
      formaPagamento: 'dinheiro',
      tempoEstimado: 50,
      itens: {
        create: [
          {
            produtoId: pizza1.id,
            quantidade: 1,
            precoUnitario: 45.00,
            subtotal: 45.00,
          },
        ],
      },
      historico: {
        create: [{ status: 'pendente', observacao: 'Pedido criado' }],
      },
    },
  });

  console.log('✅ Pedidos criados');

  console.log('\n🎉 Seed concluído com sucesso!');
  console.log('\n📊 Resumo:');
  console.log(`   - ${await prisma.permissao.count()} permissões`);
  console.log(`   - ${await prisma.empresa.count()} empresas`);
  console.log(`   - ${await prisma.usuario.count()} usuários`);
  console.log(`   - ${await prisma.categoria.count()} categorias`);
  console.log(`   - ${await prisma.produto.count()} produtos`);
  console.log(`   - ${await prisma.grupoAdicional.count()} grupos de adicionais`);
  console.log(`   - ${await prisma.adicional.count()} adicionais`);
  console.log(`   - ${await prisma.endereco.count()} endereços`);
  console.log(`   - ${await prisma.pedido.count()} pedidos`);
  console.log('\n👤 Usuários de teste:');
  console.log('   🔐 ADMIN GLOBAL:');
  console.log('      - admin@climbdelivery.com (senha: 123456)');
  console.log('\n   👨‍💼 ADMIN RESTAURANTE:');
  console.log('      - dono@burgerhouse.com (senha: 123456)');
  console.log('      - dono@bellanapoli.com (senha: 123456)');
  console.log('\n   👥 FUNCIONÁRIOS:');
  console.log('      - joao@burgerhouse.com (senha: 123456)');
  console.log('      - maria@bellanapoli.com (senha: 123456)');
}

main()
  .catch((e) => {
    console.error('❌ Erro ao executar seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
