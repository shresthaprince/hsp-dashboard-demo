import { useEffect, useState } from "react";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

// Number of data points at an instance
const DATA_POINT_COUNT = 50;

type EcgData = {
    time: number;
    ecg: number
}

const EcgGraph = () => {
    const [ecgs, setEcgs] = useState<Array<EcgData>>(new Array(DATA_POINT_COUNT).fill({ time: 0, ecg: 0 }));

    useEffect(() => {
        const interval = setInterval(() => {
            ecgs.pop();
            let temp = [...ecgs];
            ecgs.unshift(generateRandomData());
            setEcgs(temp);
        }, 500)
        return () => clearInterval(interval)
    }, [])

    return (
        <div className="bg-dark h-100">
            <ResponsiveContainer width="90%" aspect={3}>
                <LineChart
                    width={500}
                    height={300}
                    data={ecgs}
                    margin={{
                        top: 15,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid vertical={false} horizontal={true} stroke="#243240" />
                    <XAxis dataKey="time" tick={{ fill: "#fff" }} />
                    <YAxis tick={{ fill: "#fff" }} />
                    <Tooltip contentStyle={{ backgroundColor: "#8884d8", color: "#fff" }} itemStyle={{ color: "#fff" }} cursor={true} />
                    <Line type="monotone" dataKey="ecg" stroke="#8884d8" strokeWidth="1" isAnimationActive={false} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}

export default EcgGraph;

const START_TIME = new Date();
const generateRandomData = () => ({ time: (new Date().getTime() - START_TIME.getTime()), ecg: Math.floor(Math.random() * 10) })