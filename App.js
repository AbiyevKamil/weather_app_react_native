import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native';
import backgroundNight from './assets/backgroundNight.png'
import backgroundSunny from './assets/sunnyBackground.png'
const API_KEY = 'b0043bb4070b8300fbdde4eee38d302e'
// const API_KEY = '02137f94e9784503a134e09cfe4eb6e6'

export default function App() {
  const [city, setCity] = useState('');
  const [data, setData] = useState([]);
  const handleSearch = async () => {
    const res = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`)
    const info = await res.json();
    setData(info)
    setCity('')
  }


  return (
    <ImageBackground style={styles.container} source={backgroundNight}>
      <StatusBar
        animated={true}
        barStyle={"light-content"}
        showHideTransition={"fade"}
      />
      <View style={styles.form}>
        <TextInput placeholderTextColor="#FFF" style={styles.input} placeholder="Search by city..." value={city} onChangeText={e => setCity(e)} />
        <TouchableOpacity style={styles.btn} onPress={handleSearch} ><Text style={styles.btnText}>Search</Text></TouchableOpacity>
      </View>
      {data.length !== 0 ? (
        <View style={styles.infoContainer}>
          <Text style={styles.countryName}>
            {data.name}
          </Text>
          <Text style={styles.temp}>
            {data.main.temp.toFixed(0)}℃
          </Text>
          <Text style={styles.description}>
            {data.weather[0].description}
          </Text>
          <View style={styles.containerBottom}>
            <View style={styles.infoValuesContainer}>
              <Text style={styles.infoValues}>{data.main.humidity}%</Text>
              <Text style={styles.infoValues}>Humidity</Text>
            </View>
            <View style={styles.infoValuesContainer}>
              <Text style={styles.infoValues}>{data.visibility / 1000}km</Text>
              <Text style={styles.infoValues}>Visibilty</Text>
            </View>
            <View style={styles.infoValuesContainer}>
              <Text style={styles.infoValues}>{data.wind.speed.toFixed(2)}km/h</Text>
              <Text style={styles.infoValues}>Wind</Text>
            </View>
          </View>
          <Image
            style={styles.icon}
            source={{
              uri: `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
            }}
          />
        </View>
      ) : (<View style={styles.beforeLoadScreenContainer}><Text style={styles.beforeLoadScreen}>Search for city</Text></View>)}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    color: "#FFF"
  },
  form: {
    flexDirection: 'row',
    width: "80%",
    marginTop: 30,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 10,
    padding: 5,
    alignSelf: "center"
  },
  input: {
    flex: 0.8,
    padding: 3,
    color: "#fff",
    paddingLeft: 10
  },
  btn: {
    flex: 0.2,
    alignItems: "center",
    justifyContent: "center",
  },
  btnText: {
    color: "#fff"
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: "center",
  },
  countryName: {
    color: "#FFF",
    fontSize: 20,
    position: "absolute",
    top: 35,
    left: 15,
    textTransform: "uppercase"

  },
  temp: {
    color: "#FFF",
    fontSize: 80,
    position: "absolute",
    top: 50,
    left: 15,
    marginTop: 15,

  },
  description: {
    color: "#FFF",
    fontSize: 20,
    position: "absolute",
    top: 60,
    right: 0,
    marginTop: 15,
    transform: [{ rotate: '270deg' }]

  },
  beforeLoadScreenContainer: {
    color: "#FFF",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  beforeLoadScreen: {
    color: "#FFF",
    alignSelf: "center",
    justifyContent: "center",
    fontSize: 20,
    textTransform: "uppercase",
  },
  containerBottom: {
    flexDirection: "row",
    borderColor: "#FFF",
    borderWidth: 1,
    borderRadius: 8,
    padding: 15,
    width: "90%",
    marginBottom: 25
  },
  infoValuesContainer: {
    flex: 1,
    alignItems: "center",
    color: "#FFF",
    padding: 8
  },
  infoValues: {
    color: "#FFF",
    fontSize: 16
  },
  icon: {
    width: 220,
    height: 220,
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -110,
    marginLeft: -110
  },
});
