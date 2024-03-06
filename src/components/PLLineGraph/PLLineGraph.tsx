import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { Theme } from "../../Utils/Constants";

interface Props {
  data: Record<string, Record<string, number>>;
  height?: number;
}

const LineGraph: React.FC<Props> = ({ data, height = 100 }) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart>();

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");
      if (ctx) {
        if (chartInstance.current) {
          // Destroy previous chart instance
          chartInstance.current.destroy();
        }

        const years = Object.keys(data);
        const sumByYear = years.map((year) => {
          return Object.values(data[year]).reduce(
            (acc, value) => acc + value,
            0,
          );
        });

        chartInstance.current = new Chart(ctx, {
          type: "line",
          data: {
            labels: years,
            datasets: [
              {
                label: "Your Startegy",
                data: sumByYear,
                fill: false,
                borderColor: "rgba(39, 71, 221, 1)",
                tension: 0.1,
              },
            ],
          },
          options: {
            scales: {
              x: {
                title: {
                  display: true,
                  text: "Year",
                },
              },
              y: {
                title: {
                  display: true,
                  text: "",
                },
              },
            },
            layout: {
              padding: {
                top: 10,
                bottom: 10,
                left: 10,
                right: 10,
              },
            },
          },
        });
      }
    }
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data, height]);

  return (
    <>
      <p style={styles.metricsHeader}>Relative Performance </p>
      <canvas ref={chartRef} height={height} />
    </>
  );
};

const styles = {
  metricsHeader: {
    color: Theme.colors.black70,
    fontSize: Theme.fontSizes.h2,
    margin: 1,
    padding: 16,
    width: "fit-content",
    fontWeight: Theme.fontWeight.semiBold,
    overflow: "hidden",
    borderBottom: "2px solid " + Theme.colors.whiteGrey70,
  },
};

export default LineGraph;
