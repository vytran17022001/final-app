import { React, useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import getData from "../helpers/getData";

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
    <View style={styles.container}>
      <Image source={{ uri: movie.movie_img }} style={styles.imgMovie} />
      <Text>{movie.movie_name}</Text>
      <Text>{movie.actor_name}</Text>
      <Text>{movie.direction_name}</Text>
      <Text>{movie.category_name}</Text>

      {showtimes.map((item) => (
        <TouchableOpacity
          key={item.id}
          onPress={() =>
            navigation.navigate("Order", { showtimeId: item.id, Id: movie.id })
          }
        >
          <View key={item.id}>
            <Text>
              {`${item.showtime_timedate.split(" ")[1]} ${
                item.showtime_timedate.split(" ")[2]
              }`}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
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

export default MovieDetailScreen;
