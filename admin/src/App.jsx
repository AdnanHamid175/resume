import "./App.css";

function App() {
  return (
    <div className="body">
      <div className="headshade">
        <div className="pic ">
          <img src="..\public\logo.png" alt="pic" className="img" />
        </div>
        <div className="headbar ">
          <div className="title">Adnan Hamid</div>
          <div className="subtitle">MERN++ Stack Developer</div>
        </div>
      </div>
      <div className="content">
        <div className="section">
          <div className="bulletin">
            <div className="sectionheader">Profile</div>
            <div className="sectionicon">
              <img src="../public/profile.png" alt="profile" className="img" />
            </div>
          </div>
          <textarea type="text" className="para" style={{ padding: "10px" }} />
        </div>
        <div className="section">
          <div className="bulletin">
            <div className="sectionheader">Skills</div>
            <div className="sectionicon">
              <img src="../public/skill.png" alt="skill" className="img" />
            </div>
          </div>
          <div className="skill">
            <div className="bulletin">
              <div className="subsectionheader">LANGUAGES</div>
              <div className="icon" onClick={{}}>
                <img src="../public/add.png" alt="add" className="img" />
              </div>
            </div>
            <div className="para">
              <div></div>
            </div>
          </div>
          <div className="skill">
            <div className="bulletin">
              <div className="subsectionheader">FRAMEWORKS</div>
              <div className="icon" onClick={{}}>
                <img src="../public/add.png" alt="add" className="img" />
              </div>
            </div>
            <div className="para">
              <div></div>
            </div>
          </div>
          <div className="skill">
            <div className="bulletin">
              <div className="subsectionheader">DATABASE</div>
              <div className="icon" onClick={{}}>
                <img src="../public/add.png" alt="add" className="img" />
              </div>
            </div>
            <div className="para">
              <div></div>
            </div>
          </div>
          <div className="skill">
            <div className="bulletin">
              <div className="subsectionheader">SOFTWARE</div>
              <div className="icon" onClick={{}}>
                <img src="../public/add.png" alt="add" className="img" />
              </div>
            </div>
            <div className="para">
              <div></div>
            </div>
          </div>
        </div>
        <div className="section">
          <div className="bulletin">
            <div className="sectionheader">Projects</div>
            <div className="sectionicon">
              <img src="../public/project.png" alt="project" className="img" />
            </div>
          </div>
          <div className="project">
            <div className="subsectionheader">Project</div>
            <div className="tag" style={{ width: "20%" }}>
              Field
            </div>
            <div className="para">
              <textarea
                type="text"
                className="para"
                style={{ padding: "10px" }}
              />
            </div>
          </div>
          <div className="project">
            <div className="subsectionheader">Project</div>
            <div className="tag" style={{ width: "20%" }}>
              Field
            </div>
            <div className="para">
              <textarea
                type="text"
                className="para"
                style={{ padding: "10px" }}
              />
            </div>
          </div>
          <div className="project">
            <div className="subsectionheader">Project</div>
            <div className="tag" style={{ width: "20%" }}>
              Field
            </div>
            <div className="para">
              <textarea
                type="text"
                className="para"
                style={{ padding: "10px" }}
              />
            </div>
          </div>
          <div className="project">
            <div className="subsectionheader">Project</div>
            <div className="tag" style={{ width: "20%" }}>
              Field
            </div>
            <div className="para">
              <textarea
                type="text"
                className="para"
                style={{ padding: "10px" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
