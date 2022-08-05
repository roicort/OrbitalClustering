import {useColorMode} from '@docusaurus/theme-common';

export default function SafariColor(){

  const {colorMode} = useColorMode();

  //const metaThemeColor = document.querySelector('meta[name=theme-color]');
  //metaThemeColor.setAttribute('content', colorMode === 'dark' ? '#000000' : '#A41034');

  const head = document.getElementsByTagName('head')[0];

  let s;

  const selection_css = '::selection { background: #A41034' + '; color: #fff; }'
  s = document.createElement('style');
  s.setAttribute('type', 'text/css');
  s.appendChild(document.createTextNode(selection_css));
  head.appendChild(s);

  return null;
  
}