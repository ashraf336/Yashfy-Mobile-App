import React, { useState } from "react";
import { useFocusEffect } from '@react-navigation/native';
import { Text, StyleSheet, View, ScrollView , TouchableOpacity ,Modal , SafeAreaView } from "react-native";
import SearchBar from "./components/SearchBar";
import ResultList from "./components/ResultList";
// import useResult from "./hooks/useResult";
import { LinearGradient } from "expo-linear-gradient";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import DropDownPicker from "react-native-dropdown-picker";
import axios from "axios";
//const baseUrl = "https://test-api-yashfy.herokuapp.com"; // production 
const baseUrl = "http://192.168.1.12:8080"; //DeVolopment

const SearchScreen = (props) => {



//**************** Search Bar Input Text **********************// 
const [term, setTerm] = useState("");
//**************** Doctors List **********************// 
const [result, setResult] = React.useState([]);
//**************** Sorting Category **********************// 
const [sortingCategory, setSortingCategory] = useState(null);

{/******************************      API Call  Handlers  ***********************************/}
const fetchDoctorsDataHandle = async ( queryParams ) => {

    //CALLING API RETURN data 
    try {
      console.log(" ....... Calling API (Fetch Doctors data)......")
      const response = await axios.get(`${baseUrl}/home/doctors` , { params: queryParams });

      if (response.status === 200) {
        console.log("inside" );

        let fetchedDoctors = response.data.fetchedDoctors
        //console.log("doctors is fetched: ",fetchedDoctors );
        return fetchedDoctors
      } 
      else
      {
        Alert.alert('Not Found !', 'No Doctors Available', [
          {text: 'Try Again'}
       ]);
        return null;
      }
    }
     catch (error) {
      //setLoading(false);
      //setRefreshing(false)
      alert("An error has occurred in fetching doctors data ..");
      console.log(error);
      throw error;
    }
}



  //Filtered Result: the output after using the serach key word.
  const [filteredResult,setFilteredResult] = useState([]);

  // The Filtering Window 
  const [filterVisible, setFilterVisible] = useState(false);
  // Filtering Criteria which will be send to the API Call
  const initialParams = {
    /* default values for closures */
    specialization:null,
    city:null,
    region:null,
  }
  const [filterCriteria, setFilterCriteria] = useState(initialParams);
  
  //Function that searches for any doctor name that contains that substring.
  const filterResultsByName = (name) => {
    if(name==""){
     return result
    }
    else{
    return result.filter((doctor) => {
      let doctor_name = doctor.first_name+" "+doctor.last_name 
      return doctor_name.toLowerCase().includes(name.toLowerCase());
    });
  }
  };

  //---------------RECOMMENDATION FUNCTION-----------------
  //Function that sorts the result using a certain category 
  const sortResultsByCategory = (val) => {
    if(val.value==null){
     return ;
    }
    else{
      switch(val.value) {
        case "Doctor Treatment":
         setFilteredResult( filteredResult.sort((a, b) => {
            return b.catgs_doctor_treatment - a.catgs_doctor_treatment;
        })
         )
         break;
        case "Clinic":
          setFilteredResult( filteredResult.sort((a, b) => {
            return b.catgs_Clinic - a.catgs_Clinic;
        }))
        break;
        case "Staff":
           setFilteredResult( filteredResult.sort((a, b) => {
            return b.catgs_staff - a.catgs_staff;
        }))
        break;
        case "Waiting Time":
          setFilteredResult( filteredResult.sort((a, b) => {
            return b.catgs_waiting_time - a.catgs_waiting_time;
        }))
        break;
        case "Equipment":
          setFilteredResult( filteredResult.sort((a, b) => {
            return b.catgs_equipment - a.catgs_equipment;
        }))
        break;
        case "Price":
          setFilteredResult(  filteredResult.sort((a, b) => {
            return b.catgs_price - a.catgs_price;
        }))
        break;                     
        default:
          return
      }
  }
  };



  
useFocusEffect(
  React.useCallback(() => {
    setFilteredResult([])
    setResult([])
    const promise = fetchDoctorsDataHandle(initialParams);
    promise.then(fetchedDoctors => {
      //console.log("here" , fetchedDoctors);
      // Set the data with fetched data
      setResult(fetchedDoctors)
      setFilteredResult(fetchedDoctors)
      // console.log(fetchedDoctors)
    });
  }, [])
);


      //  For SORTING Dropdown
      const [sortingCategoryOpen, setSortingCategoryOpen] = useState(false);
      const [sortingCategoryItems, setSortingCategoryItems] = useState([
        { label: "None", value: null },
        { label: "Doctor Treatment", value: "Doctor Treatment" },
        { label: "Clinic", value: "Clinic" },
        { label: "Staff", value: "Staff" },
        { label: "Waiting Time", value: "Waiting Time" },
        { label: "Equipment", value: "Equipment" },
        { label: "Price", value: "Price" },
      ]);

      //  For SPECIALIZATION Dropdown
      const [specializationOpen, setSpecializationOpen] = useState(false);
      const [specializationItems, setSpecializationItems] = useState([
        { label: "None", value: null },
        { label: "Nephrology", value: "Nephrology" },
        { label: "orthopedics", value: "orthopedics" },
        { label: "Dermatology", value: "Dermatology" },
        { label: "Neurology", value: "Neurology" },
        { label: "Ophthalmology", value: "Ophthalmology" },
        { label: "Pathology", value: "Pathology" },
        { label: "Pediatrics", value: "Pediatrics" },
        { label: "Dentistry", value: "Dentistry" },
        { label: "Surgery", value: "Surgery" },
        { label: "Urology", value: "Urology" },
      ]);

      
          //  For REGION Dropdown
    const [regionOpen, setRegionOpen] = useState(false);
    const [regionItems, setRegionItems] = useState([
      { label: "None", value: null },
      { label: "Ibrahimiyah", value: "Ibrahimiyah" },
      { label: "Camp Ceaser", value: "Camp Ceaser" },
      { label: "Sporting", value: "Sporting" },
      { label: "Qalyoub", value: "Qalyoub" },
      { label: "Shibin", value: "Shibin" },
      { label: "Banha", value: "Banha" },
      { label: "Mahalla", value: "Mahalla" },
    ]);


        //  For CITY Dropdown
        const [cityOpen, setCityOpen] = useState(false);
        const [cityItems, setCityItems] = useState([
          { label: "None", value: null },
          { label: "gharbia", value: "gharbia" },
          { label: "Fayoum", value: "Fayoum" },
          { label: "qalyubia", value: "qalyubia" },
          { label: "Menoufia", value: "Menoufia" },
          { label: "Alexandria", value: "Alexandria" },
          { label: "Cairo", value: "Cairo" },
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
      {/* <TouchableOpacity style={{width:"45%" }}>
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
      </TouchableOpacity> */}
      <View  style={{flexDirection:"row", width:'57%'}}>
      <Text style={[styles.text_footer,{marginTop:0}]}>Sort by: </Text>
            <DropDownPicker
              placeholder="Recommendation Category.."
              placeholderStyle={{fontSize:12, fontWeight:"bold"}}
              style={[styles.Button, {width:'100%'}]}
              listMode="MODAL"
              open={sortingCategoryOpen}
              value={sortingCategory}
              items={sortingCategoryItems}
              setOpen={setSortingCategoryOpen}
              onSelectItem={(val) => {
                [setSortingCategory(val.value),
                  // console.log("before function "+sortingCategory),
                sortResultsByCategory(val)]
                // console.log("after function "+sortingCategory)]
              }}
            />
      </View>         
      {/*********************  FILTER    ***********************/} 
      <TouchableOpacity style={{width:"22%"}} onPress={()=>{setFilterVisible(!filterVisible)}} >
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
           

        {/*********************  SPECIALIZATION Dropdown   ***********************/}
        <Text style={styles.text_footer}> Specialization </Text>
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
        <Text style={styles.text_footer}> City </Text>
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
        <Text style={styles.text_footer}> Region </Text>
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
        {/*********************  APPLY Button  ***********************/}
      <TouchableOpacity onPress={( )  => 
        { setSortingCategory(null)
          setFilterVisible(false)
          setFilteredResult([])
          setResult([])
          console.log(filterCriteria)
          const promise = fetchDoctorsDataHandle(filterCriteria);
          promise.then(fetchedDoctors => {
            //console.log("here" , fetchedDoctors);
            // Set the data with fetched data
            setResult(fetchedDoctors)
            setFilteredResult(fetchedDoctors)
          });
          // fetch doctors list with new filters (  closures : filterCriteria )

        }
          
          } style={[styles.exitButton,{marginTop:20}]}>
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
                Apply
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
        <ResultList  result={filteredResult} navigation={props.navigation} />
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
    fontSize: 16,
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
    marginTop:15,
    // textAlign:"center",
    textAlignVertical:"center",
  }
});

export default SearchScreen;
