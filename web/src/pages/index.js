import React, {useEffect,useState,useCallback,useRef} from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';
import { Canvas, useFrame, useThree } from '@react-three/fiber'

import {useColorMode} from '@docusaurus/theme-common';

import { Points, PointMaterial } from '@react-three/drei'
import * as random from 'maath/random/dist/maath-random.esm'

import {useThemeConfig
} from '@docusaurus/theme-common';

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
  const [sphere] = useState(() => random.inSphere(new Float32Array(5000), { radius: 5 }))
  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 10
    ref.current.rotation.y -= delta / 15
  })
  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial transparent color="#006ac7" size={0.025} sizeAttenuation={true} depthWrite={false} />
      </Points>
    </group>
  )
}

function HomepageGeometry() {

  const {siteConfig} = useDocusaurusContext();
  const colorModeToggle = useColorModeToggle();
  var isDark;

  if(colorModeToggle.colorMode === 'dark'){
    isDark = true;
  }
  else{
    isDark = false;
  }

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


