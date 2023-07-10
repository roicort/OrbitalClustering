import React, {useEffect,useState,useCallback,useRef} from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';
import { Canvas, useFrame, useThree } from '@react-three/fiber'

import {useColorMode} from '@docusaurus/theme-common';

import { Points, PointMaterial, Point } from '@react-three/drei'
import * as random from 'maath/random/dist/maath-random.esm'

import {useThemeConfig} from '@docusaurus/theme-common';

import SafariColor from '../../src/js/color.config.js';

////////////////////////////////////////////////////////////

function useColorModeToggle() {
  const {
    colorMode: {disableSwitch},
  } = useThemeConfig();
  const {colorMode, setColorMode, setLightTheme, setDarkTheme} = useColorMode();
  const toggle = useCallback(
    (e) => (e.target.checked ? setDarkTheme() : setLightTheme()),
    [setLightTheme, setDarkTheme],
  );
  return {
    colorMode,
    toggle,
    disabled: disableSwitch,
  };
}

function Stars(props) {

  const ref = useRef()
  const colorpalette = ['#023047','#ef233c','#ffb703','#0095b6','#2ec4b6','#8d99ae']
  const [sphere] = useState(() => random.inSphere(new Float32Array(5000), { radius: 7.5 }))

  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 10
    ref.current.rotation.y -= delta / 15
  })

  const SpherePoints = (props) => {
    let dreipoints = []
    for (let i = 0; i < props.points.length-3; i+=3) {
      dreipoints.push(<Point key={i} position={[props.points[i], props.points[i + 1], props.points[i + 2]]} color={props.colors[Math.floor(Math.random() * props.colors.length)]} />)
    }
    return dreipoints
  }

  return (
    <group rotation={[0, 0, Math.PI / 4]}>

      <Points
        ref={ref}
        limit={sphere.length} // Optional: max amount of items (for calculating buffer size)
        range={sphere.length} // Optional: draw-range
        isPoints={true}
      >
        <pointsMaterial size={0.05} transparent vertexColors />
        <SpherePoints points={sphere} colors={colorpalette}/>
      </Points>

    </group>
  )
}

function HomepageGeometry() {

  SafariColor();
  const {siteConfig} = useDocusaurusContext();

  return (
    <header className={clsx(styles.heroCanvas)}>

      <div className={clsx(styles.heroContainer)}>
        <h1 className="hero-title">{siteConfig.title}</h1>
        <h3 className="hero-subtitle">{siteConfig.tagline}</h3>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro">
            Explora
          </Link>
        </div>
      </div>

      <Canvas>
      <Stars />
    </Canvas>

    </header>
  );
}

////////////////////////////////////////////////////////////////////////////////

export default function Home() {

  const {siteConfig} = useDocusaurusContext();


  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <HomepageGeometry/>
    </Layout>
  );
}


