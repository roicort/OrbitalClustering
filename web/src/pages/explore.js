
import React, { version } from 'react'
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useState } from "react";
import {Form, Button} from 'react-bootstrap'
import Graph from "../../node_modules/react-graph-vis";

import clsx from 'clsx';
import styles from './index.module.css';

import { Stack } from 'react-bootstrap';

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

export default function Home({...props}) {

  const {siteConfig} = useDocusaurusContext();
  
  const [name, setName] = useState(); // useState hook
  const [text, setText] = useState(["None","None"]); // useState hook
  const [graph, setGraph] = useState({
    nodes: [
    ],
    edges: [
    ]
  }); // useState hook

  // handle change event
  const handleChange = (e) => {
    e.preventDefault(); // prevent the default action
    setName(e.target.value); // set name to e.target.value (event)
  };

  var events = {
    select: ({ nodes }) => {
      let nd = graph.nodes.find(x => x.id === nodes[0]);
      setText([nd.label, nd.attributes.Cluster]);
    }
  }

  function loadgraph(name){
    loadJSON(name, setGraph, function(err) {console.log('error')})
    setGraph({
      nodes: [
      ],
      edges: [
      ]
    })
  }

  // handle submit event

  return (
  <Layout title={`Hello from ${siteConfig.title}`} description="Description will go into a meta tag in <head />">

    <Graph className={clsx(styles.graphCanvas)}
      graph={graph}
      options={options}
      events={events}
    />

    <div className={clsx(styles.textcenter)}> 

    <Stack direction="horizontal" gap={3}>
        <Form.Select onChange={handleChange} className="me-auto">
        <option>Selecciona una red</option>
        <option value="data/networks/SalarioRosa2.json">Paper - #SalarioRosa2</option>
        <option value="data/networks/Coco.json">Paper - Coco</option>
        </Form.Select>
        <Button variant="primary" onClick={() => loadgraph(name)}>Cargar</Button>
    </Stack>

    </div>

    <h3 className={clsx(styles.textcenter)}>Label = {text[0]} Cluster = {text[1]}</h3>

  </Layout>
  );
}