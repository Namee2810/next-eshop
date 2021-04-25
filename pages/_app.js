import 'antd/dist/antd.css';
import { Provider } from 'react-redux';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import store from "store";
import "styles/antd.scss";
import 'styles/globals.scss';

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
