import React from "react";
import { View, Text, Button, Image, StyleSheet } from "react-native";
import postData from "../helpers/postData";
import getData from "../helpers/getData";
import generateQR from "../helpers/generateQR";

const OrderScreen = ({ route }) => {
  const { showtimeId, Id } = route.params;
  const [selectedSeat, setSelectedSeat] = React.useState([]);
  const [boughtSeat, setBoughtSeat] = React.useState([]);
  const [qr, setqr] = React.useState("");

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
    // that bai return

    // neu thanh cong
    const data = {
      order_createdAt: new Date(),
      // order_isPaid: false,
      showtime_id: showtimeId,
      // user_id: 1,
      order_chair: selectedSeat,
    };

    await postData("order", data)
      .then(async (res) => {
        const showtimes = await getData("showtime");
        const movies = await getData("movie");
        const showtime = showtimes.find((s) => s.id === showtimeId);
        const movie = movies.find((s) => s.id === showtime.movie_id);
        console.log(showtime.showtime_timedate);

        const string = `Ngay chieu: ${showtime.showtime_timedate}
        Phim: ${movie.movie_name}
        So Ghe: ${data.order_chair}`;
        const url = await generateQR(string);
        setqr(url);

        alert("Da mua thanh cong");

        setSelectedSeat([]);
      })
      .catch((err) => {
        alert("That bai");
        console.log(err);
      });
  };

  React.useEffect(() => {
    getData("order").then((data) => {
      const boughtSeat = data.filter(
        (order) => order.showtime_id === showtimeId
      );
      const re = boughtSeat.map((order) => {
        return order.order_chair;
      });
      setBoughtSeat(re.flat());
    });
  }, [selectedSeat]);

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
