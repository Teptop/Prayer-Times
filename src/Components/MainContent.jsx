import Grid from "@mui/material/Grid2";
import { Typography } from '@mui/material';
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Prayers from "./Prayers";
import axios from "axios";
import moment from "moment";
import { useState, useEffect } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import "moment/dist/locale/ar-dz";

import { ThemeProvider, createTheme } from '@mui/material/styles';

moment.locale("ar");

export default function MainContent() {

  const theme = createTheme({
    typography: {
      fontFamily: 'IBM Plex Sans Arabic, sans-serif',// Set your custom font here
    },
  });
  

  const [nextPrayerIndex,setNextPrayerIndex] = useState(0)

  const [timings, setTimings] = useState({
    Fajr: "04:55",
    Dhuhr: "11:33",
    Asr: "14:29",
    Sunset: "16:48",
    Isha: "18:18",
  });

  const [selectedCity, setSelectedCity] = useState({
    displayName: "مكة المكرمة",
    apiName: "Makkah al Mukarramah",
  });

  const [today, setToday] = useState("");


  const avilableCity = [
    {
      displayName: "مكة المكرمة",
      apiName: "Makkah al Mukarramah",
    },
    {
      displayName: "الرياض",
      apiName: "Ar Riyāḑ",
    },
    {
      displayName: "المدينة",
      apiName: "Al Madīnah al Munawwarah",
    },
    {
      displayName: "القصيم",
      apiName: "Al Qaşīm",
    },
  ];

  const prayerArray = [
    {key:'Fajr', displayName:'الفجر'},
    {key:'Dhuhr', displayName:'الضهر'},
    {key:'Asr', displayName:'العصر'},
    {key:'Sunset', displayName:'المغرب'},
    {key:'Isha', displayName:'العشاء'},
  ];

  const getTimings = async () => {
    const response = await axios.get(
      `https://api.aladhan.com/v1/timingsByCity?country=SA&city=${selectedCity.apiName}`
    );
    setTimings(response.data.data.timings);
    console.log(response.data.data)
  };
  useEffect(() => {
    getTimings();
  }, [selectedCity]);

  useEffect(() => {
    let interval = setInterval(() => {
      setupCountdownTimer();
    }, 1000);

    const t = moment();
    // DD-MM-YYYY
    setToday(t.format("DD-MM-YYYY | h:mm"));
    // MMM D Y | h:mm

    return () => {
      clearInterval(interval);
    };
  });

  const setupCountdownTimer = () => {
    const momentNow = moment();

    let prayerIndex = 0;

    if (
      momentNow.isAfter(moment(timings.Fajr, "hh:mm")) &&
      momentNow.isBefore(moment(timings.Dhuhr, "hh:mm"))
    ) {
      prayerIndex = 1
    } else  if (
      momentNow.isAfter(moment(timings.Dhuhr, "hh:mm")) &&
      momentNow.isBefore(moment(timings.Asr, "hh:mm"))
    ) {
      prayerIndex = 2
    }
    else  if (
      momentNow.isAfter(moment(timings.Asr, "hh:mm")) &&
      momentNow.isBefore(moment(timings.Sunset, "hh:mm"))
    ) {
      prayerIndex = 3
    }
    else  if (
      momentNow.isAfter(moment(timings.Sunset, "hh:mm")) &&
      momentNow.isBefore(moment(timings.Isha, "hh:mm"))
    ) {
      prayerIndex = 4
    }
    else {
      prayerIndex = 0
    }

    setNextPrayerIndex(prayerIndex)

  };

  const handleCityChange = (event) => {
    const cityObject = avilableCity.find((city) => {
      return city.apiName == event.target.value;
    });
    console.log(event.target.value);
    setSelectedCity(cityObject);
  };
  return (
    <>
    <ThemeProvider theme={theme}>
      {/* TOP ROW */}

      <Grid
      sx={{
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        '@media (max-width: 600px)': { // يتم تفعيل هذا الشرط فقط في الشاشات الصغيرة
          
        }
      }}
      marginTop={{
        xs:3,
        sm:3,
        
      }}
      container spacing={2}>

        <Grid
        size={{
           xs: 5, // 0
            sm: 6, // 600 
            md: 6, // 900
            lg: 6, // 1200
            xl: 6, // 1536
        }}>
          <div>
            <Typography
             variant="h5"
             color="white"
             sx={{
               fontSize:{
                 xs: '1rem', // Small screens (xs)
                 sm: '1.3rem', // Small to medium screens (sm)
                 md: '1.8rem', // Medium screens (md)
                 lg: '2rem', // Large screens (lg)
                 xl: '2rem', // Extra large screens (xl)
               }
             }}
            >{today}</Typography>
            <Typography 
            variant="h2"
            color="white"
            sx={{
              fontWeight:"400",
              fontSize:{
                xs: '2rem', // Small screens (xs)
                sm: '3rem', // Small to medium screens (sm)
                md: '4rem', // Medium screens (md)
                lg: '5rem', // Large screens (lg)
                xl: '5rem', // Extra large screens (xl)
              }
            }}
            >{selectedCity.displayName}</Typography>
          </div>
        </Grid>
        <Grid 
        // sx={{background:"red"}}
        size={{
           xs: 4, // 0
            sm: 6, // 600 
            md: 6, // 900
            lg: 6, // 1200
            xl: 6, // 1536
        }}>
          <div>
            <Typography
              variant="h5"
              color="white"
              sx={{
                fontSize:{
                  xs: '1rem', // Small screens (xs)
                  sm: '1.3rem', // Small to medium screens (sm)
                  md: '1.8rem', // Medium screens (md)
                  lg: '2rem', // Large screens (lg)
                  xl: '2rem', // Extra large screens (xl)
                }
              }}
            >الصلاة القادمة :</Typography>
            <Typography
            color="white"
             variant="h2"
             sx={{
              fontWeight:"400",
               fontSize:{
                 xs: '2rem', // Small screens (xs)
                 sm: '3rem', // Small to medium screens (sm)
                 md: '4rem', // Medium screens (md)
                 lg: '5rem', // Large screens (lg)
                 xl: '5rem', // Extra large screens (xl)
               }
             }}
            >{prayerArray[nextPrayerIndex].displayName}</Typography>
            {/* <h1>00:10:20</h1> */}
          </div>
        </Grid>
      </Grid>

      {/*// TOP ROW //*/}

      <Divider style={{ marginTop:"2rem",borderColor: "white", opacity: "0.1" }} />

        <Grid 
         container
         columnGap={{xs:2,sm:3,lg:3,md:3}}
         rowGap={{xs:4,sm:5}}
         spacing={{xs:3,sm:2,md:3,lg:0}}  
         display="flex"
         justifyContent="center"
         alignItems='center'
         style={{marginTop: "50px"}}>
        
          
          <Grid style={{display:'flex',justifyContent:'center'}}  size={{ xs:12, sm:2, md:2, lg:2, xl:2}}>
        <Prayers
          name="الفجر"
          time={timings.Fajr}
          image="https://cdn.pixabay.com/photo/2024/03/09/13/24/prayer-8622629_1280.jpg"
        />
         </Grid>
         <Grid style={{display:'flex',justifyContent:'center'}}  size={{ xs: 12, sm:2, md:2, lg:2, xl:2}}>
        <Prayers
          name="الضهر"
          time={timings.Dhuhr}
          image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0vRif9-W20IC2keU-vsuS1mHedBvF-2jqxyy6AtF0hfXZRchs4VEU0pVE8IqZzl44UTk&usqp=CAU"
        />
         </Grid>

         <Grid style={{display:'flex',justifyContent:'center'}}  size={{ xs: 12, sm:2, md:2, lg:2, xl:2}}>
        <Prayers
          name="العصر"
          time={timings.Asr}
          image="https://cdn.pixabay.com/photo/2024/05/29/23/45/praying-8797403_640.jpg"
        />
        </Grid>

         <Grid style={{display:'flex',justifyContent:'center'}}  size={{ xs: 12, sm:2, md:2, lg:2, xl:2}}>
        <Prayers
          name="المغرب"
          time={timings.Sunset}
          image="https://img.freepik.com/premium-photo/muslim-man-sitting-holding-quran-with-view-mosque-eid-ul-adha-mubarak-day-background-illustration-generative-ai-illustration_993599-2241.jpg"
        />
        </Grid>

         <Grid style={{display:'flex',justifyContent:'center'}}  size={{ xs: 12, sm:2, md:2, lg:2, xl:2}}>
        <Prayers
          name="العشاء"
          time={timings.Isha}
          image="https://img.freepik.com/free-photo/teenage-girl-with-praying-sunny-nature_1150-7219.jpg?semt=ais_hybrid"
        />
        </Grid>
        </Grid>

      <Stack
        sx={{marginTop:6,marginBottom:{xs:5}}}
        direction="row"
        justifyContent={"center"}
      >
        <FormControl 
         sx={{
          width: {
            xs: "45%",   // في شاشات الجوال (صغيرة) عرض العنصر سيكون 90% من العرض
            sm: "20%",   // في الشاشات المتوسطة (مثل الأجهزة اللوحية) العرض سيكون 50%
            md: "20%",   // في الشاشات الكبيرة العرض سيكون 20% كما هو في الكود الأصلي
          },
        }}
        >
          <InputLabel id="demo-simple-select-label">
            <span style={{ color: "white" }}>مكة المكرمة</span>
          </InputLabel>
          <Select
            style={{ color: "white" }}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            // value={age}
            label="Age"
            onChange={handleCityChange}
          >
            {avilableCity.map((city, id) => {
              return (
                <MenuItem key={id} value={city.apiName}>
                  {city.displayName}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Stack>
      </ThemeProvider>
    </>
  );
}
