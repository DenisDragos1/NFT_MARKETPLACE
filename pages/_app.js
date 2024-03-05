import '../styles/globals.css';

import { NavBar } from '../components/componentsindex';

export default function App({ Component, pageProps }) {
<div>
  <NavBar/>
 <Component {...pageProps} />;
 </div>
}
