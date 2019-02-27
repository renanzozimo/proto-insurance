import LongText from "./LongText";

const DescriptionGen = name => {
  return `Serviço ${name} ${LongText}`;
};

export default [
  {
    Id: "0",
    Name: "COD019999",
    FriendlyName: "Sorteio 20.000",
    Supplier: "0",
    Type: "0",
    CurrencyCode: "BRL",
    get Description() {
      return DescriptionGen(this.Name);
    },
    Cost: 0.9,
    Vigence: "365",
    Rules: [
      {
        Appliedto: "Titular",
        Operator: "=",
        Value: "1"
      },
      {
        Appliedto: "Beneficiário",
        Operator: "=",
        Value: "0"
      },
      {
        Appliedto: "Dependente",
        Operator: "=",
        Value: "0"
      }
    ]
  },
  {
    Id: "1",
    Name: "COD018976",
    FriendlyName: "Sorteio 10.000",
    Supplier: "0",
    Type: "0",
    CurrencyCode: "BRL",
    get Description() {
      return DescriptionGen(this.Name);
    },
    Cost: 0.2,
    Vigence: "365",
    Rules: [
      {
        Appliedto: "Titular",
        Operator: "=",
        Value: "1"
      },
      {
        Appliedto: "Beneficiário",
        Operator: "=",
        Value: "0"
      },
      {
        Appliedto: "Dependente",
        Operator: "=",
        Value: "0"
      }
    ]
  },
  {
    Id: "2",
    Name: "COD019778999",
    FriendlyName: "Sorteio 50.000",
    Supplier: "1",
    Type: "0",
    CurrencyCode: "BRL",
    get Description() {
      return DescriptionGen(this.Name);
    },
    Cost: 0.1,
    Vigence: "365",
    Rules: [
      {
        Appliedto: "Titular",
        Operator: "=",
        Value: "1"
      },
      {
        Appliedto: "Beneficiário",
        Operator: "=",
        Value: "0"
      },
      {
        Appliedto: "Dependente",
        Operator: "=",
        Value: "0"
      }
    ]
  },
  {
    Id: "3",
    Name: "COD01999910",
    FriendlyName: "Seguro louco",
    Supplier: "2",
    Type: "1",
    CurrencyCode: "BRL",
    get Description() {
      return DescriptionGen(this.Name);
    },
    Cost: 5.5,
    Vigence: "365",
    Rules: [
      {
        Appliedto: "Titular",
        Operator: "=",
        Value: "1"
      },
      {
        Appliedto: "Beneficiário",
        Operator: "=",
        Value: "0"
      },
      {
        Appliedto: "Dependente",
        Operator: "=",
        Value: "0"
      }
    ]
  },
  {
    Id: "4",
    Name: "COD01987",
    FriendlyName: "Seguro demais",
    Supplier: "1",
    Type: "1",
    CurrencyCode: "BRL",
    get Description() {
      return DescriptionGen(this.Name);
    },
    Cost: 3.0,
    Vigence: "365",
    Rules: [
      {
        Appliedto: "Titular",
        Operator: "=",
        Value: "1"
      },
      {
        Appliedto: "Beneficiário",
        Operator: "=",
        Value: "0"
      },
      {
        Appliedto: "Dependente",
        Operator: "=",
        Value: "0"
      }
    ]
  },
  {
    Id: "5",
    Name: "COD01999111",
    FriendlyName: "Assistencia S",
    Supplier: "2",
    Type: "2",
    CurrencyCode: "BRL",
    get Description() {
      return DescriptionGen(this.Name);
    },
    Cost: 3.0,
    Vigence: "1095",
    Rules: [
      {
        Appliedto: "Titular",
        Operator: "=",
        Value: "1"
      },
      {
        Appliedto: "Beneficiário",
        Operator: "=",
        Value: "0"
      },
      {
        Appliedto: "Dependente",
        Operator: "=",
        Value: "0"
      }
    ]
  },
  {
    Id: "6",
    Name: "COD019910102",
    FriendlyName: "Assistencia DDD",
    Supplier: "2",
    Type: "2",
    CurrencyCode: "BRL",
    get Description() {
      return DescriptionGen(this.Name);
    },
    Cost: 1.0,
    Vigence: "1095",
    Rules: [
      {
        Appliedto: "Titular",
        Operator: "=",
        Value: "1"
      },
      {
        Appliedto: "Beneficiário",
        Operator: "=",
        Value: "0"
      },
      {
        Appliedto: "Dependente",
        Operator: "=",
        Value: "0"
      }
    ]
  },
  {
    Id: "7",
    Name: "COD01999335",
    FriendlyName: "Assistencia SMYY88DDD10",
    Supplier: "2",
    Type: "2",
    CurrencyCode: "BRL",
    get Description() {
      return DescriptionGen(this.Name);
    },
    Cost: 1.0,
    Vigence: "1095",
    Rules: [
      {
        Appliedto: "Titular",
        Operator: "=",
        Value: "1"
      },
      {
        Appliedto: "Beneficiário",
        Operator: "=",
        Value: "0"
      },
      {
        Appliedto: "Dependente",
        Operator: "=",
        Value: "0"
      }
    ]
  },
  {
    Id: "8",
    Name: "COD01999100",
    FriendlyName: "Assist IAH",
    Supplier: "0",
    Type: "2",
    CurrencyCode: "BRL",
    get Description() {
      return DescriptionGen(this.Name);
    },
    Cost: 1.57,
    Vigence: "365",
    Rules: [
      {
        Appliedto: "Titular",
        Operator: "=",
        Value: "1"
      },
      {
        Appliedto: "Beneficiário",
        Operator: "=",
        Value: "0"
      },
      {
        Appliedto: "Dependente",
        Operator: "=",
        Value: "0"
      }
    ]
  },
  {
    Id: "9",
    Name: "COD01908877",
    FriendlyName: "Assist DDD",
    Supplier: "0",
    Type: "2",
    CurrencyCode: "BRL",
    get Description() {
      return DescriptionGen(this.Name);
    },
    Cost: 0.46,
    Vigence: "365",
    Rules: [
      {
        Appliedto: "Titular",
        Operator: "=",
        Value: "1"
      },
      {
        Appliedto: "Beneficiário",
        Operator: "=",
        Value: "0"
      },
      {
        Appliedto: "Dependente",
        Operator: "=",
        Value: "0"
      }
    ]
  }
];
