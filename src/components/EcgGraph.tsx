import * as d3 from "d3";
import { useCallback, useEffect } from "react";
import { useSensorData } from "../context/SensorDataContext";
let dimensions = {
  width: 575,
  height: 500,
  left: 100,
  right: 50,
  top: 20,
  bottom: 70,
};

const EcgGraph = () => {
  const { latestEcgData } = useSensorData();

  if (document.getElementById("graph-container")?.clientWidth)
    dimensions.width =
      0.9 * document.getElementById("graph-container")!.clientWidth;

  const draw = useCallback(() => {
    // Remove current svg
    d3.select(".line-chart-svg").select("svg").remove();
    // SVG
    const svg = d3
      .select(".line-chart-svg")
      .append("svg")
      .attr("width", dimensions.width + dimensions.left + dimensions.right)
      .attr("height", dimensions.height + dimensions.top + dimensions.bottom)
      .append("g")
      .attr("transform", `translate(${dimensions.left},${dimensions.top})`);

    // X
    const x = d3
      .scaleTime()
      .domain(
        d3.extent(latestEcgData!, (d) => {
          return d.timeElapsed;
        }) as any
      )
      .range([0, dimensions.width]);

    svg
      .append("g")
      .attr("transform", `translate(0, ${dimensions.height})`)
      .attr("class", "x-axis")
      .call(d3.axisBottom(x).tickSizeOuter(0).tickPadding(10).tickValues([]))
      .call((g) => g.select(".domain").remove());

    // Y

    const yDomain = [-200, 400] as number[];

    const y = d3
      .scaleLinear()
      .domain([yDomain[0], yDomain[yDomain.length - 1]])
      .range([dimensions.height, 0]);

    svg
      .append("g")
      .call(d3.axisLeft(y).tickSizeOuter(0).tickPadding(10))
      .call((g) => g.select(".domain").remove());

    svg
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -dimensions.left)
      .attr("x", 0 - dimensions.height / 2)
      .attr("dy", "2em")
      .style("text-anchor", "middle")
      .style("fill", "#fff")
      .text("ECG Value");

    svg
      .append("path")
      .datum(latestEcgData)
      .attr("fill", "none")
      .attr("stroke", "red")
      .attr("stroke-width", 1)
      .attr(
        "d",
        // @ts-ignore
        d3
          .line()
          .x((d) => {
            return x((d as unknown as any).timeElapsed);
          })
          .y((d) => {
            return y((d as unknown as any).ecg);
          })
          .curve(d3.curveBasis)
      );
  }, [latestEcgData]);

  useEffect(() => {
    if (latestEcgData) draw();
  }, [latestEcgData, draw]);

  return (
    <div className="bg-black h-100" style={{ minHeight: 500 }}>
      <div className="line-chart-svg" />
    </div>
  );
};

export default EcgGraph;
