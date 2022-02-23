import React, { useState, useEffect } from 'react';
import {Line, Bar, Pie} from 'react-chartjs-2';
import { Chart, registerables, ArcElement, Tooltip, Legend } from 'chart.js';
import styles from './ChartView.module.css';
import { toJS } from 'mobx'


const ChartView = (props) => {
  const [data, setData] = useState({
    docs: []
  });
  Chart.register(...registerables);
  Chart.register(ArcElement, Tooltip, Legend);
  useEffect(() => {
    const obj = toJS(props.data);
    setData(obj);
    //console.log("ChartView => ", props.country, props.data)
    // console.log("ChartView => ", props.data, obj, data);
    // let tmp = (obj.docs)? obj.docs.filter((dt) => dt.quality==="Low").map((dt) => dt.year): [];
    // let tmp1 = (obj.docs)? obj.docs.filter((dt) => dt.quality==="High").map((dt) => dt.count): [];
    // console.log(tmp, tmp1)
  }, [props.data]);

  const getData = () => {
    let series = [];
    if (data.docs)
    {
      //console.log("getdata... => ")
      let series1 = {
      label: 'Dataset-Low',
      data: data.docs.filter((dt) => dt.quality==="Low").map((dt) => dt.count),
      //data: [32, 88, 74, 70, 94, 80, 45, 89, 86, 67],
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
      }
      let series2 = {
        label: 'Dataset-High',
        data: data.docs.filter((dt) => dt.quality==="High").map((dt) => dt.count),
        //data: [32, 88, 74, 70, 94, 80, 45, 89, 86, 67],
        backgroundColor:  'rgba(54, 162, 235, 0.2)',
      }

      if (series1.data.length)
      {
        //console.log("getdata1... => ")
        series.push(series1);
      }
      if (series2.data.length)
      {
        //console.log("getdata2... => ")
        series.push(series2);
      }
    }
    return series;
  }

  const getLabels = () => {
    let labels_items = [];
    if (data.docs)
    {
      let label1 = data.docs.filter((dt) => dt.quality==="Low").map((dt) => String(dt.year) + "-" + String(dt.status))
      let label2 = data.docs.filter((dt) => dt.quality==="High").map((dt) => String(dt.year) + "-" + String(dt.status))
      //console.log("get labels => ", label1.length, label2.length, label1, label2)
      if (label1.length)
      {
        labels_items = (label1)
      } 
      else if(label2.length)
      {
        labels_items = (label2)
      }
    }
    console.log("labelitems => ", labels_items);
    return labels_items;
  }

  const lineChart = data.docs ? (
    <Line
      data={{
        labels: getLabels(),
        datasets: getData(),
      }}
    />
  ) : null;

  const barChart = (
    data.docs ? (
      <Bar 
      data = {{
        labels: getLabels(),
        //labels: ['2002', '2004', '2003', '2005', '2001', '2003', '2002', '2004', '2001', '2005'],
        datasets: getData(),
      }} 
      options={{
        legend: {display: false},
        title: {display: true, text:"Bar Chart"},
      }} 
      />
    ) : null
  )

  const data1 = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
  
  const pieChart = (
    data.docs ? (
      <Pie 
      data = {{
        labels: data.docs.map((dt) => String(dt.year) + "-" + String(dt.quality)),
        datasets: [
          {
            label: '# of Votes',
            data:  data.docs.map((dt) => dt.count),
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      }}
      options={{
        legend: {display: false},
        title: {display: true, text: "Pie Chart"},
      }} 
      />
    ) : null
  )
  return <div className={styles.container} style={{margin:"auto"}}>{props.country==="0"? pieChart  : props.country==="1"? barChart: lineChart}</div>;
};

export default ChartView;
