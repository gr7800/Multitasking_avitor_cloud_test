import { Box, Heading, Text } from '@chakra-ui/react'
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
// import { BaseUrl } from '../utills/helper';

const Result = () => {
  const location = useLocation();
  const navigate= useNavigate()
  const { colorPercentage, AltitudePercentage, avragepercentage } = location.state || {};

  return (
    <>
      <Box display={"flex"} flexDirection={"column"} mt={"-20px"} bg="gray.200" width={"100%"} height={"100vh"} justifyContent={"center"} alignContent={"center"} >
        <Heading m={"20px"} >Result</Heading>
        <Text>Your Red Alert Light Score : {colorPercentage}%</Text>
        <Text>Your Altitude,Speed,Heading : {AltitudePercentage}%</Text>
        <Text>Your Average Percentage : {avragepercentage}%</Text>
      </Box>
    </>
  );
};

export default Result
