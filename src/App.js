import {useState} from "react";
import './App.css';
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Navbar from "./containers/navbar/index.js";
import Sidebar from "./components/sidebar/sidebarModal.js";
import Segment from "./containers/segment";

function App() {
  const [showSidebar, setShowSidebar] = useState(false);
  return (
    <div className="App">
      <Navbar />
      <Sidebar show={showSidebar} setShowSidebar={setShowSidebar} component={Segment}/>
      <Container>
        <div className="py-4">
          <Button variant="outline-dark" onClick={()=> {setShowSidebar(true)}}>Save Segment</Button>
        </div>
      </Container>
    </div>
  );
}

export default App;
