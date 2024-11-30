import { useEffect, useState } from "react";
import { View, Text, Button, Alert } from "react-native";
import { useStripe } from "@stripe/stripe-react-native";
import {
  fetchCustomer,
  fetchPaymentIntents,
  fetchExphemeralKeys,
} from "../helpers/createPayment";

export default function CheckoutScreen() {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);
  const [paymentReady, setPaymentReady] = useState(false);

  // const initializePaymentSheet = async (amount) => {
  //   try {
  //     const customer = await fetchCustomer();
  //     const paymentIntent = await fetchPaymentIntents(customer.id, amount); // Pass dynamic amount
  //     const ephemeralKey = await fetchExphemeralKeys(customer.id);

  //     const { error } = await initPaymentSheet({
  //       merchantDisplayName: "Example, Inc.",
  //       customerId: customer.id,
  //       customerEphemeralKeySecret: ephemeralKey,
  //       paymentIntentClientSecret: paymentIntent.client_secret,
  //       allowsDelayedPaymentMethods: true,
  //     });

  //     if (!error) {
  //       setPaymentReady(true);
  //       console.log("Payment Sheet initialized successfully.");
  //     } else {
  //       console.error("Payment Sheet initialization error:", error);
  //       Alert.alert("Error", "Failed to initialize payment sheet.");
  //     }
  //   } catch (err) {
  //     console.error("Error during Payment Sheet initialization:", err);
  //     Alert.alert("Error", "Failed to initialize payment sheet.");
  //   }
  // };

  // const openPaymentSheet = async () => {
  //   try {
  //     if (!paymentReady) {
  //       Alert.alert("Error", "Payment Sheet is not ready.");
  //       return;
  //     }

  //     const result = await presentPaymentSheet();
  //     if (result.error) {
  //       console.error("Error presenting Payment Sheet:", result.error);
  //       Alert.alert("Payment failed", result.error.message);
  //     } else {
  //       console.log("Payment successful:", result);
  //       Alert.alert("Success", "Payment was successful!");
  //     }
  //   } catch (err) {
  //     console.error("Error during Payment Sheet presentation:", err);
  //     Alert.alert("Error", "Failed to present payment sheet.");
  //   }
  // };

  return (
    <View style={{ marginTop: 100 }}>
      {/* <Button
        title="Checkout"
        onPress={async () => {
          await initializePaymentSheet(1000); // Amount in cents
          await openPaymentSheet();
        }}
        disabled={!paymentReady}
      /> */}
    </View>
  );
}
