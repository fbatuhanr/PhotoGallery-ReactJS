import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

import Header from './components/Header';
import UploadForm from './components/UploadForm';
import Footer from './components/Footer';

function App() {
  
  return ( 
    <div className="container-fluid">
      <Header />
        <UploadForm />
      <Footer />
    </div>
  );
}

export default App;
