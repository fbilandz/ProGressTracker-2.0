import React, { useEffect, useState } from 'react'
import { Doughnut } from 'react-chartjs-2'

interface Props {
  title: string,
  data: Array<{ label: string, value: number }>,
  colors: any,
  size: number
}

const DoughnutChart: React.FunctionComponent<Props> = (props: Props) => {
  const [chartData, setChartData] = useState<any>({
    labels: props.data.map((d: { label: any }) => d.label),
    datasets: [{
      label: props.title,
      data: props.data.map((d: { value: any }) => d.value),
      backgroundColor: props.colors,
      pointRadius: 2,
      borderColor: "#fff",
      borderWidth: 1,
      lineTension: 0,
      weight: 5,
    }],
    text: props.data.map((d: { value: any }) => d.value).reduce((a: any, b: any) => a + b, 0) + ' m'
  })

  useEffect(() => {
    let data = { ...chartData }
    console.log(props.data)
    data.labels = props.data.map(d => d.label)
    data.datasets[0].data = props.data.map(d => d.value)
    data.text = props.data.map(d => d.value).reduce((a, b) => a + b, 0) + ' m'

    setChartData(data)
  }, [props])

  return (
    <Doughnut
      data={chartData}
      options={{
        maintainAspectRatio: false,
        cutoutPercentage: 75,
        title: {
          display: true,
          text: props.title
        }
      }}
      width={window.innerWidth * props.size} 
      height={window.innerWidth * props.size} />
  )
}

export default DoughnutChart
