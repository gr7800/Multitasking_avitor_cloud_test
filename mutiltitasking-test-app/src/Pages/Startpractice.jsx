import React, { useEffect, useState } from 'react'
import { Box, CircularProgress, Flex, Progress, Text } from "@chakra-ui/react"

import { useNavigate } from "react-router-dom"

const Startpractice = () => {
    const [seconds, setSeconds] = useState(15);
    const [redSquare, setRedSquare] = useState(1);
    const [totalredq, setTotalRedQ] = useState(1);
    const [colorscore, setColorScore] = useState(0);

    let navigate = useNavigate();


    const [data, setData] = useState({
        "Altitude": 12000,
        "Speed": 270,
        "Heading": 175
    })
    const [udata, setUdata] = useState({
        "Altitude": 0,
        "Speed": 0,
        "Heading": 0
    })
    const [altitudeS, setAltitudeScore] = useState(0)
    const [totalAltutudeQ, setTotalAltitudeQ] = useState(1);

    function generateRandomData() {
        const keys = Object.keys(data);
        const randomKeyIndex = Math.floor(Math.random() * keys.length);
        const randomKey = keys[randomKeyIndex];
        let randomValue;
        if (randomKey === "Altitude") {
            randomValue = (Math.floor(Math.random() * 36)) * 1000;
        } else if (randomKey === "Speed") {
            let randomNumber = Math.floor(Math.random() * 101) * 10;
            randomValue = (randomNumber > 1000) ? 1000 : randomNumber
        } else {
            let randomNumber = Math.floor(Math.random() * 72) * 5;
            randomValue = (randomNumber <= 360) ? randomNumber : 360
        }
        // generates a random number between 0 and 100
        setTotalAltitudeQ(totalAltutudeQ + 1);
        setData(prevState => ({
            ...prevState,
            [randomKey]: randomValue
        }));
    }


    // Handler function for keydown event

    useEffect(() => {
        const interval = setInterval(() => {
            const randomSquare = Math.floor(Math.random() * 18) + 1;
            setRedSquare(randomSquare);
            let temp = totalredq + 1;
            setTotalRedQ(temp)
        }, 10000);

        const numbergenid = setInterval(() => {
            generateRandomData();
        }, 7000)

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            clearInterval(interval);
            clearInterval(numbergenid);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [redSquare]); // Add redSquare to dependency array

    const handleKeyDown = (event) => {
        const key = event.key;
        if (key >= "1" && key <= "9") {
            if (+redSquare === +key || +redSquare === Number(key) + 9) {
                let temp = colorscore + 1;
                setColorScore(temp);
            }
            setRedSquare(0);
        } else if (key === "+") {
            setUdata((prevState) => ({
                ...prevState,
                Altitude: prevState.Altitude + 1000,
            }));
        } else if (key === "-") {
            setUdata((prevState) => ({
                ...prevState,
                Altitude: prevState.Altitude - 1000,
            }));
        } else if (key === "ArrowUp") {
            setUdata((prevState) => ({
                ...prevState,
                Speed: prevState.Speed + 10,
            }));
        } else if (key === "ArrowDown") {
            setUdata((prevState) => ({
                ...prevState,
                Speed: prevState.Speed - 10,
            }));
        } else if (key === "ArrowLeft") {
            setUdata((prevState) => ({
                ...prevState,
                Heading: prevState.Heading - 5,
            }));
        } else if (key === "ArrowRight") {
            setUdata((prevState) => ({
                ...prevState,
                Heading: prevState.Heading + 5,
            }));
        }

    };

    useEffect(() => {
        if (+data.Altitude === +udata.Altitude && +data.Heading === +udata.Heading && +data.Speed === +udata.Speed) {
            setAltitudeScore(altitudeS + 1);
        }

        console.log(altitudeS, colorscore)
    }, [data, udata, colorscore, totalAltutudeQ]);

    useEffect(() => {
        let interval = null;
        if (seconds === 0) {
            setSeconds(15);
        } else {
            interval = setInterval(() => {
                setSeconds((seconds) => seconds - 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [seconds]);

    const [elapsedTime, setElapsedTime] = useState(0);
    const totalTime = 60; // 5 minutes in seconds
    const minutes = Math.floor((totalTime - elapsedTime) / 60);
    const ms = elapsedTime % 60;

    useEffect(() => {
        if (minutes < 0) {
            let colorPercentage = (colorscore / totalredq) * 100
            let AltitudePercentage = (altitudeS / totalAltutudeQ) * 100
            let avragepercentage = (colorPercentage + AltitudePercentage) / 2;
            console.log(colorPercentage,AltitudePercentage,avragepercentage)
            navigate("/result",{
                state: { colorPercentage: colorPercentage, AltitudePercentage: AltitudePercentage, avragepercentage: avragepercentage }
              });

              
        }
        const intervalId = setInterval(() => {
            setElapsedTime(prevElapsedTime => prevElapsedTime + 1);
        }, 1000);

        return () => clearInterval(intervalId);
    }, [elapsedTime]);

    const progress = (elapsedTime / totalTime) * 100;




    return (
        <Box bg="aquamarine" > 
            <Box width={"100%"} display={"flex"} justifyContent={"flex-end"}>
                <CircularProgress
                    value={progress}
                    max={100}
                    color={progress < 50 ? "green.400" : progress < 80 ? "yellow.400" : "red.400"}
                    size="120px"
                    thickness="8px"
                    capIsRound
                >
                    <svg style={{
                        fontSize: "20px",
                        fill: "currentColor",
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                    }}>
                        <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle">
                            {minutes < 10 ? `0${minutes}` : minutes}:{ms < 10 ? `0${ms}` : ms}
                        </text>
                    </svg>
                </CircularProgress>
            </Box>
            <Box bg={"antiquewhite"} display={"flex"} flexDirection={"column"} rowGap={"50px"} border={"10px solid #ccc"} width={{ base: "100%", md: "50%" }} margin={"auto"} borderRadius={"15px"} padding={"20px"}>
                <Box display={"flex"} justifyContent={"space-between"}>
                    <Box display="grid" gridTemplateColumns="repeat(3, 33px)" gap={2} rowGap={2} >
                        <Box
                            id="1"
                            bg={redSquare === 1 ? 'red' : '#ccc'}
                            height={"33px"}
                            borderRadius={"10%"}
                        ></Box>
                        <Box
                            id="2"
                            bg={redSquare === 2 ? 'red' : '#ccc'}
                            height={"33px"}
                            borderRadius={"10%"}
                        ></Box>
                        <Box
                            id="3"
                            bg={redSquare === 3 ? 'red' : '#ccc'}
                            height={"33px"}
                            borderRadius={"10%"}
                        ></Box>
                        <Box
                            id="4"
                            bg={redSquare === 4 ? 'red' : '#ccc'}
                            height={"33px"}
                            borderRadius={"10%"}
                        ></Box>
                        <Box
                            id="5"
                            bg={redSquare === 5 ? 'red' : '#ccc'}
                            height={"33px"}
                            borderRadius={"10%"}
                        ></Box>
                        <Box
                            id="6"
                            bg={redSquare === 6 ? 'red' : '#ccc'}
                            height={"33px"}
                            borderRadius={"10%"}
                        ></Box>
                        <Box
                            id="7"
                            bg={redSquare === 7 ? 'red' : '#ccc'}
                            height={"33px"}
                            borderRadius={"10%"}
                        ></Box>
                        <Box
                            id="8"
                            bg={redSquare === 8 ? 'red' : '#ccc'}
                            height={"33px"}
                            borderRadius={"10%"}
                        ></Box>
                        <Box
                            id="9"
                            bg={redSquare === 9 ? 'red' : '#ccc'}
                            height={"33px"}
                            borderRadius={"10%"}
                        ></Box>
                    </Box>
                    <Box display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"} width={"100%"} >
                        <Text>{seconds}</Text>
                        <Progress value={(seconds / 15) * 100} mt={2} width={"80%"} />
                    </Box>
                    <Box display="grid" gridTemplateColumns="repeat(3, 33px)" gap={2}>
                        <Box
                            id="10"
                            bg={redSquare === 10 ? 'red' : '#ccc'}
                            onClick={() => setRedSquare(null)}
                            height={"33px"}
                            borderRadius={"10%"}
                        ></Box>
                        <Box
                            id="11"
                            bg={redSquare === 11 ? 'red' : '#ccc'}
                            onClick={() => setRedSquare(null)}
                            height={"33px"}
                            borderRadius={"10%"}
                        ></Box>
                        <Box
                            id="12"
                            bg={redSquare === 12 ? 'red' : '#ccc'}
                            onClick={() => setRedSquare(null)}
                            height={"33px"}
                            borderRadius={"10%"}
                        ></Box>
                        <Box
                            id="13"
                            bg={redSquare === 13 ? 'red' : '#ccc'}
                            onClick={() => setRedSquare(null)}
                            height={"33px"}
                            borderRadius={"10%"}
                        ></Box>
                        <Box
                            id="14"
                            bg={redSquare === 14 ? 'red' : '#ccc'}
                            onClick={() => setRedSquare(null)}
                            height={"33px"}
                            borderRadius={"10%"}
                        ></Box>
                        <Box
                            id="15"
                            bg={redSquare === 15 ? 'red' : '#ccc'}
                            onClick={() => setRedSquare(null)}
                            height={"33px"}
                            borderRadius={"10%"}
                        ></Box>
                        <Box
                            id="16"
                            bg={redSquare === 16 ? 'red' : '#ccc'}
                            onClick={() => setRedSquare(null)}
                            height={"33px"}
                            borderRadius={"10%"}
                        ></Box>
                        <Box
                            id="17"
                            bg={redSquare === 17 ? 'red' : '#ccc'}
                            onClick={() => setRedSquare(null)}
                            height={"33px"}
                            borderRadius={"10%"}
                        ></Box>
                        <Box
                            id="18"
                            bg={redSquare === 18 ? 'red' : '#ccc'}
                            onClick={() => setRedSquare(null)}
                            height={"33px"}
                            borderRadius={"10%"}
                        ></Box>
                    </Box>
                </Box>
                {/* ................ PILOT INPUT PANEL ....................  */}

                <Box display={"flex"} justifyContent={"space-between"}>
                    <Box
                        bg="#1a1a1a"
                        borderRadius="10px"
                        boxShadow="inset 0px 0px 10px 0px rgba(255, 255, 255, 0.5)"
                        p="25px"
                    >
                        <Flex color={"#ccc"} direction="column" rowGap={"5px"}>
                            <Box display={"flex"} justifyContent={"space-between"} >
                                <Text>Altitude</Text>
                                <Text>:</Text>
                                <Text bg={"#ccc"} color={"black"} padding={"0px 5px 0px 5px"}>{udata.Altitude}</Text>
                            </Box>
                            <Box display={"flex"} justifyContent={"space-between"} >
                                <Text>Speed</Text>
                                <Text>:</Text>
                                <Text bg={"#ccc"} color={"black"} padding={"0px 5px 0px 5px"}>{udata.Speed}</Text>
                            </Box>
                            <Box display={"flex"} justifyContent={"space-between"} >
                                <Text>Heading</Text>
                                <Text>:</Text>
                                <Text bg={"#ccc"} color={"black"} padding={"0px 5px 0px 5px"}>{udata.Heading}</Text>
                            </Box>
                        </Flex>
                    </Box>
                    <Box
                        bg="#1a1a1a"
                        borderRadius="10px"
                        boxShadow="inset 0px 0px 10px 0px rgba(255, 255, 255, 0.5)"
                        p="25px"
                    >
                        <Flex color={"#ccc"} direction="column" rowGap={"5px"}>
                            <Box display={"flex"} justifyContent={"space-between"} >
                                <Text>Altitude</Text>
                                <Text>:</Text>
                                <Text>{data.Altitude}</Text>
                            </Box>
                            <Box display={"flex"} justifyContent={"space-between"} >
                                <Text>Speed</Text>
                                <Text>:</Text>
                                <Text>{data.Speed}</Text>
                            </Box>
                            <Box display={"flex"} justifyContent={"space-between"} >
                                <Text>Heading</Text>
                                <Text>:</Text>
                                <Text>{data.Heading}</Text>
                            </Box>
                        </Flex>
                    </Box>
                </Box>
            </Box>
        </Box >
    )
}

export default Startpractice