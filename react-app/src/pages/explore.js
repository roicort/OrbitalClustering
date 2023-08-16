import React, { version } from "react";
import Layout from "@theme/Layout";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import Graph from "../../node_modules/react-graph-vis";

import clsx from "clsx";
import styles from "./index.module.css";

import { Stack } from "react-bootstrap";

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
  height: "512px",
};

function loadJSON(path, FUN, error) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        FUN(JSON.parse(xhr.responseText));
      } else {
        error(xhr);
      }
    }
  };
  xhr.open("GET", path, true);
  xhr.send();
}

export default function Home({ ...props }) {
  const { siteConfig } = useDocusaurusContext();

  const [name, setName] = useState(); // useState hook
  const [text, setText] = useState(["", ""]); // useState hook
  const [graph, setGraph] = useState({
    nodes: [],
    edges: [],
  }); // useState hook

  // handle change event
  const handleChange = (e) => {
    e.preventDefault(); // prevent the default action
    setName(e.target.value); // set name to e.target.value (event)
  };

  var events = {
    select: ({ nodes }) => {
      let nd = graph.nodes.find((x) => x.id === nodes[0]);
      console.log(nd.attributes.Cluster);

      let perfiltext = "";

      switch (nd.attributes.Cluster) {
        case "4":
          perfiltext =
            "Difusor. La órbita dominante es la 1, que desempeña el papel de un pozo en el graphlet compuesto por un solo arco. Las órbitas 2, 6 y 11 (todas ellas órbitas fuente) nunca aparecen en los vectores de firmas de estos usuarios. Analizando los vecindarios con tres nodos, las pocas veces que este perfil desempeña el papel de oyente, también lo hace de audiencia. Dada la alta frecuencia de la órbita dominante, es razonable suponer que estos usuarios producen información que motiva a los lectores a responder.";
          break;
        case "5":
          perfiltext =
            "Repetidor. La órbita dominante es la 0, que desempeña el papel de oyente en un graphlet de arco, pero no tiene el papel de audiencia. La mayoría de las otras órbitas no aparecen asociadas a este tipo de usuario. En particular, si observamos todos los vecindarios con dos y tres nodos, este perfil nunca es retuiteado o mencionado por otro usuario. Además, observamos que el usuario no participa en graphlets de tamaño cuatro y, por tanto, tampoco en vecindarios más grandes. A partir de los roles recurrentes encontrados en esta órbita, podríamos decir que estos usuarios tienden a repetir los mensajes en la mayoría de sus interacciones sin impactar significativamente en la conversación.";
          break;
        case "3":
          perfiltext =
            "Conversador. En este perfil aparecen todas las órbitas incluyendo aquellas dominantes de los otros cuatro perfiles. Las órbitas dominantes en este perfil son la 29, 7, 17, 21 y 31. Las mayoría de las órbitas son oyentes, pero la órbita 31 desempeña todos los papeles de pozo en un graphlet de 4 nodos. La variedad de roles que puede adoptar este grupo de usuarios, se ve reflejada en la composición equilibrada de los vectores de firmas asociados, lo que sugiere que este perfil permite el flujo de información hacia y desde los otros perfiles predominantes.";
          break;
        case "1":
          perfiltext =
            "Reportero. La órbita dominante es la 29, que desempeña todos los papeles de oyente en el graphlet de un triodo. Esta órbita dominante desempeña el papel de oyente. Analizando los vecindarios con tres nodos, es infrecuente que este perfil participe en rutas con una longitud superior a uno o que responda a tweets de dos nodos diferentes, pero es habitual que el usuario responda a tweets que están siendo contestados por una o dos personas más. Así, podríamos decir que este tipo de usuario tiende a responder a tweets y usuarios que son populares. Dado que este perfil incluye todas las órbitas, podríamos decir que estos usuarios tienen más impacto en la conversación que los repetidores.";
          break;
        case "2":
          perfiltext =
            "Inconformista. La órbita dominante es la 24, que desempeña el papel de hablante en un graphlet de 4 nodos. La particular arquitectura de este graphlet sugiere la presencia de nodos que recogen información de diferentes fuentes y que no interactúan entre sí. El comportamiento sugiere que este usuario participa en una discusión más amplia con un punto de vista parcial.";
          break;
      }
      setText(["Cluster: " + nd.attributes.Cluster, perfiltext]);
    },
  };

  function loadgraph(name) {
    setGraph({
      nodes: [],
      edges: [],
    });
    loadJSON(name, setGraph, function (err) {
      console.log("error");
    });
  }

  const getOptions = () => {
    const names = [
      "KAROL.json",
      "#FelizMartes.json",
      "Worlds2020.json",
      "Cruz_Azul.json",
      "#TarjetaRosa.json",
      "Coco.json",
      "Ravens.json",
      "#1MTrajeados.json",
      "#JusticeForJohnnyDepp.json",
      "Best_Buy_Liquidacion.json",
      "#MatriomonioIgualitarioPuebla.json",
      "Checo.json",
      "Europa_League.json",
      "Yakult.json",
      "#Xavi.json",
      "#SalarioRosa2.json",
      "Chivas.json",
      "#POSITIONS.json",
      "#WonderAtMidnight.json",
      "#ImolaGP.json",
      "#SiguesTuLopez.json",
      "#LaBrujaDelPalacio.json",
      "#MasterChefMx.json",
      "DiaDeMuertos.json",
      "#UnPeligroParaMexico.json",
      "#NiallHoran.json",
      "#Fakeministas.json",
      "#DiaInternacionalDelHombre.json",
      "#nosfaltajorge.json",
      "Greta.json",
      "Manchester_United.json",
      "#TrumpvsBiden.json",
      "#AMLOLujoDePresidente.json",
      "#TheMandalorian.json",
      "#FelizLunes.json",
      "Viena.json",
      "HereWeGo.json",
      "Bob_Esponja.json",
      "#Fortnite.json",
      "Dinamarca.json",
      "#OfrendaEdomex.json",
      "#Temblor.json",
      "#ARMY.json",
      "Maluma.json",
      "#HalaMadrid.json",
      "Bloomberg.json",
      "#CovidDerrotaAPuebla.json",
      "SpotifyWrapped.json",
      "Halloween.json",
      "#SerieMundial.json",
      "#FelizMiercoles.json",
      "Rayados.json",
      "#LordMontajes.json",
      "#HappyAuronDay.json",
      "Pumas.json",
      "#SoloLasMujeresMenstruan.json",
      "Pfizer.json",
      "#BuenFinSeguro.json",
      "#AvisoCovidEdomex.json",
      "Best_Buy.json",
      "FONDEN.json",
      "SystemofaDown.json",
      "#Confetti.json",
      "#Elecciones2020.json",
      "#AntorchaAyudaATabasco.json",
      "Brozo.json",
      "#RatitaNoEstasSolo.json",
      "Chile.json",
      "Trump.json",
      "#XSXFridgeSweeps.json",
      "#GoPackGo.json",
      "#ByeByeTrump.json",
      "Censura.json",
      "#CuidemosTodosDeTodos.json",
      "#JusticiaParaAlexis.json",
    ];
    return names.map((name) => {
      return (
        <option key={name} value={"../data/networks/" + name.replace("#", "")}>
          {name.replace(".json", "")}
        </option>
      );
    });
  };

  // handle submit event

  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      <div className={clsx(styles.graphCanvas)}>
        <Graph graph={graph} options={options} events={events} />
      </div>

      <div className={clsx(styles.interaction)}>
        <Stack direction="horizontal" gap={3}>
          <Form.Select onChange={handleChange} className="me-auto">
            <option>Selecciona una red</option>
            {getOptions()}
          </Form.Select>
          <Button variant="primary" onClick={() => loadgraph(name)}>
            Ver
          </Button>
        </Stack>
      </div>

      <div className={clsx(styles.textcontainer)}>
        <h3 className={clsx(styles.Title)}>{text[0]}</h3>

        <p>{text[1]}</p>

        <p>Nodos: {graph.nodes.length}</p>
        <p>Aristas: {graph.edges.length}</p>
      </div>
    </Layout>
  );
}
