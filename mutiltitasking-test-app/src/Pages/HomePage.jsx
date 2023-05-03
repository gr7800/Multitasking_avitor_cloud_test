import { Box, Flex, Heading, Text, Divider, Image, Spacer } from "@chakra-ui/react";
import React, { useEffect } from 'react'
import overviewImage from "../utills/Repersentation.jpg"
import numberedimage from "../utills/number_schedule.jpg"
import altitudevalue from "../utills/Altutde_picture.jpg"
import DifficultyCheckboxGroup from "../Components/DifficultyCheckboxGroup";

const HomePage = () => {
    const user = JSON.parse(localStorage.getItem("muserscore")) || {}
    // const [score, setScore] = useState({})
    useEffect(() => {
        if(user.length===0){
            localStorage.setItem("muserscore", JSON.stringify({
                "easy": 0,
                "medium": 0,
                "hard": 0,
            }))
            localStorage.setItem("noquestion", 0);
        }  
    }, [user]);


    return (
        <Flex bg="gray.200" direction={{ base: "column", md: "row" }} gap={"20px"} justify="center" align="center" minH="100vh" padding={"0px 25px 0px 25px"} bgColor="#e9e5d9" >
            <Box px={{ base: 4, md: 8 }} py={8} w={{ base: "100%", md: "70%" }}  >
                <Heading as="h1" size="xl" fontWeight={"normal"} mb={4} w="100%" textAlign={"left"}>Multitasking</Heading>
                <Divider color={"white"} border={"1px solid white"} />
                <Heading as="h3" size="md" fontWeight={"normal"} mb={4} mt={4} w="100%" textAlign={"left"}>
                    Overview :
                </Heading>
                <Box overflowX={"hidden"} overflowY={"scroll"} height={"500px"}>
                    <Text fontSize="small" mb={5} w={"100%"} textAlign="left">
                        This test measures your multi-tasking and decision-making capability.
                    </Text>
                    <Heading as="h3" size="md" mb={"2"} fontWeight={"normal"} w="100%" textAlign={"left"}>
                        Representation :
                    </Heading>
                    <Box>
                        <Image src={overviewImage} alt="img" width={"90%"} />
                    </Box>
                    <Text fontSize="small" mt={"2"} mb={"2"} w={"100%"} textAlign="left">
                        There are two tasks in this test that candidate must performe.
                    </Text>
                    <Text fontSize="small" w={"100%"} textAlign="left">
                        -Cancel the red lights <br />
                        -Set the correct values on the autopilot panel.
                    </Text>
                    <Heading as="h3" size="md" mb={"2"} fontWeight={"normal"} w="100%" textAlign={"left"}>
                        Red alert lights
                    </Heading>
                    <Text fontSize="small" w={"100%"} mb={"2"} textAlign="left">
                        The upper part there arevtwo groups of 9 squares each, which repesent signal lights that will be turned on in random order.
                    </Text>
                    <Text fontSize="small" w={"100%"} mb={"2"} textAlign="left">
                        Your task is turn o0ff any lights that appears by pressing the numeric keypad button. according to schedule in following figure.
                    </Text>
                    <Box>
                        <Image src={numberedimage} alt="img" />
                    </Box>
                    <Heading as="h3" size="md" mb={"2"} fontWeight={"normal"} w="100%" textAlign={"left"}>
                        Altitude, speed and heading
                    </Heading>
                    <Text fontSize="small" w={"100%"} mb={"2"} textAlign="left">
                        The values given in the right Autopilot panel should be adjusted to correspond in the left pannel using keyboard keys or buttons on the screen of the mobile device. It is not possible to just enter numbers with the keyboard in the panel fields, the values are adjusted with the corresponding keys.
                    </Text>
                    <Spacer />
                    <Text fontSize="small" w={"100%"} mb={"2"} textAlign="left">
                        In the following situation in the picture below, the following values should be set on the left side:
                    </Text>
                    <Heading as="h3" size="md" mb={"2"} fontWeight={"normal"} w="100%" textAlign={"left"}>
                        Altitude: 12000 <br />
                        Speed: 270 <br />
                        Heading: 175
                    </Heading>
                    <Box>
                        <Image src={altitudevalue} alt="img" />
                    </Box>
                    <Text fontSize="small" w={"100%"} mb={"2"} mt={"2"} textAlign="left">
                        The following keys on the keyboard are used for this part of the test:
                    </Text>
                    <Text fontSize="small" w={"100%"} mb={"2"} textAlign="left">
                        <span style={{textDecoration:"underline"}}>Altitude:</span> and + keys <br />
                        <span style={{textDecoration:"underline"}}>Speed:</span> Up and Down arrow keys <br />
                        <span style={{textDecoration:"underline"}}>Heading:</span> Left and Right arrow keys
                    </Text>
                    <Text fontSize="small" w={"100%"} mb={"5"} textAlign="left">
                       To access this testfrom a touchscreen device, You will be shown a special panel with control buttons on a right side.
                    </Text>
                    <Heading as="h3" size="md" mb={"2"} fontWeight={"normal"} w="100%" textAlign={"left"}>
                        Duration
                    </Heading>
                    <Text fontSize="small" w={"100%"} mb={"5"} textAlign="left">
                       The duration of the test is 5 minutes.
                    </Text>
                    <Heading as="h3" size="md" mb={"2"} fontWeight={"normal"} w="100%" textAlign={"left"}>
                        Score
                    </Heading>
                    <Text fontSize="small" w={"100%"} mb={"5"} textAlign="left">
                       Scoring is based on your performance
                    </Text>
                </Box>
            </Box>
            <Box px={{ base: 4, md: 8 }} py={8} w={{ base: "100%", md: "30%" }} p={"20px"} >
                <Box overflowX={"hidden"} overflowY={"scroll"} maxHeight={"300px"} marginBottom={"20px"}>
                    <Box bg="white" border="2px solid black" borderBottom={"none"} w="100%" p={4}>
                        <Heading as="h3" size="md" fontWeight={"medium"} m="auto" color={"#757575"} w={"80%"} textAlign="left">Easy</Heading>
                        <Text color={"#757575"} fontSize="lg">Your Average Score: <span style={{ "color": "red" }}>{user.easy}%</span></Text>
                        <Text color={"#757575"} fontSize="lg">Global Score: 100%</Text>
                    </Box>
                    <Box bg="white" border="2px solid black" borderBottom={"none"} w="100%" p={4}>
                        <Heading as="h3" size="md" fontWeight={"medium"} m="auto" color={"#757575"} w={"80%"} textAlign="left">Medium</Heading>
                        <Text color={"#757575"} fontSize="lg">Your Average Score: <span style={{ "color": "red" }}>{user.medium}%</span></Text>
                        <Text color={"#757575"} fontSize="lg">Global Score: 98%</Text>
                    </Box>
                    <Box bg="white" border="2px solid black" borderBottom={"none"} w="100%" p={4}>
                        <Heading as="h3" size="md" fontWeight={"medium"} m="auto" color={"#757575"} w={"80%"} textAlign="left">Hard</Heading>
                        <Text color={"#757575"} fontSize="lg">Your Average Score: <span style={{ "color": "red" }}>{user.hard}%</span></Text>
                        <Text color={"#757575"} fontSize="lg">Global Score: 85%</Text>
                    </Box>
                </Box>
                <Box>
                    <Heading size={"md"} as={"h3"} fontWeight="medium" w={"100%"} textAlign="left">Difficulty</Heading>
                    <DifficultyCheckboxGroup />
                </Box>
            </Box>
        </Flex >
    );
}

export default HomePage;
