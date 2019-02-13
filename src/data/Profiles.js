export default [
  {
    Id: "profile-1",
    Name: "Administrador",
    Abbr: "AD",
    Users: [
      {
        Id: "user-users-1",
        Name: "Renan Zózimo",
        Profile: "Administrador",
        Abbr: "RZ"
      },
      {
        Id: "user-users-3",
        Name: "Ti Zak",
        Profile: "Administrador",
        Abbr: "TZ"
      },
      {
        Id: "user-users-5",
        Name: "Chegadinho Drummond de Andrade",
        Profile: "Administrador",
        Abbr: "CD"
      },
      {
        Id: "user-users-9",
        Name: "Chegadonho Santos",
        Profile: "Administrador",
        Abbr: "CS"
      },
      {
        Id: "user-users-10",
        Name: "Má Tilde",
        Profile: "Administrador",
        Abbr: "MT"
      }
    ],
    Actions: {
      "Produtos - Obter": { Id: "Produtos - Obter", Active: true },
      "Produtos - Obter Lista": {
        Id: "Produtos - Obter Lista",
        Active: false
      },
      "Produtos - Criar": { Id: "Produtos - Criar", Active: false },
      "Produtos - Adicionar Imagem": {
        Id: "Produtos - Adicionar Imagem",
        Active: false
      },
      "Produtos - Remover Imagem": {
        Id: "Produtos - Remover Imagem",
        Active: true
      },
      "Produtos - Obter Configuração": {
        Id: "Produtos - Obter Configuração",
        Active: true
      },
      "Produtos - Atualizar configuração": {
        Id: "Produtos - Atualizar configuração",
        Active: false
      },
      "Produtos - Testar certificado": {
        Id: "Produtos - Testar certificado",
        Active: false
      },
      "Produtos - Testar comunicação": {
        Id: "Produtos - Testar comunicação",
        Active: true
      },
      "Produtos - Descontinuar": {
        Id: "Produtos - Descontinuar",
        Active: true
      },
      "Produtos - Publicar": { Id: "Produtos - Publicar", Active: true },
      "Tags - Obter": { Id: "Tags - Obter", Active: true },
      "Tags - Obter Lista": { Id: "Tags - Obter Lista", Active: true },
      "Publicações - Obter": { Id: "Publicações - Obter", Active: true },
      "Publicações - Obter Lista": {
        Id: "Publicações - Obter Lista",
        Active: true
      },
      "Publicações - Criar": { Id: "Publicações - Criar", Active: true },
      "Cliente - Obter": { Id: "Cliente - Obter", Active: true },
      "Cliente - Obter Lista": {
        Id: "Cliente - Obter Lista",
        Active: true
      },
      "Cliente - Criar": { Id: "Cliente - Criar", Active: true },
      "Cliente - Atualizar": { Id: "Cliente - Atualizar", Active: true },
      "Endereços - Obter": { Id: "Endereços - Obter", Active: true },
      "Endereços - Obter Lista": {
        Id: "Endereços - Obter Lista",
        Active: true
      },
      "Endereços - Criar": { Id: "Endereços - Criar", Active: true },
      "Endereços - Atualizar": {
        Id: "Endereços - Atualizar",
        Active: false
      },
      "Endereços - Excluir": {
        Id: "Endereços - Excluir",
        Active: false
      },
      "Comunicações - Obter": {
        Id: "Comunicações - Obter",
        Active: false
      },
      "Comunicações - Obter Lista": {
        Id: "Comunicações - Obter Lista",
        Active: true
      },
      "Comunicações - Criar": {
        Id: "Comunicações - Criar",
        Active: true
      },
      "Comunicações - Obter Lista de Variáveis": {
        Id: "Comunicações - Obter Lista de Variáveis",
        Active: true
      },
      "Pagamentos - Obter": { Id: "Pagamentos - Obter", Active: true },
      "Pagamentos - Obter Lista": {
        Id: "Pagamentos - Obter Lista",
        Active: true
      },
      "Pagamentos - Criar": { Id: "Pagamentos - Criar", Active: true },
      "Vendas - Obter": { Id: "Vendas - Obter", Active: true },
      "Vendas - Obter Lista": {
        Id: "Vendas - Obter Lista",
        Active: true
      },
      "Vendas - Criar": { Id: "Vendas - Criar", Active: true },
      "Vendas - Obter Certificado": {
        Id: "Vendas - Obter Certificado",
        Active: true
      },
      "Vendas - Envio de certificado": {
        Id: "Vendas - Envio de certificado",
        Active: false
      }
    }
  },
  {
    Id: "profile-2",
    Name: "Operador",
    Abbr: "OP",
    Users: [
      {
        Id: "user-users-2",
        Name: "Andersen",
        Profile: "Operador",
        Abbr: "A"
      },
      {
        Id: "user-users-6",
        Name: "Jordan Natiruts",
        Profile: "Operador",
        Abbr: "JN"
      }
    ],
    Actions: {
      "Produtos - Obter": { Id: "Produtos - Obter", Active: false },
      "Produtos - Obter Lista": {
        Id: "Produtos - Obter Lista",
        Active: false
      },
      "Produtos - Criar": { Id: "Produtos - Criar", Active: false },
      "Produtos - Adicionar Imagem": {
        Id: "Produtos - Adicionar Imagem",
        Active: false
      },
      "Produtos - Remover Imagem": {
        Id: "Produtos - Remover Imagem",
        Active: false
      },
      "Produtos - Obter Configuração": {
        Id: "Produtos - Obter Configuração",
        Active: false
      },
      "Produtos - Atualizar configuração": {
        Id: "Produtos - Atualizar configuração",
        Active: false
      },
      "Produtos - Testar certificado": {
        Id: "Produtos - Testar certificado",
        Active: true
      },
      "Produtos - Testar comunicação": {
        Id: "Produtos - Testar comunicação",
        Active: true
      },
      "Produtos - Descontinuar": {
        Id: "Produtos - Descontinuar",
        Active: true
      },
      "Produtos - Publicar": { Id: "Produtos - Publicar", Active: true },
      "Tags - Obter": { Id: "Tags - Obter", Active: true },
      "Tags - Obter Lista": { Id: "Tags - Obter Lista", Active: true },
      "Publicações - Obter": { Id: "Publicações - Obter", Active: true },
      "Publicações - Obter Lista": {
        Id: "Publicações - Obter Lista",
        Active: false
      },
      "Publicações - Criar": {
        Id: "Publicações - Criar",
        Active: false
      },
      "Cliente - Obter": { Id: "Cliente - Obter", Active: false },
      "Cliente - Obter Lista": {
        Id: "Cliente - Obter Lista",
        Active: false
      },
      "Cliente - Criar": { Id: "Cliente - Criar", Active: false },
      "Cliente - Atualizar": {
        Id: "Cliente - Atualizar",
        Active: false
      },
      "Endereços - Obter": { Id: "Endereços - Obter", Active: false },
      "Endereços - Obter Lista": {
        Id: "Endereços - Obter Lista",
        Active: false
      },
      "Endereços - Criar": { Id: "Endereços - Criar", Active: false },
      "Endereços - Atualizar": {
        Id: "Endereços - Atualizar",
        Active: false
      },
      "Endereços - Excluir": {
        Id: "Endereços - Excluir",
        Active: false
      },
      "Comunicações - Obter": {
        Id: "Comunicações - Obter",
        Active: false
      },
      "Comunicações - Obter Lista": {
        Id: "Comunicações - Obter Lista",
        Active: true
      },
      "Comunicações - Criar": {
        Id: "Comunicações - Criar",
        Active: true
      },
      "Comunicações - Obter Lista de Variáveis": {
        Id: "Comunicações - Obter Lista de Variáveis",
        Active: true
      },
      "Pagamentos - Obter": { Id: "Pagamentos - Obter", Active: true },
      "Pagamentos - Obter Lista": {
        Id: "Pagamentos - Obter Lista",
        Active: false
      },
      "Pagamentos - Criar": { Id: "Pagamentos - Criar", Active: false },
      "Vendas - Obter": { Id: "Vendas - Obter", Active: false },
      "Vendas - Obter Lista": {
        Id: "Vendas - Obter Lista",
        Active: true
      },
      "Vendas - Criar": { Id: "Vendas - Criar", Active: true },
      "Vendas - Obter Certificado": {
        Id: "Vendas - Obter Certificado",
        Active: true
      },
      "Vendas - Envio de certificado": {
        Id: "Vendas - Envio de certificado",
        Active: true
      }
    }
  },
  {
    Id: "profile-3",
    Name: "Analista 2",
    Abbr: "A2",
    Users: [
      {
        Id: "user-users-4",
        Name: "Anonimo Silva",
        Profile: "Analista 2",
        Abbr: "AS"
      },
      {
        Id: "user-users-7",
        Name: "Robertinho Au Au",
        Profile: "Analista 2",
        Abbr: "RA"
      },
      {
        Id: "user-users-8",
        Name: "Joselito SN",
        Profile: "Analista 2",
        Abbr: "JS"
      }
    ],
    Actions: {
      "Produtos - Obter": { Id: "Produtos - Obter", Active: true },
      "Produtos - Obter Lista": {
        Id: "Produtos - Obter Lista",
        Active: false
      },
      "Produtos - Criar": { Id: "Produtos - Criar", Active: false },
      "Produtos - Adicionar Imagem": {
        Id: "Produtos - Adicionar Imagem",
        Active: true
      },
      "Produtos - Remover Imagem": {
        Id: "Produtos - Remover Imagem",
        Active: true
      },
      "Produtos - Obter Configuração": {
        Id: "Produtos - Obter Configuração",
        Active: true
      },
      "Produtos - Atualizar configuração": {
        Id: "Produtos - Atualizar configuração",
        Active: false
      },
      "Produtos - Testar certificado": {
        Id: "Produtos - Testar certificado",
        Active: false
      },
      "Produtos - Testar comunicação": {
        Id: "Produtos - Testar comunicação",
        Active: false
      },
      "Produtos - Descontinuar": {
        Id: "Produtos - Descontinuar",
        Active: false
      },
      "Produtos - Publicar": {
        Id: "Produtos - Publicar",
        Active: false
      },
      "Tags - Obter": { Id: "Tags - Obter", Active: false },
      "Tags - Obter Lista": { Id: "Tags - Obter Lista", Active: false },
      "Publicações - Obter": {
        Id: "Publicações - Obter",
        Active: false
      },
      "Publicações - Obter Lista": {
        Id: "Publicações - Obter Lista",
        Active: false
      },
      "Publicações - Criar": {
        Id: "Publicações - Criar",
        Active: false
      },
      "Cliente - Obter": { Id: "Cliente - Obter", Active: false },
      "Cliente - Obter Lista": {
        Id: "Cliente - Obter Lista",
        Active: false
      },
      "Cliente - Criar": { Id: "Cliente - Criar", Active: false },
      "Cliente - Atualizar": {
        Id: "Cliente - Atualizar",
        Active: false
      },
      "Endereços - Obter": { Id: "Endereços - Obter", Active: false },
      "Endereços - Obter Lista": {
        Id: "Endereços - Obter Lista",
        Active: false
      },
      "Endereços - Criar": { Id: "Endereços - Criar", Active: false },
      "Endereços - Atualizar": {
        Id: "Endereços - Atualizar",
        Active: false
      },
      "Endereços - Excluir": {
        Id: "Endereços - Excluir",
        Active: false
      },
      "Comunicações - Obter": {
        Id: "Comunicações - Obter",
        Active: false
      },
      "Comunicações - Obter Lista": {
        Id: "Comunicações - Obter Lista",
        Active: false
      },
      "Comunicações - Criar": {
        Id: "Comunicações - Criar",
        Active: false
      },
      "Comunicações - Obter Lista de Variáveis": {
        Id: "Comunicações - Obter Lista de Variáveis",
        Active: true
      },
      "Pagamentos - Obter": { Id: "Pagamentos - Obter", Active: true },
      "Pagamentos - Obter Lista": {
        Id: "Pagamentos - Obter Lista",
        Active: true
      },
      "Pagamentos - Criar": { Id: "Pagamentos - Criar", Active: true },
      "Vendas - Obter": { Id: "Vendas - Obter", Active: true },
      "Vendas - Obter Lista": {
        Id: "Vendas - Obter Lista",
        Active: true
      },
      "Vendas - Criar": { Id: "Vendas - Criar", Active: true },
      "Vendas - Obter Certificado": {
        Id: "Vendas - Obter Certificado",
        Active: true
      },
      "Vendas - Envio de certificado": {
        Id: "Vendas - Envio de certificado",
        Active: true
      }
    }
  },
  {
    Id: "profile-4",
    Name: "Analista 1",
    Abbr: "A1",
    Users: [],
    Actions: {
      "Produtos - Obter": { Id: "Produtos - Obter", Active: true },
      "Produtos - Obter Lista": {
        Id: "Produtos - Obter Lista",
        Active: true
      },
      "Produtos - Criar": { Id: "Produtos - Criar", Active: true },
      "Produtos - Adicionar Imagem": {
        Id: "Produtos - Adicionar Imagem",
        Active: true
      },
      "Produtos - Remover Imagem": {
        Id: "Produtos - Remover Imagem",
        Active: true
      },
      "Produtos - Obter Configuração": {
        Id: "Produtos - Obter Configuração",
        Active: true
      },
      "Produtos - Atualizar configuração": {
        Id: "Produtos - Atualizar configuração",
        Active: true
      },
      "Produtos - Testar certificado": {
        Id: "Produtos - Testar certificado",
        Active: true
      },
      "Produtos - Testar comunicação": {
        Id: "Produtos - Testar comunicação",
        Active: true
      },
      "Produtos - Descontinuar": {
        Id: "Produtos - Descontinuar",
        Active: true
      },
      "Produtos - Publicar": { Id: "Produtos - Publicar", Active: true },
      "Tags - Obter": { Id: "Tags - Obter", Active: true },
      "Tags - Obter Lista": { Id: "Tags - Obter Lista", Active: true },
      "Publicações - Obter": { Id: "Publicações - Obter", Active: true },
      "Publicações - Obter Lista": {
        Id: "Publicações - Obter Lista",
        Active: true
      },
      "Publicações - Criar": { Id: "Publicações - Criar", Active: true },
      "Cliente - Obter": { Id: "Cliente - Obter", Active: true },
      "Cliente - Obter Lista": {
        Id: "Cliente - Obter Lista",
        Active: true
      },
      "Cliente - Criar": { Id: "Cliente - Criar", Active: true },
      "Cliente - Atualizar": { Id: "Cliente - Atualizar", Active: true },
      "Endereços - Obter": { Id: "Endereços - Obter", Active: true },
      "Endereços - Obter Lista": {
        Id: "Endereços - Obter Lista",
        Active: true
      },
      "Endereços - Criar": { Id: "Endereços - Criar", Active: true },
      "Endereços - Atualizar": {
        Id: "Endereços - Atualizar",
        Active: true
      },
      "Endereços - Excluir": { Id: "Endereços - Excluir", Active: true },
      "Comunicações - Obter": {
        Id: "Comunicações - Obter",
        Active: true
      },
      "Comunicações - Obter Lista": {
        Id: "Comunicações - Obter Lista",
        Active: true
      },
      "Comunicações - Criar": {
        Id: "Comunicações - Criar",
        Active: true
      },
      "Comunicações - Obter Lista de Variáveis": {
        Id: "Comunicações - Obter Lista de Variáveis",
        Active: true
      },
      "Pagamentos - Obter": { Id: "Pagamentos - Obter", Active: true },
      "Pagamentos - Obter Lista": {
        Id: "Pagamentos - Obter Lista",
        Active: true
      },
      "Pagamentos - Criar": { Id: "Pagamentos - Criar", Active: true },
      "Vendas - Obter": { Id: "Vendas - Obter", Active: true },
      "Vendas - Obter Lista": {
        Id: "Vendas - Obter Lista",
        Active: true
      },
      "Vendas - Criar": { Id: "Vendas - Criar", Active: true },
      "Vendas - Obter Certificado": {
        Id: "Vendas - Obter Certificado",
        Active: true
      },
      "Vendas - Envio de certificado": {
        Id: "Vendas - Envio de certificado",
        Active: true
      }
    }
  },
  {
    Id: "profile-5",
    Name: "Analista 3",
    Abbr: "A3",
    Users: [],
    Actions: {
      "Produtos - Obter": { Id: "Produtos - Obter", Active: true },
      "Produtos - Obter Lista": {
        Id: "Produtos - Obter Lista",
        Active: true
      },
      "Produtos - Criar": { Id: "Produtos - Criar", Active: true },
      "Produtos - Adicionar Imagem": {
        Id: "Produtos - Adicionar Imagem",
        Active: true
      },
      "Produtos - Remover Imagem": {
        Id: "Produtos - Remover Imagem",
        Active: false
      },
      "Produtos - Obter Configuração": {
        Id: "Produtos - Obter Configuração",
        Active: false
      },
      "Produtos - Atualizar configuração": {
        Id: "Produtos - Atualizar configuração",
        Active: false
      },
      "Produtos - Testar certificado": {
        Id: "Produtos - Testar certificado",
        Active: true
      },
      "Produtos - Testar comunicação": {
        Id: "Produtos - Testar comunicação",
        Active: false
      },
      "Produtos - Descontinuar": {
        Id: "Produtos - Descontinuar",
        Active: true
      },
      "Produtos - Publicar": { Id: "Produtos - Publicar", Active: true },
      "Tags - Obter": { Id: "Tags - Obter", Active: true },
      "Tags - Obter Lista": { Id: "Tags - Obter Lista", Active: true },
      "Publicações - Obter": { Id: "Publicações - Obter", Active: true },
      "Publicações - Obter Lista": {
        Id: "Publicações - Obter Lista",
        Active: false
      },
      "Publicações - Criar": {
        Id: "Publicações - Criar",
        Active: false
      },
      "Cliente - Obter": { Id: "Cliente - Obter", Active: false },
      "Cliente - Obter Lista": {
        Id: "Cliente - Obter Lista",
        Active: true
      },
      "Cliente - Criar": { Id: "Cliente - Criar", Active: true },
      "Cliente - Atualizar": { Id: "Cliente - Atualizar", Active: true },
      "Endereços - Obter": { Id: "Endereços - Obter", Active: true },
      "Endereços - Obter Lista": {
        Id: "Endereços - Obter Lista",
        Active: false
      },
      "Endereços - Criar": { Id: "Endereços - Criar", Active: true },
      "Endereços - Atualizar": {
        Id: "Endereços - Atualizar",
        Active: true
      },
      "Endereços - Excluir": { Id: "Endereços - Excluir", Active: true },
      "Comunicações - Obter": {
        Id: "Comunicações - Obter",
        Active: false
      },
      "Comunicações - Obter Lista": {
        Id: "Comunicações - Obter Lista",
        Active: true
      },
      "Comunicações - Criar": {
        Id: "Comunicações - Criar",
        Active: false
      },
      "Comunicações - Obter Lista de Variáveis": {
        Id: "Comunicações - Obter Lista de Variáveis",
        Active: true
      },
      "Pagamentos - Obter": { Id: "Pagamentos - Obter", Active: true },
      "Pagamentos - Obter Lista": {
        Id: "Pagamentos - Obter Lista",
        Active: false
      },
      "Pagamentos - Criar": { Id: "Pagamentos - Criar", Active: false },
      "Vendas - Obter": { Id: "Vendas - Obter", Active: false },
      "Vendas - Obter Lista": {
        Id: "Vendas - Obter Lista",
        Active: true
      },
      "Vendas - Criar": { Id: "Vendas - Criar", Active: true },
      "Vendas - Obter Certificado": {
        Id: "Vendas - Obter Certificado",
        Active: true
      },
      "Vendas - Envio de certificado": {
        Id: "Vendas - Envio de certificado",
        Active: false
      }
    }
  },
  {
    Id: "profile-6",
    Name: "Analista 6",
    Abbr: "A7",
    Users: [],
    Actions: {
      "Produtos - Obter": { Id: "Produtos - Obter", Active: false },
      "Produtos - Obter Lista": {
        Id: "Produtos - Obter Lista",
        Active: false
      },
      "Produtos - Criar": { Id: "Produtos - Criar", Active: false },
      "Produtos - Adicionar Imagem": {
        Id: "Produtos - Adicionar Imagem",
        Active: false
      },
      "Produtos - Remover Imagem": {
        Id: "Produtos - Remover Imagem",
        Active: false
      },
      "Produtos - Obter Configuração": {
        Id: "Produtos - Obter Configuração",
        Active: false
      },
      "Produtos - Atualizar configuração": {
        Id: "Produtos - Atualizar configuração",
        Active: false
      },
      "Produtos - Testar certificado": {
        Id: "Produtos - Testar certificado",
        Active: false
      },
      "Produtos - Testar comunicação": {
        Id: "Produtos - Testar comunicação",
        Active: false
      },
      "Produtos - Descontinuar": {
        Id: "Produtos - Descontinuar",
        Active: false
      },
      "Produtos - Publicar": { Id: "Produtos - Publicar", Active: true },
      "Tags - Obter": { Id: "Tags - Obter", Active: true },
      "Tags - Obter Lista": { Id: "Tags - Obter Lista", Active: true },
      "Publicações - Obter": { Id: "Publicações - Obter", Active: true },
      "Publicações - Obter Lista": {
        Id: "Publicações - Obter Lista",
        Active: true
      },
      "Publicações - Criar": { Id: "Publicações - Criar", Active: true },
      "Cliente - Obter": { Id: "Cliente - Obter", Active: true },
      "Cliente - Obter Lista": {
        Id: "Cliente - Obter Lista",
        Active: true
      },
      "Cliente - Criar": { Id: "Cliente - Criar", Active: false },
      "Cliente - Atualizar": {
        Id: "Cliente - Atualizar",
        Active: false
      },
      "Endereços - Obter": { Id: "Endereços - Obter", Active: false },
      "Endereços - Obter Lista": {
        Id: "Endereços - Obter Lista",
        Active: false
      },
      "Endereços - Criar": { Id: "Endereços - Criar", Active: true },
      "Endereços - Atualizar": {
        Id: "Endereços - Atualizar",
        Active: true
      },
      "Endereços - Excluir": { Id: "Endereços - Excluir", Active: true },
      "Comunicações - Obter": {
        Id: "Comunicações - Obter",
        Active: true
      },
      "Comunicações - Obter Lista": {
        Id: "Comunicações - Obter Lista",
        Active: true
      },
      "Comunicações - Criar": {
        Id: "Comunicações - Criar",
        Active: true
      },
      "Comunicações - Obter Lista de Variáveis": {
        Id: "Comunicações - Obter Lista de Variáveis",
        Active: false
      },
      "Pagamentos - Obter": { Id: "Pagamentos - Obter", Active: false },
      "Pagamentos - Obter Lista": {
        Id: "Pagamentos - Obter Lista",
        Active: false
      },
      "Pagamentos - Criar": { Id: "Pagamentos - Criar", Active: true },
      "Vendas - Obter": { Id: "Vendas - Obter", Active: true },
      "Vendas - Obter Lista": {
        Id: "Vendas - Obter Lista",
        Active: true
      },
      "Vendas - Criar": { Id: "Vendas - Criar", Active: true },
      "Vendas - Obter Certificado": {
        Id: "Vendas - Obter Certificado",
        Active: false
      },
      "Vendas - Envio de certificado": {
        Id: "Vendas - Envio de certificado",
        Active: false
      }
    }
  },
  {
    Id: "profile-7",
    Name: "Analista 7",
    Abbr: "A8",
    Users: [],
    Actions: {
      "Produtos - Obter": { Id: "Produtos - Obter", Active: false },
      "Produtos - Obter Lista": {
        Id: "Produtos - Obter Lista",
        Active: false
      },
      "Produtos - Criar": { Id: "Produtos - Criar", Active: false },
      "Produtos - Adicionar Imagem": {
        Id: "Produtos - Adicionar Imagem",
        Active: false
      },
      "Produtos - Remover Imagem": {
        Id: "Produtos - Remover Imagem",
        Active: true
      },
      "Produtos - Obter Configuração": {
        Id: "Produtos - Obter Configuração",
        Active: true
      },
      "Produtos - Atualizar configuração": {
        Id: "Produtos - Atualizar configuração",
        Active: false
      },
      "Produtos - Testar certificado": {
        Id: "Produtos - Testar certificado",
        Active: true
      },
      "Produtos - Testar comunicação": {
        Id: "Produtos - Testar comunicação",
        Active: true
      },
      "Produtos - Descontinuar": {
        Id: "Produtos - Descontinuar",
        Active: false
      },
      "Produtos - Publicar": { Id: "Produtos - Publicar", Active: true },
      "Tags - Obter": { Id: "Tags - Obter", Active: true },
      "Tags - Obter Lista": { Id: "Tags - Obter Lista", Active: true },
      "Publicações - Obter": { Id: "Publicações - Obter", Active: true },
      "Publicações - Obter Lista": {
        Id: "Publicações - Obter Lista",
        Active: true
      },
      "Publicações - Criar": { Id: "Publicações - Criar", Active: true },
      "Cliente - Obter": { Id: "Cliente - Obter", Active: true },
      "Cliente - Obter Lista": {
        Id: "Cliente - Obter Lista",
        Active: true
      },
      "Cliente - Criar": { Id: "Cliente - Criar", Active: true },
      "Cliente - Atualizar": { Id: "Cliente - Atualizar", Active: true },
      "Endereços - Obter": { Id: "Endereços - Obter", Active: true },
      "Endereços - Obter Lista": {
        Id: "Endereços - Obter Lista",
        Active: false
      },
      "Endereços - Criar": { Id: "Endereços - Criar", Active: false },
      "Endereços - Atualizar": {
        Id: "Endereços - Atualizar",
        Active: false
      },
      "Endereços - Excluir": { Id: "Endereços - Excluir", Active: true },
      "Comunicações - Obter": {
        Id: "Comunicações - Obter",
        Active: true
      },
      "Comunicações - Obter Lista": {
        Id: "Comunicações - Obter Lista",
        Active: true
      },
      "Comunicações - Criar": {
        Id: "Comunicações - Criar",
        Active: true
      },
      "Comunicações - Obter Lista de Variáveis": {
        Id: "Comunicações - Obter Lista de Variáveis",
        Active: false
      },
      "Pagamentos - Obter": { Id: "Pagamentos - Obter", Active: false },
      "Pagamentos - Obter Lista": {
        Id: "Pagamentos - Obter Lista",
        Active: false
      },
      "Pagamentos - Criar": { Id: "Pagamentos - Criar", Active: false },
      "Vendas - Obter": { Id: "Vendas - Obter", Active: false },
      "Vendas - Obter Lista": {
        Id: "Vendas - Obter Lista",
        Active: true
      },
      "Vendas - Criar": { Id: "Vendas - Criar", Active: true },
      "Vendas - Obter Certificado": {
        Id: "Vendas - Obter Certificado",
        Active: true
      },
      "Vendas - Envio de certificado": {
        Id: "Vendas - Envio de certificado",
        Active: true
      }
    }
  }
];
