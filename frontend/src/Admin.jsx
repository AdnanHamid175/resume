import { useEffect, useState } from "react";
import "./App.css";

function Admin() {
  const types = {
    text: "text",
    json: "json",
  };
  const [state, setState] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [languages, setLanguages] = useState([]);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch("http://localhost:5000/profile");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setState(data);
      } catch (err) {
        setError(err.message);
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  const handleChange = (e, type) => {
    // store value as object with unique name in state array
    const { name, value } = e.target;
    const existingIndex = state.findIndex((item) => item.name === name);
    if (existingIndex !== -1) {
      const updatedState = [...state];
      updatedState[existingIndex] = {
        ...updatedState[existingIndex],
        data: value,
      };
      setState(updatedState);
    } else {
      setState([...state, { name, data: value, type }]);
    }
  };

  const handleSubmit = () => {
    // send state array to backend
    fetch("http://localhost:5000/save-profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ dataArray: state }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const getProfileRow = (name) => {
    const element = state.find((item) => item.name === name);
    if (element) {
      return element;
    } else {
      return null;
    }
  };

  const handleAdd = async () => {
    try {
      setLanguages([...languages, ""]);
    } catch (error) {}
  };

  return (
    <div className="App">
      <div className="bodyy">
        <div className="headshadee">
          <div className="picc ">
            <img src="..\public\logo.png" alt="pic" className="imgg" />
          </div>
          <div className="headbarr ">
            <div className="titlee">Adnan Hamid</div>
            <div className="subtitlee">MERN++ Stack Developer</div>
          </div>
        </div>

        <div className="contentt">
          <div className="sectionn">
            <div className="bulletinn">
              <div
                className="sectionheaderr"
                onClick={() => console.log(state)}>
                Profile
              </div>
              <div className="sectioniconn">
                <img
                  src="../../public/profile.png"
                  alt="profile"
                  className="imgg"
                />
              </div>
              <div className="editiconn">
                <img src="../../public/edit.png" alt="edit" className="imgg" />
              </div>
            </div>
            <textarea
              type="text"
              className="paraa"
              style={{ padding: "10px" }}
              name="profile"
              onChange={(e) => handleChange(e, types.text)}
              value={getProfileRow("profile")?.data}
            />
          </div>
          <div className="sectionn">
            <div className="bulletinn">
              <div className="sectionheaderr">Skills</div>
              <div className="sectioniconn">
                <img
                  src="../../public/skill.png"
                  alt="skill"
                  className="imgg"
                />
              </div>
              <div className="editiconn">
                <img src="../../public/edit.png" alt="edit" className="imgg" />
              </div>
            </div>
            <div className="skilll">
              <div className="bulletinn">
                <div className="subsectionheaderr">LANGUAGES</div>
                <div className="iconn">
                  <img
                    src="../../public/add.png"
                    alt="add"
                    className="imgg"
                    onClick={handleAdd}
                  />
                </div>
              </div>
              <div className="paraa">
                {languages.map((lang, index) => (
                  <input
                    key={index}
                    type="text"
                    style={{ all: "unset" }}
                    name={`language${index}`}
                    value={lang}
                    onChange={(e) => {
                      const newLangs = [...languages];
                      newLangs[index] = e.target.value;
                      setLanguages(newLangs);
                    }}
                  />
                ))}
              </div>
            </div>
            <div className="skilll">
              <div className="bulletinn">
                <div className="subsectionheaderr">FRAMEWORKS</div>
                <div className="iconn">
                  <img src="../../public/add.png" alt="add" className="imgg" />
                </div>
              </div>
              <div className="paraa">
                <div></div>
              </div>
            </div>
            <div className="skilll">
              <div className="bulletinn">
                <div className="subsectionheaderr">DATABASE</div>
                <div className="iconn">
                  <img src="../../public/add.png" alt="add" className="imgg" />
                </div>
              </div>
              <div className="paraa">
                <div></div>
              </div>
            </div>
            <div className="skilll">
              <div className="bulletinn">
                <div className="subsectionheaderr">SOFTWARE</div>
                <div className="iconn">
                  <img src="../../public/add.png" alt="add" className="imgg" />
                </div>
              </div>
              <div className="paraa">
                <div></div>
              </div>
            </div>
          </div>
          <div className="sectionn">
            <div className="bulletinn">
              <div className="sectionheaderr">Projects</div>
              <div className="sectioniconn">
                <img
                  src="../../public/project.png"
                  alt="project"
                  className="imgg"
                />
              </div>
              <div className="editiconn">
                <img src="../../public/edit.png" alt="edit" className="imgg" />
              </div>
            </div>
            <div className="projectt">
              <div className="subsectionheaderr">
                <input
                  type="text"
                  style={{ all: "unset" }}
                  name="project1Title"
                  onChange={(e) => handleChange(e, types.text)}
                  value={getProfileRow("project1Title")?.data}
                />
              </div>
              <div className="tagg" style={{ width: "20%" }}>
                <input
                  type="text"
                  style={{ all: "unset" }}
                  name="project1Field"
                  onChange={(e) => handleChange(e, types.text)}
                  value={getProfileRow("project1Field")?.data}
                />
              </div>
              <div className="paraa">
                <textarea
                  type="text"
                  className="paraa"
                  style={{ padding: "10px", marginBottom: "10px" }}
                  name="project1Description"
                  onChange={(e) => handleChange(e, types.text)}
                  value={getProfileRow("project1Description")?.data}
                />
              </div>
              <div className="bulletinn">
                <div className="proiconn">
                  <img
                    src="../../public/github.png"
                    alt="github"
                    className="imgg"
                    onClick={() =>
                      window.open("https://github.com/AdnanHamid175", "_blank")
                    }
                  />
                </div>
                <div className="protxtt">
                  {" "}
                  <input
                    type="text"
                    style={{ all: "unset" }}
                    name="project1Github"
                    onChange={(e) => handleChange(e, types.text)}
                    value={getProfileRow("project1Github")?.data}
                  />
                </div>
                <div className="proiconn">
                  <img
                    src="../../public/wlink.png"
                    alt="resume"
                    className="imgg"
                    onClick={() => window.open("www.example.com", "_blank")}
                  />
                </div>{" "}
                <div className="protxtt">
                  {" "}
                  <input
                    type="text"
                    style={{ all: "unset" }}
                    name="project1Website"
                    onChange={(e) => handleChange(e, types.text)}
                    value={getProfileRow("project1Website")?.data}
                  />
                </div>
              </div>
            </div>
            <div className="projectt">
              <div className="subsectionheaderr">
                <input
                  type="text"
                  style={{ all: "unset" }}
                  name="project2Title"
                  onChange={(e) => handleChange(e, types.text)}
                  value={getProfileRow("project2Title")?.data}
                />
              </div>
              <div className="tagg" style={{ width: "20%" }}>
                <input
                  type="text"
                  style={{ all: "unset" }}
                  name="project2Field"
                  onChange={(e) => handleChange(e, types.text)}
                  value={getProfileRow("project2Field")?.data}
                />
              </div>
              <div className="paraa">
                <textarea
                  type="text"
                  className="paraa"
                  style={{ padding: "10px", marginBottom: "10px" }}
                  name="project2Description"
                  onChange={(e) => handleChange(e, types.text)}
                  value={getProfileRow("project2Description")?.data}
                />
              </div>
              <div className="bulletinn">
                <div className="proiconn">
                  <img
                    src="../../public/github.png"
                    alt="github"
                    className="imgg"
                    onClick={() =>
                      window.open("https://github.com/AdnanHamid175", "_blank")
                    }
                  />
                </div>
                <div className="protxtt">
                  {" "}
                  <input
                    type="text"
                    style={{ all: "unset" }}
                    name="project2Github"
                    onChange={(e) => handleChange(e, types.text)}
                    value={getProfileRow("project2Github")?.data}
                  />
                </div>
                <div className="proiconn">
                  <img
                    src="../../public/wlink.png"
                    alt="resume"
                    className="imgg"
                    onClick={() => window.open("www.example.com", "_blank")}
                  />
                </div>{" "}
                <div className="protxtt">
                  {" "}
                  <input
                    type="text"
                    style={{ all: "unset" }}
                    name="project2Website"
                    onChange={(e) => handleChange(e, types.text)}
                    value={getProfileRow("project2Website")?.data}
                  />
                </div>
              </div>
            </div>
            <div className="projectt">
              <div className="subsectionheaderr">
                <input
                  type="text"
                  style={{ all: "unset" }}
                  name="project3Title"
                  onChange={(e) => handleChange(e, types.text)}
                  value={getProfileRow("project3Title")?.data}
                />
              </div>
              <div className="tagg" style={{ width: "20%" }}>
                <input
                  type="text"
                  style={{ all: "unset" }}
                  name="project3Field"
                  onChange={(e) => handleChange(e, types.text)}
                  value={getProfileRow("project3Field")?.data}
                />
              </div>
              <div className="paraa">
                <textarea
                  type="text"
                  className="paraa"
                  style={{ padding: "10px", marginBottom: "10px" }}
                  name="project3Description"
                  onChange={(e) => handleChange(e, types.text)}
                  value={getProfileRow("project3Description")?.data}
                />
              </div>
              <div className="bulletinn">
                <div className="proiconn">
                  <img
                    src="../../public/github.png"
                    alt="github"
                    className="imgg"
                    onClick={() =>
                      window.open("https://github.com/AdnanHamid175", "_blank")
                    }
                  />
                </div>
                <div className="protxtt">
                  {" "}
                  <input
                    type="text"
                    style={{ all: "unset" }}
                    name="project3Github"
                    onChange={(e) => handleChange(e, types.text)}
                    value={getProfileRow("project3Github")?.data}
                  />
                </div>
                <div className="proiconn">
                  <img
                    src="../../public/wlink.png"
                    alt="resume"
                    className="imgg"
                    onClick={() => window.open("www.example.com", "_blank")}
                  />
                </div>{" "}
                <div className="protxtt">
                  {" "}
                  <input
                    type="text"
                    style={{ all: "unset" }}
                    name="project3Website"
                    onChange={(e) => handleChange(e, types.text)}
                    value={getProfileRow("project3Website")?.data}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="parallax">
        <button className="print" onClick={handleSubmit}>
          <img src="../public/submit.png" alt="print" className="img" />
        </button>
      </div>
    </div>
  );
}

export default Admin;
