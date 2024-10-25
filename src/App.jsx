import { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  Button,
  Alert,
  TouchableOpacity,
} from "react-native";
// import { Link } from "expo-router";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AntDesign from "@expo/vector-icons/AntDesign";
import getData from "./helpers/getData";

function HomeScreen() {
  const [movies, setMovies] = useState([]);
  const [directions, setDirections] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getData("movie");
      const result2 = await getData("direction");

      setDirections(result2);

      setMovies(result);
    };
    fetchData();
  }, []);
  const onPressLearnMore = (id) => {
    movies.map((movies) => {
      if (movies.id === id) {
        directions.map((directions) => {
          if (directions.id === movies.direction_id) {
            Alert.alert(movies.movie_name, directions.direction_name);
          }
        });
      }
    });
  };
  return (
    <View style={styles.container}>
      {movies.length > 0 ? (
        movies.map((d) => (
          <TouchableOpacity key={d.id} onPress={() => onPressLearnMore(d.id)}>
            <View key={d.id}>
              <Text>Movie {d.id}:</Text>
              <Text>{d.movie_name}</Text>
              <Image source={{ uri: d.movie_img }} style={styles.imgMovie} />
            </View>
          </TouchableOpacity>
        ))
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
}

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

function UsersScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>User!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused }) => {
            if (route.name === "Home") {
              return (focused = (
                <AntDesign name="home" size={24} color="black" />
              ));
            } else if (route.name === "Users") {
              return (focused = (
                <AntDesign name="user" size={24} color="black" />
              ));
            }
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Users" component={UsersScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
