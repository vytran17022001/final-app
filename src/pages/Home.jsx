import { React, useEffect, useState } from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import getData from "../helpers/getData";

const HomeScreen = ({ navigation }) => {
  const [movies, setMovies] = useState([]);
  const fetchData = async () => {
    const data = await getData("movie");
    setMovies(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View>
      {movies.length > 0 ? (
        movies.map((d) => (
          <TouchableOpacity
            key={d.id}
            onPress={() => navigation.navigate("MovieDetail", { id: d.id })}
          >
            <View key={d.id}>
              <Image source={{ uri: d.movie_img }} style={styles.imgMovie} />
              <Text>{d.movie_name}</Text>
            </View>
          </TouchableOpacity>
        ))
      ) : (
        <Text>Loading...</Text>
      )}
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

export default HomeScreen;
