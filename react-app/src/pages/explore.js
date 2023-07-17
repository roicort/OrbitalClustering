
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
  const [text, setText] = useState(["",""]); // useState hook
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
      console.log(nd.attributes.Cluster)
      
      let perfiltext = ""

      switch (nd.attributes.Cluster) {
        case "1":
          perfiltext = "The dominant orbit is 29, which performs all the listener roles in the graphlet of a triode. Its main orbits include 7 and 21, which also have the role of listener. Analyzing the neighborhoods with three nodes, it is very rare that this profile participates in a path longer than length 1 or responds to tweets from two different nodes. It is also common for you to reply to tweets that are answered by one or two other people. What is observed from the frequent roles found in this orbit is that their behavior tends to respond to tweets and users that are popular.";
          break;
        case "2":
          perfiltext = "The dominant orbit is 1, which plays the role of speaker in the graphlet of an arc. Among its main orbits appear 5, which is sink orbit, and 8, which is speaker. Orbits 2, 6 and 11 never appear in its signature vector, all of which are source orbits. Analyzing the neighborhoods with three nodes, the few times this profile plays the role of listener is because it plays the role of audience. Given the high frequency of the dominant orbit, it is possible to assume that this user produces information that motivates the users who read it to respond to it.";
          break;
        case "3":
          perfiltext = "The main orbits of this profile contain the dominant orbits of the other four. Furthermore, they contain orbits 7, 17, 21 and 31. The first three are listeners, but orbit 31 plays all the sink roles in the graphlet of a triode. The variety of roles that this user can take, which also appear in the signature with balanced values, suggest that this profile allows the flow of information to and from the other predominant profiles";
          break;
        case "4":
          perfiltext = "The dominant orbit is 24, which plays the role of speaker in a 4-node graphlet. The particular architecture of this graphlet suggests the presence of nodes that gather information from different sources that do not respond to each other. This behavior suggests that this node participates in a larger discussion with a partial point of view.";
          break;
        case "5":
          perfiltext = "The dominant orbit is the 5, which plays the role of listener in the graphlet of an arc. In its signature vector, most of the orbits never appear. In particular, if we look at all the neighborhoods with two and three nodes, this profile is never retweeted or mentioned by another user. We observe that it does not participate in graphlets of size 4 and, therefore, neither in neighborhoods with more nodes. What is observed from the frequent roles found in this orbit is that their behavior tends to repeat the messages in most of their interactions, without having a significant impact.";
          break;
      }
      console.log(perfiltext)
      setText(["Cluster: "+nd.attributes.Cluster,perfiltext]);
    }
  }

  function loadgraph(name){
    setGraph({
      nodes: [
      ],
      edges: [
      ]
    })
    loadJSON(name, setGraph, function(err) {console.log('error')})
  }

  const getOptions = () => {
    const names = ['KAROL.json', '#FelizMartes.json', 'Worlds2020.json', 'Cruz_Azul.json', '#TarjetaRosa.json', 'Coco.json', 'Ravens.json', '#1MTrajeados.json', '#JusticeForJohnnyDepp.json', 'Best_Buy_Liquidacion.json', '#MatriomonioIgualitarioPuebla.json', 'Checo.json', 'Europa_League.json', 'Yakult.json', '#Xavi.json', '#SalarioRosa2.json', 'Chivas.json', '#POSITIONS.json', '#WonderAtMidnight.json', '#ImolaGP.json', '#SiguesTuLopez.json', '#LaBrujaDelPalacio.json', '#MasterChefMx.json', 'DiaDeMuertos.json', '#UnPeligroParaMexico.json', '#NiallHoran.json', '#Fakeministas.json', '#DiaInternacionalDelHombre.json', '#nosfaltajorge.json', 'Greta.json', 'Manchester_United.json', '#TrumpvsBiden.json', '#AMLOLujoDePresidente.json', '#TheMandalorian.json', '#FelizLunes.json', 'Viena.json', 'HereWeGo.json', 'Bob_Esponja.json', '#Fortnite.json', 'Dinamarca.json', '#OfrendaEdomex.json', '#Temblor.json', '#ARMY.json', 'Maluma.json', '#HalaMadrid.json', 'Bloomberg.json', '#CovidDerrotaAPuebla.json', 'SpotifyWrapped.json', 'Halloween.json', '#SerieMundial.json', '#FelizMiercoles.json', 'Rayados.json', '#LordMontajes.json', '#HappyAuronDay.json', 'Pumas.json', '#SoloLasMujeresMenstruan.json', 'Pfizer.json', '#BuenFinSeguro.json', '#AvisoCovidEdomex.json', 'Best_Buy.json', 'FONDEN.json', 'SystemofaDown.json', '#Confetti.json', '#Elecciones2020.json', '#AntorchaAyudaATabasco.json', 'Brozo.json', '#RatitaNoEstasSolo.json', 'Chile.json', 'Trump.json', '#XSXFridgeSweeps.json', '#GoPackGo.json', '#ByeByeTrump.json', 'Censura.json', '#CuidemosTodosDeTodos.json', '#JusticiaParaAlexis.json']
    return names.map((name) => {
      return <option key={name} value={'data/networks/'+name.replace('#','')}>{name.replace('.json','')}</option>
    })
  }

  // handle submit event

  return (
  <Layout title={`Hello from ${siteConfig.title}`} description="Description will go into a meta tag in <head />">

    <div className={clsx(styles.graphCanvas)}> 

    <Graph
      graph={graph}
      options={options}
      events={events}
    />

    </div>

    <div className={clsx(styles.interaction)}> 

    <Stack direction="horizontal" gap={3}>
        <Form.Select onChange={handleChange} className="me-auto">
        <option>Selecciona una red</option>
        {getOptions()}
        </Form.Select>
        <Button variant="primary" onClick={() => loadgraph(name)}>Ver</Button>
    </Stack>

    </div>

    <div className={clsx(styles.textcontainer)}> 

    <h3 className={clsx(styles.Title)} >{text[0]}</h3>

    <p>{text[1]}</p>

    <p>Nodos: {graph.nodes.length}</p>
    <p>Aristas: {graph.edges.length}</p>

    </div>
    

  </Layout>
  );
}