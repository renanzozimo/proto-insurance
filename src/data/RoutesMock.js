export default [
  {
    Id: 4,
    Name: "CRED S1",
    PaymentMethod: "credit",
    TenantId: "",
    Sets: [
      {
        Id: 2,
        Covenant: 3,
        BillingDescription: "Seguros e serviços",
        FinancialInstitution: "",
        Brand: "002",
        ReturnCode: "",
        Wallet: "",
        CurrencyIsoCode: "BRL",
        Active: true
      },
      {
        Id: 1,
        Covenant: 3,
        BillingDescription: "Seguros e serviços",
        FinancialInstitution: "",
        Brand: "007",
        ReturnCode: "",
        Wallet: "",
        CurrencyIsoCode: "USD",
        Active: true
      },
      {
        Id: 0,
        Covenant: 3,
        BillingDescription: "Seguros e serviços",
        FinancialInstitution: "",
        Brand: "003",
        ReturnCode: "CERR13",
        Wallet: "",
        CurrencyIsoCode: "BRL",
        Active: true
      }
    ]
  },
  {
    Id: 3,
    Name: "Credito Tizak Corp",
    PaymentMethod: "credit",
    TenantId: "company-2",
    Sets: [
      {
        Id: 4,
        Covenant: 3,
        BillingDescription: "Seguros e serviços",
        FinancialInstitution: "",
        Brand: "",
        ReturnCode: "",
        Wallet: "",
        CurrencyIsoCode: "BRL",
        Active: false
      },
      {
        Id: 3,
        Covenant: 3,
        BillingDescription: "Seguros e serviços",
        FinancialInstitution: "",
        Brand: "",
        ReturnCode: "",
        Wallet: "",
        CurrencyIsoCode: "USD",
        Active: true
      },
      {
        Id: 2,
        Covenant: 1,
        BillingDescription: "Seguros e serviços",
        FinancialInstitution: "",
        Brand: "001",
        ReturnCode: "",
        Wallet: "",
        CurrencyIsoCode: "BRL",
        Active: true
      },
      {
        Id: 1,
        Covenant: 3,
        BillingDescription: "Seguros e serviços",
        FinancialInstitution: "",
        Brand: "003",
        ReturnCode: "",
        Wallet: "",
        CurrencyIsoCode: "BRL",
        Active: false
      },
      {
        Id: 0,
        Covenant: 1,
        BillingDescription: "Seguros e serviços",
        FinancialInstitution: "",
        Brand: "004",
        ReturnCode: "",
        Wallet: "",
        CurrencyIsoCode: "USD",
        Active: true
      }
    ]
  },
  {
    Id: 2,
    Name: "DEBITO DEFAULT S1",
    PaymentMethod: "debit",
    TenantId: "",
    Sets: [
      {
        Id: 3,
        Covenant: 3,
        BillingDescription: "Seguros e serviços",
        FinancialInstitution: "",
        Brand: "",
        ReturnCode: "",
        Wallet: "",
        CurrencyIsoCode: "BRL",
        Active: true
      },
      {
        Id: 2,
        Covenant: 3,
        BillingDescription: "Seguros e serviços",
        FinancialInstitution: "",
        Brand: "",
        ReturnCode: "",
        Wallet: "",
        CurrencyIsoCode: "USD",
        Active: true
      },
      {
        Id: 1,
        Covenant: 3,
        BillingDescription: "Seguros e serviços",
        FinancialInstitution: "Bradesco",
        Brand: "",
        ReturnCode: "",
        Wallet: "",
        CurrencyIsoCode: "COP",
        Active: true
      },
      {
        Id: 0,
        Covenant: 4,
        BillingDescription: "Seguros e serviços",
        FinancialInstitution: "Nu Pagamentos",
        Brand: "",
        ReturnCode: "ERROR-588",
        Wallet: "",
        CurrencyIsoCode: "USD",
        Active: true
      }
    ]
  },
  {
    Id: 1,
    Name: "BOLETO S1",
    PaymentMethod: "bankslip",
    TenantId: "",
    Sets: [
      {
        Id: 2,
        Covenant: 3,
        BillingDescription: "Seguros e serviços",
        FinancialInstitution: "Bradesco",
        Brand: "",
        ReturnCode: "",
        Wallet: "BR-1098YH",
        CurrencyIsoCode: "BRL",
        Active: true
      },
      {
        Id: 1,
        Covenant: 3,
        BillingDescription: "Seguros e serviços",
        FinancialInstitution: "Bradesco",
        Brand: "",
        ReturnCode: "",
        Wallet: "BR-1099YH",
        CurrencyIsoCode: "USD",
        Active: true
      }
    ]
  },
  {
    Id: 0,
    Name: "RZ Boleto",
    PaymentMethod: "bankslip",
    TenantId: "company-1",
    Sets: [
      {
        Id: 1,
        Covenant: 2,
        BillingDescription: "Seguros e serviços",
        FinancialInstitution: "Sicob",
        Brand: "",
        ReturnCode: "",
        Wallet: "001",
        CurrencyIsoCode: "BRL",
        Active: true
      },
      {
        Id: 0,
        Covenant: 2,
        BillingDescription: "Seguros e serviços",
        FinancialInstitution: "Sicob",
        Brand: "",
        ReturnCode: "",
        Wallet: "002",
        CurrencyIsoCode: "BRL",
        Active: true
      }
    ]
  }
];
