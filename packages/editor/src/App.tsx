import './App.scss';
import Aside from "./components/Aside";
import Content from "./components/Content";
import Control from "./components/Control";
import Header from "./components/Header";

function App() {

  return (
    <>
      <div className="container-editor">
        <Header />
        <div className="container-main">
          <Aside />
          <Content />
          <Control />
        </div>
      </div>
    </>
  )
}

export default App
