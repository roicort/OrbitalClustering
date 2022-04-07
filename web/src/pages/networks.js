
import React, { version } from 'react'
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useState, useEffect, useRef} from "react";
import {Form, Button} from 'react-bootstrap'
import Graph from "../../node_modules/react-graph-vis";

import clsx from 'clsx';
import styles from './index.module.css';

import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar, getDatasetAtEvent } from 'react-chartjs-2';

var options = {
  nodes: {
    shape: "dot",
  },
  edges: {
    color: "#000000",
  },
  interaction: {
    hideEdgesOnDrag: true,
  },
  physics: false,
  height: "512px"
};


function loadJSON(path,FUN, error){
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        FUN(JSON.parse(xhr.responseText))
      }
      else {
        error(xhr);
      }
    }
  };
  xhr.open('GET', path, true);
  xhr.send();
}

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

export default function Home({...props}) {

  const {siteConfig} = useDocusaurusContext();

  let dset = {
    labels: ['Thing 1', 'Thing 2', 'Thing 3', 'Thing 4', 'Thing 5'],
    datasets: [],
  };

  const [text, setText] = useState(); // useState hook
  const [data, setData] = useState(dset); // useState hook
  const [graph, setGraph] = useState({
    nodes: [
    ],
    edges: [
    ]
  }); // useState hook

  useEffect(() => {
    loadJSON("data/networks.json", setGraph, function(err) {console.log('error')})
  }, []);

  const chartRef = useRef();

  var events = {
    select: (event) =>{

      var { nodes } = event;

      let nd = graph.nodes.find(x => x.id === nodes[0]);

      let c = nd.color

      let dset = [
        {
          label: nd.label,
          data: [nd.attributes[0],nd.attributes[1],nd.attributes[2],nd.attributes[3],nd.attributes[4]],
          backgroundColor: c.replace(")", ', 0.2)'),
          borderColor: c.replace(")", ', 1)'),
          borderWidth: 1,
        },
      ]

      data.datasets = dset;
      setData(data);
      setText(nd.label);
    }
  }

  // handle submit event

  return (
  <Layout title={`Hello from ${siteConfig.title}`} description="Description will go into a meta tag in <head />">

    <Graph className={clsx(styles.graphCanvas)}
      graph={graph}
      options={options}
      events={events}
    />

    <h3 className={clsx(styles.textcenter)}>Label = {text}</h3>

    <div className={clsx(styles.radarCanvas)}> 

    <Radar ref={chartRef} data={data} />

    </div>

  </Layout>
  );
}