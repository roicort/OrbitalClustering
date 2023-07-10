import {useColorMode} from '@docusaurus/theme-common';
import {useEffect} from 'react';

export default function SafariColor(){

  const {colorMode} = useColorMode();
  const colorpalette = ['#023047','#ef233c','#0095b6','#8d99ae']
  const col = colorpalette[Math.floor(Math.random() * colorpalette.length)]

  useEffect(() => {

  const metaThemeColor = document.querySelector('meta[name=theme-color]');
  metaThemeColor.setAttribute('content', colorMode === 'dark' ? '#000000' : col);

  const head = document.getElementsByTagName('head')[0];

  let s;

  const selection_css = '::selection { background: #ef233c' + '; color: #fff; }'
  s = document.createElement('style');
  s.setAttribute('type', 'text/css');
  s.appendChild(document.createTextNode(selection_css));
  head.appendChild(s);

  return null;

  }, []);
  
}