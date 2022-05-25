import React, { useState } from "react";
import { Text, StyleSheet, View, ScrollView , TouchableOpacity ,Modal} from "react-native";
import SearchBar from "./components/SearchBar";
import ResultList from "./components/ResultList";
// import useResult from "./hooks/useResult";
import { LinearGradient } from "expo-linear-gradient";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import DropDownPicker from "react-native-dropdown-picker";

const SearchScreen = (props) => {
  const [term, setTerm] = useState("");
  // const [searchApi, result, errorMessage] = useResult();

  // Fetched Result :  Abbreviated here for simplicity, but will be fully fetched with API.
  const[result,setResult]=useState([
    {doctor_name:"Osama Sherif" , rating:5 , no_of_ratings:101 ,doctor_speciality:"Consultant of Plastic Surgery" , id:1 },
    {doctor_name:"Mohamed Aiman" , rating:5 , no_of_ratings:102 ,doctor_speciality:"Consultant of Dermatology" , id:2 },
    {doctor_name:"Abdulrahman Habib" , rating:5 , no_of_ratings:103 ,doctor_speciality:"Consultant of Neurology" , id:3 },
    {doctor_name:"Ahmed Ashraf" , rating:5 , no_of_ratings:104 ,doctor_speciality:"Specialist of Allergy and Immunology" , id:4 },
    {doctor_name:"Zeyad Nasrat Sherif" , rating:5 , no_of_ratings:105 ,doctor_speciality:"Specialist of Orthopedics" , id:5 },
    {doctor_name:"Abdulrahman Osama " , rating:5 , no_of_ratings:106 ,doctor_speciality:"Consultant of Plastic Surgery" , id:6 },
    {doctor_name:"Mohamed Sherif" , rating:5 , no_of_ratings:107 ,doctor_speciality:"Consultant of Plastic Surgery" , id:7 },
    {doctor_name:"Osama Nasrat" , rating:5 , no_of_ratings:108 ,doctor_speciality:"Consultant of Plastic Surgery" , id:8 },
    {doctor_name:"Abdulrahman Aiman" , rating:5 , no_of_ratings:109 ,doctor_speciality:"Consultant of Plastic Surgery" , id:9 },
    {doctor_name:"Zeyad Ashraf" , rating:5 , no_of_ratings:110 ,doctor_speciality:"Consultant of Plastic Surgery" , id:10 },
  ]);
 
  //Filtered Result: the output after using the serach key word.
  const [filteredResult,setFilteredResult] = useState(result);
  // The Filtering Window 
  const [filterVisible, setFilterVisible] = useState(false);
  // Filtering Criteria which will be send to the API Call
  const [filterCriteria, setFilterCriteria] = useState({
    specialization:'',
    city:'',
    region:'',
  });
  
  //Function that searches for any doctor name that contains that substring.
  const filterResultsByName = (name) => {
    if(name==""){
     return result}
     else{
    return result.filter((result) => {
      return result.doctor_name.toLowerCase().includes(name.toLowerCase());
    });
  }
  };


      //  For SPECIALIZATION Dropdown
      const [specializationOpen, setSpecializationOpen] = useState(false);
      const [specializationItems, setSpecializationItems] = useState([
        { label: "Allergy and immunology", value: "Allergy and immunology" },
        { label: "Anesthesiology", value: "Anesthesiology" },
        { label: "Dermatology", value: "Dermatology" },
        { label: "Diagnostic radiology", value: "Diagnostic radiology" },
        { label: "Emergency medicine", value: "Emergency medicine" },
        { label: "Family medicine", value: "Family medicine" },
        { label: "Internal medicine", value: "Internal medicine" },
        { label: "Medical genetics", value: "Medical genetics" },
        { label: "Neurology", value: "Neurology" },
        { label: "Nuclear medicine", value: "Nuclear medicine" },
        { label: "Obstetrics and gynecology", value: "Obstetrics and gynecology" },
        { label: "Ophthalmology", value: "Ophthalmology" },
        { label: "Pathology", value: "Pathology" },
        { label: "Pediatrics", value: "Pediatrics" },
        {
          label: "Physical medicine and rehabilitation",
          value: "Physical medicine and rehabilitation",
        },
        { label: "Preventive medicine", value: "Preventive medicine" },
        { label: "Psychiatry", value: "Psychiatry" },
        { label: "Radiation oncology", value: "Radiation oncology" },
        { label: "Surgery", value: "Surgery" },
        { label: "Urology", value: "Urology" },
      ]);

      
          //  For REGION Dropdown
    const [regionOpen, setRegionOpen] = useState(false);
    const [regionItems, setRegionItems] = useState([
      { label: "Ibrahimiyah", value: "Ibrahimiyah" },
      { label: "Camp Ceaser", value: "Camp Ceaser" },
      { label: "Sporting", value: "Sporting" },
      { label: "Cleopatra", value: "Cleopatra" },
      { label: "Sidi Gaber", value: "Sidi Gaber" },
      { label: "Mostafa Kamel", value: "Mostafa Kamel" },
      { label: "Roshdy", value: "Roshdy" },
    ]);


        //  For CITY Dropdown
        const [cityOpen, setCityOpen] = useState(false);
        const [cityItems, setCityItems] = useState([
          { label: "Alexandria", value: "Alexandria" },
          { label: "Cairo", value: "Cairo" },
          { label: "Mansoura", value: "Mansoura" },
          { label: "Tanta", value: "Tanta" },
          { label: "Luxor", value: "Luxor" },
          { label: "Aswan", value: "Aswan" },
          { label: "Ismailiyah", value: "Ismailiyah" },
          { label: "Sohag", value: "Sohag" },
          { label: "Monofiya", value: "Monofiya" },
        ]);
    

  
    
  const handleSpecializationChange = (val) => {
    setFilterCriteria({
      ...filterCriteria,
      specialization: val.value,
    });
  };
  const handleRegionChange = (val) => {
    setFilterCriteria({
      ...filterCriteria,
      region: val.value,
    });
  };
  const handleCityChange = (val) => {
    setFilterCriteria({
      ...filterCriteria,
      city: val.value,
    });
  };


  return (
    <View style={{flex:1}}>
      {/*********************  Search Bar   ***********************/}
      <SearchBar
        term={term}
        onTermChange={setTerm}
        onTermSubmit={() => setFilteredResult(filterResultsByName(term))}
      />
      {/***********************************************************/}

  {/*********************  Filter & Sort Buttons   ***************************/}
      <View style={styles.ButtonContainer}>
      {/*********************  SORT    ***********************/}  
      <TouchableOpacity style={{width:"45%" }}>
      <LinearGradient
              colors={["#08d4c4", "#01ab9d"]}
              style={styles.Button}
            >
              <Text
                style={[
                  styles.textButton,
                  {
                    color: "#fff",
                  },
                ]}
              >
                Sort
              </Text>
              <MaterialCommunityIcons style={{marginLeft:10}} name="sort" color="#fff" size={20} />
            </LinearGradient>
      </TouchableOpacity>
      {/*********************  FILTER    ***********************/} 
      <TouchableOpacity style={{width:"45%"}} onPress={()=>{setFilterVisible(!filterVisible)}} >
      <LinearGradient
              colors={["#08d4c4", "#01ab9d"]}
              style={styles.Button}
            >
              <Text
                style={[
                  styles.textButton,
                  {
                    color: "#fff",
                  },
                ]}
              >
                Filter
              </Text>
              <MaterialCommunityIcons style={{marginLeft:10}} name="filter" color="#fff" size={20} />
            </LinearGradient>
      </TouchableOpacity>
      </View>
{/**********************************************************************************************/}
  {/*******************************  Filter WINDOW   ***********************/} 
      <View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={filterVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {/*   Exit Button        ** DO NOT DELETE THIS SECTION **    */}
          {/* <TouchableOpacity onPress={() => {setFilterVisible(false)}} style={styles.exitButton}>
            <Ionicons
                  name="ios-close-circle-outline"
                  color="red"
                  size={30}
                  style={{ alignSelf: "flex-end" }}
                />
            </TouchableOpacity> */}

        {/*********************  SPECIALIZATION Dropdown   ***********************/}
        <Text style={styles.text_footer}> Specialization: </Text>
            <DropDownPicker
              listMode="MODAL"
              open={specializationOpen}
              value={filterCriteria.specialization}
              items={specializationItems}
              setOpen={setSpecializationOpen}
              onSelectItem={(val) => {
                handleSpecializationChange(val);
              }}
            />          
        {/*********************  CITY Dropdown   ***********************/}
        <Text style={styles.text_footer}> City: </Text>
            <DropDownPicker
              listMode="MODAL"
              open={cityOpen}
              value={filterCriteria.city}
              items={cityItems}
              setOpen={setCityOpen}
              onSelectItem={(val) => {
                handleCityChange(val);
              }}
            />
        {/*********************  REGION Dropdown   ***********************/}
        <Text style={styles.text_footer}> Region: </Text>
            <DropDownPicker
              listMode="MODAL"
              open={regionOpen}
              value={filterCriteria.region}
              items={regionItems}
              setOpen={setRegionOpen}
              onSelectItem={(val) => {
                handleRegionChange(val);
              }}
            /> 
        {/*********************  SAVE Button  ***********************/}
      <TouchableOpacity onPress={() => {setFilterVisible(false)}} style={[styles.exitButton,{marginTop:20}]}>
      <LinearGradient
              colors={["#08d4c4", "#01ab9d"]}
              style={styles.Button}
            >
              <Text
                style={[
                  styles.textButton,
                  {
                    color: "#fff",
                  },
                ]}
              >
                Save
              </Text>
            </LinearGradient>
     </TouchableOpacity>                       
          </View>
        </View>
      </Modal>
      </View>
  {/**********************************************************************************/}       

      {/*****************************  RESULT LIST   ************************************/} 
      <View style={{flex:1}}>
        <ResultList  result={filteredResult} Title="Doctors" navigation={props.navigation} />
      </View>
      {/**********************************************************************************/} 
    </View>
  );
};

const styles = StyleSheet.create({
  ButtonContainer:{
    flexDirection:"row" , 
    alignSelf:"stretch",
    marginHorizontal:15,
    justifyContent:"space-between",
    marginBottom:10,

  },
  Button: {
    width: "100%",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    flexDirection:"row"
  },
  textButton: {
    fontSize: 18,
    fontWeight: "bold",
  },
  icon:{

  },
  centeredView: {
   flex: 1,
   justifyContent: "center",
   alignItems: "center",
   marginTop: 22
 },
 modalView: {
  margin: 20,
  backgroundColor: "white",
  borderRadius: 20,
  padding: 35,
  // alignItems: "center",
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
  }},
  exitButton:{
    alignSelf:"flex-end",
    borderRadius: 20,
    // elevation: 2,
    width:50,
    height:50,
    backgroundColor:"white"
  },
  text_footer: {
    color: "#05375a",
    fontSize: 18,
    fontWeight:"bold",
    marginTop:15
  }
});

export default SearchScreen;
