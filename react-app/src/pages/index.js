import React, {useEffect,useState,useCallback,useRef} from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';
import { Canvas, useFrame, useThree } from '@react-three/fiber'

//import {useColorMode} from '@docusaurus/theme-common';

import { Points, PointMaterial, Point } from '@react-three/drei'
import * as maath from 'maath/random/dist/maath-random.esm'

//import {useThemeConfig} from '@docusaurus/theme-common';

import SafariColor from '../../src/js/color.config.js';

////////////////////////////////////////////////////////////

function Orbits(props) {

  const ref = useRef()
  const numpoints = Math.floor(Math.random() * 2000);
  const [sphere] = useState(() => maath.inSphere(new Float32Array(numpoints), { radius: 10 }))

  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 10
    ref.current.rotation.y -= delta / 15
  })

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial transparent color={props.color} size={0.05} sizeAttenuation={true} depthWrite={false} />
      </Points>
    </group>
  )
}

function HomepageGeometry() {

  SafariColor();
  const {siteConfig} = useDocusaurusContext();

  const colorpalette = ['#023047','#ef233c','#ffb703','#0095b6','#2ec4b6','#8d99ae']

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

      <Orbits color={colorpalette[0]} />
      <Orbits color={colorpalette[1]} />
      <Orbits color={colorpalette[2]} />
      <Orbits color={colorpalette[3]} />
      <Orbits color={colorpalette[4]} />
      <Orbits color={colorpalette[5]} />

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


