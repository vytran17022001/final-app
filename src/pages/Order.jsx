import React from "react";
import { View, Text, Button } from "react-native";
import postData from "../helpers/postData";
import getData from "../helpers/getData";

const OrderScreen = ({ route }) => {
  const { showtimeId, Id } = route.params;
  const [selectedSeat, setSelectedSeat] = React.useState([]);
  const [boughtSeat, setBoughtSeat] = React.useState([]);

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
    await postData("order", {
      order_createdAt: new Date(),
      order_isPaid: false,
      showtime_id: showtimeId,
      user_id: 1,
      order_chair: selectedSeat,
    })
      .then(() => alert("Da mua thanh cong"))
      .catch((err) => {
        alert("That bai");
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
  }, []);

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
    </View>
  );
};

export default OrderScreen;
