import "./App.scss";
import Aside from "./components/Aside";
import Content from "./components/Content";
import Control from "./components/Control";
import Header from "./components/Header";

function App() {
  const data = {
    x: 100,
    y: 100,
  };
  return (
    <>
      <div className='container-editor'>
        <Header />
        <div className='container-main'>
          <Aside />
          <Content props={data} />
          <Control />
        </div>
      </div>
    </>
  );
}

export default App;
