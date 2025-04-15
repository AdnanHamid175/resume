import "./App.css";

function App() {
  return (
    <div className="App">
      <div className="body">
        <div className="headshade">
          <div className="pic ">
            <img src="..\public\mpic.png" alt="pic" className="img" />
          </div>
          <div className="headbar ">
            <div className="title">Adnan Hamid</div>
            <div className="subtitle">MERN++ Stack Developer</div>
          </div>
        </div>
        <br />
        <div className="content">
          <div className="main">
            <div className="sectionheader">Profile</div>
            <br />
            <div className="subsectionheader">
              ONTARIO, CANADA | 2016 - PRESENT
            </div>
            <div className="tag">WEB DEVELOPER</div>
            <br />
            <div className="para">My name is Adnan Hamid</div>
          </div>
          <div className="sidebar"></div>
        </div>
      </div>
      <div className="no-print" onClick={() => window.print()}>
        Print
      </div>
    </div>
  );
}

export default App;
