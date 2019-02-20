import LongText from "./LongText";

const DescriptionGen = name => {
  return `Serviço ${name} ${LongText}`;
};

export default [
  {
    Id: "0",
    Name: "Sorteio 20.000",
    Supplier: "0",
    Type: "0",
    get Description() {
      return DescriptionGen(this.Name);
    },
    Cost: 0.9,
    Value: 4.5,
    Vigence: "12"
  },
  {
    Id: "1",
    Name: "Sorteio 10.000",
    Supplier: "0",
    Type: "0",
    get Description() {
      return DescriptionGen(this.Name);
    },
    Cost: 0.2,
    Value: 4.9,
    Vigence: "12"
  },
  {
    Id: "2",
    Name: "Sorteio 50.000",
    Supplier: "1",
    Type: "0",
    get Description() {
      return DescriptionGen(this.Name);
    },
    Cost: 0.1,
    Value: 4.9,
    Vigence: "12"
  },
  {
    Id: "3",
    Name: "Seguro louco",
    Supplier: "2",
    Type: "1",
    get Description() {
      return DescriptionGen(this.Name);
    },
    Cost: 5.5,
    Value: 9.9,
    Vigence: "12"
  },
  {
    Id: "4",
    Name: "Seguro demais",
    Supplier: "1",
    Type: "1",
    get Description() {
      return DescriptionGen(this.Name);
    },
    Cost: 3.0,
    Value: 19.9,
    Vigence: "12"
  },
  {
    Id: "5",
    Name: "Assistencia S",
    Supplier: "2",
    Type: "2",
    get Description() {
      return DescriptionGen(this.Name);
    },
    Cost: 3.0,
    Value: 9.9,
    Vigence: "36"
  },
  {
    Id: "6",
    Name: "Assistencia DDD",
    Supplier: "2",
    Type: "2",
    get Description() {
      return DescriptionGen(this.Name);
    },
    Cost: 1.0,
    Value: 99.9,
    Vigence: "36"
  },
  {
    Id: "7",
    Name: "Assistencia SMYY88DDD10",
    Supplier: "2",
    Type: "2",
    get Description() {
      return DescriptionGen(this.Name);
    },
    Cost: 1.0,
    Value: 0.9,
    Vigence: "36"
  },
  {
    Id: "8",
    Name: "Assist IAH",
    Supplier: "0",
    Type: "2",
    get Description() {
      return DescriptionGen(this.Name);
    },
    Cost: 1.57,
    Value: 1.59,
    Vigence: "12"
  },
  {
    Id: "9",
    Name: "Assist DDD",
    Supplier: "0",
    Type: "2",
    get Description() {
      return DescriptionGen(this.Name);
    },
    Cost: 0.46,
    Value: 9.99,
    Vigence: "12"
  }
];
