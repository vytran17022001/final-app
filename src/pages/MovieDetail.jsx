import { React, useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import getData from "../helpers/getData";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome2 from "react-native-vector-icons/Ionicons";

const MovieDetailScreen = ({ route, navigation }) => {
  const { id } = route.params;
  const [movie, setMovie] = useState([]);
  const [showtimes, setshowtimes] = useState([]);

  const fetchData = async () => {
    const [respMovie, respActor, respDirection, respCategory, respShowtime] =
      await Promise.all([
        getData("movie"),
        getData("actor"),
        getData("direction"),
        getData("category"),
        getData("showtime"),
      ]);

    const data = respMovie.find((m) => m.id === id);
    const actor = respActor.find((m) => m.id === data.actor_id);
    const direc = respDirection.find((m) => m.id === data.direction_id);
    const cate = respCategory.find((m) => m.id === data.category_id);
    const showtimefilter = respShowtime.filter((m) => m.movie_id === id);

    let newData = {
      ...data,
      actor_name: actor.actor_name,
      direction_name: direc.direction_name,
      category_name: cate.category_name,
    };
    setMovie(newData);
    setshowtimes(showtimefilter);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {!movie || Object.keys(movie).length === 0 ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      ) : (
        <>
          <View style={styles.containerHDer}>
            <Image
              source={{ uri: movie.movie_img }}
              style={styles.imgMovieHDer}
            />
          </View>
          <View style={styles.container}>
            <Image source={{ uri: movie.movie_img }} style={styles.imgMovie} />
            <Text style={styles.movieName}>{movie.movie_name}</Text>
            <View style={styles.rowRating}>
              {<FontAwesome name="star" style={styles.star} />}
              <Text style={styles.movieRating}>{movie.movie_rating}</Text>
              <FontAwesome name="edit" style={styles.editRating} />
              <Text
                style={{
                  fontFamily: "Roboto",
                  fontSize: 17,
                  fontWeight: "bold",
                }}
              >
                Rating
              </Text>
            </View>
            <View style={styles.rowTime}>
              <FontAwesome2 name="time-outline" style={styles.timeI} />
              <Text style={styles.timeTxt}>{movie.movie_duration}</Text>

              <FontAwesome name="calendar-o" style={styles.dayI} />
              <Text style={styles.dayTxt}>{`${
                movie.movie_createdAt.split(" ")[0]
              }`}</Text>
            </View>
            <View style={styles.showtimeItem}>
              {showtimes.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={styles.showtimeBtn}
                  onPress={() =>
                    navigation.navigate("Order", {
                      showtimeId: item.id,
                      Id: movie.id,
                    })
                  }
                >
                  <View key={item.id} style={styles.showtimeItem}>
                    <Text style={styles.showtimeText}>
                      {`${item.showtime_timedate.split(" ")[1]} ${
                        item.showtime_timedate.split(" ")[2]
                      }`}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  loadingText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },

  containerHDer: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    flexDirection: "row",
  },
  container: {
    flex: 2,
    backgroundColor: "#fff",
  },
  imgMovieHDer: {
    width: "100%",
    height: "160%",
    resizeMode: "stretch",
    marginBottom: 38,
  },
  imgMovie: {
    width: "30%",
    height: "35%",
    resizeMode: "cover",
    position: "absolute",
    top: -60,
    borderRadius: 8,
    left: 20,
    shadowColor: "black", // Màu bóng
    shadowOffset: { width: 0, height: 4 }, // Độ lệch của bóng
    shadowOpacity: 0.3, // Độ mờ của bóng (0.0 - 1.0)
    shadowRadius: 6, // Độ mờ của bóng
    // Bóng đổ trên Android
    elevation: 8, // Tạo bóng (giá trị càng cao bóng càng đậm)
  },
  movieName: {
    position: "absolute",
    bottom: "102%",
    left: "37%",
    fontSize: 22,
    color: "white", // Màu chữ để nổi bật trên nền
    fontWeight: "bold", // In đậm chữ
    textShadowColor: "rgba(0, 0, 0, 0.7)", // Thêm bóng cho chữ
    textShadowOffset: { width: 1, height: 1 }, // Vị trí bóng
    textShadowRadius: 3, // Độ mờ bóng
    fontFamily: "Roboto",
  },

  rowRating: {
    position: "absolute",
    bottom: "94%", // Đặt khoảng cách cụ thể từ đáy
    right: "33%", // Canh giữa theo chiều ngang
    flexDirection: "row",
    alignItems: "center", // Canh giữa icon và text theo chiều dọc
  },
  star: {
    color: "orange",
    fontSize: 14, // Tăng kích thước icon để đồng bộ với text
    paddingTop: 4,
    marginRight: 5, // Khoảng cách giữa icon và text
  },
  movieRating: {
    fontSize: 18,
    color: "black",
    fontWeight: "bold",
    fontFamily: "Roboto",
  },
  editRating: {
    color: "black",
    fontSize: 20, // Tăng kích thước icon để đồng bộ với text
    paddingTop: 2,
    marginLeft: 20, // Khoảng cách giữa icon và text
  },

  rowTime: {
    position: "absolute",
    bottom: "88%", // Điều chỉnh khoảng cách từ đáy
    left: "37%", // Canh giữa theo chiều ngang
    flexDirection: "row", // Để icon và text nằm trên cùng một hàng
    alignItems: "center", // Canh giữa theo chiều dọc
  },

  timeI: {
    color: "orange",
    fontSize: 20, // Kích thước icon phù hợp với text
    paddingTop: 2, // Giảm khoảng cách trên nếu không cần thiết
    marginRight: 4, // Khoảng cách giữa icon và text
  },

  timeTxt: {
    fontSize: 18,
    color: "gray",
    fontFamily: "Roboto",
  },

  dayI: {
    color: "orange",
    fontSize: 19, // Kích thước icon phù hợp với text
    paddingTop: 1, // Giảm khoảng cách trên nếu không cần thiết
    marginRight: 5, // Khoảng cách giữa icon và text
    marginLeft: 15,
  },
  dayTxt: {
    fontSize: 18,
    color: "gray",
    fontFamily: "Roboto",
  },

  showtimeBtn: {
    color: "orange",
    fontSize: 20, // Kích thước icon phù hợp với text
    paddingTop: 2, // Giảm khoảng cách trên nếu không cần thiết
    marginRight: 4,
  },
  showtimeItem: {
    position: "absolute",
    bottom: "100%", // Điều chỉnh khoảng cách từ đáy
    left: "37%", // Canh giữa theo chiều ngang
    flexDirection: "row", // Để icon và text nằm trên cùng một hàng
    alignItems: "center", // Canh giữa theo chiều dọc
  },
  showtimeText: {
    fontSize: 18,
    color: "gray",
    fontFamily: "Roboto",
  },
});

export default MovieDetailScreen;
