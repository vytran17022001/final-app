import { URLSearchParams } from "react-native-url-polyfill";

const stripe_API_KEY =
  "sk_test_51QQPKiKONYCbAl8couWeZLwVMdfcwxPgLW9mLk5nkDrxEgQue8R7cVmHJWRo5GGzsDxdi6gywBkBtc6waZNxZvwI00j1oqPGH8";

export const fetchCustomer = async () => {
  const cusResponse = await fetch("https://api.stripe.com/v1/customers", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${stripe_API_KEY}`,
    },
  });

  const customer = await cusResponse.json();
  return customer;
};

export const fetchPaymentIntents = async (customerId, money) => {
  const params = new URLSearchParams({
    customer: customerId,
    amount: money,
    currency: "usd",
    "automatic_payment_methods[enabled]": "true",
  });

  const intentResponse = await fetch(
    `https://api.stripe.com/v1/payment_intents?${params}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${stripe_API_KEY}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  const client_secret = await intentResponse.json();
  return client_secret;
};

export const fetchExphemeralKeys = async (customerId) => {
  const exParams = new URLSearchParams({
    customer: customerId,
  });

  const exResponse = await fetch(
    `https://api.stripe.com/v1/ephemeral_keys?${exParams}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${stripe_API_KEY}`,
        "Content-Type": "application/x-www-form-urlencoded",
        "Stripe-Version": "2024-11-20.acacia",
      },
    }
  );

  const ephemeralKey = await exResponse.json();
  return ephemeralKey;
};
