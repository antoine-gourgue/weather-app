"use client"
import Image from 'next/image'
import {NextPage} from "next";
import {Paper, TextInput,Button, Text, Group} from "@mantine/core";
import {useState} from "react";
import {Simulate} from "react-dom/test-utils";

const API_KEY = "41abed50f568cc08fd3bebc33eab1b8f";

export default function Home() {
    const [cityInput, setCityInput] = useState("");

    const  [weatherData, setWeatherData] = useState<any>({});

    async function  getWeatherData(){
        try {
            const serverResponse = await  fetch(
                "https://api.openweathermap.org/data/2.5/weather?" +
                "q=" +
                cityInput +
                "&appid=" +
                API_KEY +
                "&units=metric"
            )
            const  data = await serverResponse.json();
            if (data?.cod  == "400") throw data;
            setWeatherData(data);
            }catch (err) {
            console.log(err);
        }
    }

    return (
        <div style={{
            position: "static",
            height: "100vh",
            backgroundImage: "url('https://littlevisuals.co/images/atlantic_ridge.jpg')",
            backgroundSize: "cover"
        }}>
            <div style={{
                position:"absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)"
            }}>
                <Paper withBorder p="lg" style={{maxWidth: "500px"}}>
                    <Group position="apart">
                        <Text size="xl" weight={500}>
                            Get the Weather !
                        </Text>
                    </Group>
                    <Group position="apart">
                        <Text size="lg">
                            Enter a city, and get the weather below !
                        </Text>
                    </Group>
                    <Group position="apart" mb="xs">
                        <TextInput
                            label="City Name"
                            placeholder="ex : San Diego"
                            onChange={(e) => setCityInput((e.target.value))}
                        />
                    </Group>
                    <Group position="apart">
                        <Button className="bg-sky-500 hover:bg-sky-700 px-4 py-2 rounded-xs text-white" onClick={() => getWeatherData()}>
                            Get Weather
                        </Button>
                    </Group>
                    {weatherData.main !== undefined && cityInput !== "" ?
                    <>
                        <Group position="apart">
                            <Text>
                                {weatherData.name} Weather
                            </Text>
                        </Group>
                        <Group position="apart">
                            <img
                                src={"http://openweathermap.org/img/wn/" + weatherData.weather[0].icon + "@4x.png"}
                                width="100px"
                                height="100px"
                            />
                            <Text size="lg" weight={500}>
                                Currently {weatherData.main.temp} &deg;C
                            </Text>
                        </Group>
                    </>
                    : null }
                </Paper>
            </div>

        </div>
    )
}
