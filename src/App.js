import './App.css';
import { ProductsProvider } from './Component/MainContext';
import { BrowserRouter, Routes} from 'react-router-dom';
import Routeur from './Component/Route';
import ButtonAppBar from './Component/NavAcceuil';
import DarkVariantExample from './Component/slideAcceuil';
import TitlebarBelowMasonryImageList from './Component/Imagelist';
import './Styles/Footer.css'
function App() {
  return (
    <BrowserRouter>
    <ProductsProvider>
 
   <Routeur></Routeur>
    </ProductsProvider>
  </BrowserRouter>
  );
}

export default App;
