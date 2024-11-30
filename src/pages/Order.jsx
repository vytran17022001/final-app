import { useEffect, useState } from "react";
import { View, Text, Button, Image, StyleSheet, Alert } from "react-native";
import postData from "../helpers/postData";
import getData from "../helpers/getData";
import generateQR from "../helpers/generateQR";
import { useStripe } from "@stripe/stripe-react-native";
import {
  fetchCustomer,
  fetchPaymentIntents,
  fetchExphemeralKeys,
} from "../helpers/createPayment";

const OrderScreen = ({ route }) => {
  const { showtimeId } = route.params;
  const [movie, setMovie] = useState([]);
  const [selectedSeat, setSelectedSeat] = useState([]);
  const [boughtSeat, setBoughtSeat] = useState([]);
  const [qr, setqr] = useState("");
  const [orderCode, setOrderCode] = useState("");

  useEffect(() => {
    const fechmovies = async () => {
      const repMovies = await getData("movie");
      const repShowtimes = await getData("showtime");
      const showtime = repShowtimes.find((item) => item.id === showtimeId);
      const movie = repMovies.find((item) => item.id === showtime.movie_id);
      setMovie(movie);
    };
    fechmovies();
  }, [showtimeId]);

  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [paymentReady, setPaymentReady] = useState(false);

  const initializePaymentSheet = async (amount) => {
    try {
      const customer = await fetchCustomer();
      const paymentIntent = await fetchPaymentIntents(
        customer.id,
        Number(amount) * 100 * selectedSeat.length
      ); // Pass dynamic amount
      const ephemeralKey = await fetchExphemeralKeys(customer.id);
      setOrderCode(paymentIntent.id);
      const { error } = await initPaymentSheet({
        merchantDisplayName: "Example, Inc.",
        customerId: customer.id,
        customerEphemeralKeySecret: ephemeralKey,
        paymentIntentClientSecret: paymentIntent.client_secret,
        allowsDelayedPaymentMethods: true,
      });

      if (!error) {
        setPaymentReady(true);
      } else {
        Alert.alert("Error", "Failed to initialize payment sheet.");
        throw new Error();
      }
    } catch (err) {
      Alert.alert("Error", "Failed to initialize payment sheet.");
      throw new Error(err);
    }
  };

  useEffect(() => {
    const initialize = async () => {
      const { error } = await initPaymentSheet({
        merchantDisplayName: "Example, Inc.",
      });

      if (error) Alert.alert("Error", "Failed to initialize payment sheet.");
      return setPaymentReady(true);
    };
    initialize();
  }, []);

  const openPaymentSheet = async () => {
    try {
      if (!paymentReady) {
        Alert.alert("Error", "Payment Sheet is not ready.");
        throw new Error("Payment Sheet is not ready");
      }
      const result = await presentPaymentSheet();

      if (result.error) {
        throw new Error("Payment failed");
      } else {
        // Alert.alert("Success", "Payment was successful!");
      }
    } catch (err) {
      throw new Error("Error", err.message);
    }
  };

  const handleSet = (seatId) => {
    if (boughtSeat.includes(seatId)) {
      // alert("Ghe da dc mua");
      return;
    }
    if (selectedSeat.includes(seatId)) {
      const kophaino = selectedSeat.filter((s) => s !== seatId);
      setSelectedSeat(kophaino);
    } else {
      setSelectedSeat([...selectedSeat, seatId]);
    }
  };

  const handlePay = async () => {
    if (selectedSeat.length === 0) {
      alert("chon ghe");
      return;
    }

    // goi api thanh toan
    try {
      await initializePaymentSheet(movie.movie_price);
      await openPaymentSheet();
      const data = {
        order_createdAt: new Date(),
        // order_isPaid: false,
        showtime_id: showtimeId,
        // user_id: 1,
        order_chair: selectedSeat,
        order_code: orderCode,
      };
      await postData("order", data)
        .then(async (res) => {
          const showtimes = await getData("showtime");
          const movies = await getData("movie");
          const showtime = showtimes.find((s) => s.id === showtimeId);
          const movie = movies.find((s) => s.id === showtime.movie_id);
          const string = `Code: ${orderCode}
        Ngay chieu: ${showtime.showtime_timedate}
        Phim: ${movie.movie_name}
        So Ghe: ${data.order_chair}`;
          const url = await generateQR(string);
          setqr(url);
          console.log(string);
          alert("Da mua thanh cong");

          setSelectedSeat([]);
        })
        .catch((err) => {
          throw new Error(`Error:  ${postData}  + ${err.message}`);
        });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData("order").then((data) => {
      const boughtSeat = data.filter(
        (order) => order.showtime_id === showtimeId
      );
      const re = boughtSeat.map((order) => {
        return order.order_chair;
      });
      setBoughtSeat(re.flat());
    });
  }, [selectedSeat, showtimeId]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>----Order----</Text>
      <Text onPress={() => handleSet("A1")}>A1</Text>
      <Text onPress={() => handleSet("A2")}>A2</Text>
      <Text onPress={() => handleSet("A3")}>A3</Text>
      <Text>Ghe da chon {selectedSeat}</Text>
      <Text>Ghe da mua {boughtSeat}</Text>
      <Button onPress={() => handlePay()} title="Payment">
        Payment
      </Button>
      {qr && <Image source={{ uri: qr }} style={styles.imgMovie} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // paddingTop: 50,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  imgMovie: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
});

export default OrderScreen;
