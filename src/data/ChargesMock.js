export default [
  {
    Id: 4,
    PaymentMethod: "credit",
    Route: 4,
    BillingMode: "installment",
    Frequency: "monthly", //Days
    Ordering: false,
    GenerateCharge: true, //If charge stimulus is manually or automatic. Default is true, to automatic charge
    GenerateDaysBeforeDueDate: "20", //Set the qty of days before the duo date we will generate the installment charge
    RetryAutoSchedule: true, //Retry charge to the same installment?
    RetryInterval: "6", //How much time after defaulter installment we will try again (if RetryAutoSchedule is true)
    AutoCancel: {
      Active: true,
      Time: "90", //Days
      Installments: 3
    }
  },
  {
    Id: 3,
    PaymentMethod: "credit",
    Route: 4,
    BillingMode: "recurrent",
    Frequency: "quarterly", //Days
    Ordering: false,
    GenerateCharge: true, //If charge stimulus is manually or automatic. Default is true, to automatic charge
    GenerateDaysBeforeDueDate: "20", //Set the qty of days before the duo date we will generate the installment charge
    RetryAutoSchedule: true, //Retry charge to the same installment?
    RetryInterval: "15", //How much time after defaulter installment we will try again (if RetryAutoSchedule is true)
    AutoCancel: {
      Active: true,
      Time: "270", //Days
      Installments: 3
    }
  },
  {
    Id: 2,
    PaymentMethod: "credit",
    Route: 4,
    BillingMode: "recurrent",
    Frequency: "weekly", //Days
    Ordering: true,
    GenerateCharge: true, //If charge stimulus is manually or automatic. Default is true, to automatic charge
    GenerateDaysBeforeDueDate: "2", //Set the qty of days before the duo date we will generate the installment charge
    RetryAutoSchedule: true, //Retry charge to the same installment?
    RetryInterval: "2", //How much time after defaulter installment we will try again (if RetryAutoSchedule is true)
    AutoCancel: {
      Active: true,
      Time: "30", //Days
      Installments: 4
    }
  },
  {
    Id: 1,
    PaymentMethod: "bankslip",
    Route: 1,
    BillingMode: "oneShot",
    Frequency: "", //Days
    Ordering: false,
    GenerateCharge: false, //If charge stimulus is manually or automatic. Default is true, to automatic charge
    GenerateDaysBeforeDueDate: "0", //Set the qty of days before the duo date we will generate the installment charge
    RetryAutoSchedule: false, //Retry charge to the same installment?
    RetryInterval: "", //How much time after defaulter installment we will try again (if RetryAutoSchedule is true)
    AutoCancel: {
      Active: true,
      Time: "10", //Days
      Installments: null
    }
  },
  {
    Id: 0,
    PaymentMethod: "bankslip",
    Route: 1,
    BillingMode: "recurrent",
    Frequency: "monthly", //Days
    Ordering: false,
    GenerateCharge: true, //If charge stimulus is manually or automatic. Default is true, to automatic charge
    GenerateDaysBeforeDueDate: "20", //Set the qty of days before the duo date we will generate the installment charge
    RetryAutoSchedule: false, //Retry charge to the same installment?
    RetryInterval: "0", //How much time after defaulter installment we will try again (if RetryAutoSchedule is true)
    AutoCancel: {
      Active: true,
      Time: "70", //Days
      Installments: null
    }
  }
];
