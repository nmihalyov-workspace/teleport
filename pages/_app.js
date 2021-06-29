import '../styles/globals.css'
import '../static/sass/_base.sass'

const Teleport = ({ Component, pageProps }) => {
  return <Component {...pageProps} />
};

export default Teleport;