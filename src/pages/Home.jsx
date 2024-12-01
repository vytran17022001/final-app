import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import getData from "../helpers/getData";
import Star from "react-native-vector-icons/FontAwesome";

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
    <ScrollView style={styles.container}>
      {/* Movies Section */}
      <View style={styles.moviesContainer}>
        {movies.length > 0 ? (
          movies.map((movie) => (
            <TouchableOpacity
              key={movie.id}
              style={styles.movieCard}
              onPress={() =>
                navigation.navigate("MovieDetail", { id: movie.id })
              }
            >
              <Image
                source={{ uri: movie.movie_img }}
                style={styles.imgMovie}
              />
              <Text style={styles.movieTitle}>{movie.movie_name}</Text>
              <View style={styles.overlay}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Star name="star" style={styles.star} />
                  <Text
                    style={{
                      fontFamily: "Roboto",
                      fontSize: 14,
                      color: "white",
                      marginLeft: 3,
                      fontWeight: "bold",
                    }}
                  >
                    {movie.movie_rating}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.loadingText}>Loading...</Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  moviesContainer: {
    paddingHorizontal: 16,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  movieCard: {
    width: "48%",
    marginBottom: 16,
    overflow: "hidden",
    padding: 8,
  },
  imgMovie: {
    width: "100%",
    borderRadius: 5,
    height: 300,
    resizeMode: "cover",
  },
  overlay: {
    position: "absolute",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Làm mờ overlay
    width: "25%",
    height: "8%",
    justifyContent: "center",
    alignItems: "center", // Căn giữa text
    top: 250, // Thay thế marginTop
    left: 145, // Thay thế marginLeft
    borderBottomLeftRadius: 20,
  },
  star: {
    color: "yellow",
    fontSize: 10,
  },
  movieTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 8,
  },
  loadingText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
  },
});

export default HomeScreen;
