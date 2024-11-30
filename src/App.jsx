import { NavigationContainer } from "@react-navigation/native";
import MyTabs from "./navigation/TabNavigator";
import { StripeProvider } from "@stripe/stripe-react-native";

export default function App() {
  return (
    <NavigationContainer>
      <StripeProvider
        publishableKey="pk_test_51QQPKiKONYCbAl8cHPaWvZ4LTGpLaw6iA8joMd4coUlWXfqK157wyEm2rRpV4MQLLBgCoTDk4C1IQw7fy8vcsjnL00OT5W44wR"
        merchantIdentifier="merchant.identifier" // required for Apple Pay
        urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
      >
        <MyTabs />
      </StripeProvider>
    </NavigationContainer>
  );
}
