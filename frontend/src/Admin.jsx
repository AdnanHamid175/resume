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
  const [submitStatus, setSubmitStatus] = useState(null);
  const [originalData, setOriginalData] = useState(null);

  // Skill states
  const [languages, setLanguages] = useState([]);
  const [frameworks, setFrameworks] = useState([]);
  const [databases, setDatabases] = useState([]);
  const [software, setSoftware] = useState([]);

  // Edit states
  const [editableSections, setEditableSections] = useState({
    profile: false,
    skills: false,
    projects: false,
  });

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch("http://localhost:5000/profile");
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setState(data);
        initializeSkillsFromData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProfileData();
  }, []);

  const initializeSkillsFromData = (data) => {
    const skillCategories = [
      { name: "languages", setter: setLanguages },
      { name: "frameworks", setter: setFrameworks },
      { name: "databases", setter: setDatabases },
      { name: "software", setter: setSoftware },
    ];

    skillCategories.forEach((category) => {
      const skillData = data.find((item) => item.name === category.name);
      if (skillData?.data) {
        try {
          const parsedData = JSON.parse(skillData.data);
          category.setter(Array.isArray(parsedData) ? parsedData : []);
        } catch (err) {
          console.error(`Error parsing ${category.name}:`, err);
          category.setter([]);
        }
      } else {
        category.setter([]);
      }
    });
  };

  const toggleEdit = (section) => {
    if (!editableSections[section]) {
      // Store original values when entering edit mode
      if (section === "skills") {
        setOriginalData({
          languages: [...languages],
          frameworks: [...frameworks],
          databases: [...databases],
          software: [...software],
        });
      } else {
        const sectionData = {};
        state.forEach((item) => {
          if (item.name.startsWith(section)) {
            sectionData[item.name] = item.data;
          }
        });
        setOriginalData(sectionData);
      }
    }
    setEditableSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleCancel = (section) => {
    if (originalData) {
      if (section === "skills") {
        setLanguages([...originalData.languages]);
        setFrameworks([...originalData.frameworks]);
        setDatabases([...originalData.databases]);
        setSoftware([...originalData.software]);
      } else {
        const updatedState = state.map((item) => {
          if (item.name in originalData) {
            return { ...item, data: originalData[item.name] };
          }
          return item;
        });
        setState(updatedState);
      }
    }
    setEditableSections((prev) => ({ ...prev, [section]: false }));
  };

  const handleSave = (section) => {
    if (section === "skills") {
      updateSkillInState("languages", languages);
      updateSkillInState("frameworks", frameworks);
      updateSkillInState("databases", databases);
      updateSkillInState("software", software);
    }
    setEditableSections((prev) => ({ ...prev, [section]: false }));
  };

  const handleChange = (e, type) => {
    const { name, value } = e.target;
    const existingIndex = state.findIndex((item) => item.name === name);
    const updatedState =
      existingIndex !== -1
        ? state.map((item, i) =>
            i === existingIndex ? { ...item, data: value } : item
          )
        : [...state, { name, data: value, type }];
    setState(updatedState);
  };

  const handleSkillChange = (
    index,
    value,
    skillArray,
    setSkillArray,
    skillName
  ) => {
    const newSkills = [...skillArray];
    newSkills[index] = value;
    setSkillArray(newSkills);
  };

  const handleSkillAdd = (skillArray, setSkillArray, skillName) => {
    setSkillArray([...skillArray, ""]);
  };

  const handleSkillDelete = (index, skillArray, setSkillArray, skillName) => {
    const newSkills = skillArray.filter((_, i) => i !== index);
    setSkillArray(newSkills);
  };

  const updateSkillInState = (skillName, skillArray) => {
    const existingIndex = state.findIndex((item) => item.name === skillName);
    const updatedState =
      existingIndex !== -1
        ? state.map((item, i) =>
            i === existingIndex
              ? { ...item, data: JSON.stringify(skillArray), type: types.json }
              : item
          )
        : [
            ...state,
            {
              name: skillName,
              data: JSON.stringify(skillArray),
              type: types.json,
            },
          ];
    setState(updatedState);
  };

  const handleSubmit = async () => {
    try {
      setSubmitStatus("submitting");

      const dataArray = structuredClone(state);

      const skillCategories = [
        { name: "languages", data: languages },
        { name: "frameworks", data: frameworks },
        { name: "databases", data: databases },
        { name: "software", data: software },
      ];

      skillCategories.forEach(({ name, data }) => {
        const index = dataArray.findIndex((x) => x.name === name);
        const skillObj =
          index >= 0 ? dataArray[index] : { name, type: types.json };

        skillObj.data = JSON.stringify(data);

        if (index >= 0) {
          dataArray[index] = skillObj;
        } else {
          dataArray.push(skillObj);
        }
      });

      // Send to backend
      const response = await fetch("http://localhost:5000/save-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dataArray }),
      });

      if (!response.ok) throw new Error("Failed to save");

      setSubmitStatus("success");
      setTimeout(() => setSubmitStatus(null), 3000);
    } catch (error) {
      console.error("Submission error:", error);
      setSubmitStatus("error");
    }
  };

  const getProfileRow = (name) => state.find((item) => item.name === name);

  const renderSkillItems = (skillArray, setSkillArray, skillName) => {
    return skillArray.map((skill, index) => (
      <div key={index} className="skillptt">
        <div className="bullet"></div>
        {editableSections.skills ? (
          <>
            <input
              type="text"
              className="skilltxtt"
              name={`${skillName}${index}`}
              value={skill}
              onChange={(e) =>
                handleSkillChange(
                  index,
                  e.target.value,
                  skillArray,
                  setSkillArray,
                  skillName
                )
              }
            />
            <img
              src="delete.png"
              alt="delete"
              className="imgg skilldltt"
              onClick={() =>
                handleSkillDelete(index, skillArray, setSkillArray, skillName)
              }
            />
          </>
        ) : (
          <div>{skill}</div>
        )}
      </div>
    ));
  };
  if (loading) return <div className="loading">Loading profile data...</div>;
  if (error) return <div className="error">Error loading profile: {error}</div>;

  return (
    <div className="App">
      <div className="bodyy">
        <div className="headshadee">
          <div className="picc">
            <img src="logo.png" alt="pic" className="imgg" />
          </div>
          <div className="headbarr">
            <div className="titlee">Adnan Hamid</div>
            <div className="subtitlee">MERN++ Stack Developer</div>
          </div>
        </div>

        <div className="contentt">
          {/* PROFILE SECTION */}
          <div className="sectionn">
            <div className="bulletinn">
              <div
                className="sectionheaderr"
                onClick={() => {
                  console.log(state);
                  console.log("languages =>", languages);
                }}>
                Profile
              </div>
              <div className="sectioniconn">
                <img src="profile.png" alt="profile" className="imgg" />
              </div>
              {!editableSections.profile ? (
                <div
                  className="editiconn"
                  onClick={() => toggleEdit("profile")}>
                  <img src="edit.png" alt="edit" className="imgg" />
                </div>
              ) : (
                <>
                  <div
                    className="cancel"
                    onClick={() => handleCancel("profile")}>
                    <img src="cancel.png" alt="cancel" className="imgg" />
                  </div>
                  <div className="done" onClick={() => handleSave("profile")}>
                    <img src="check.png" alt="save" className="imgg" />
                  </div>
                </>
              )}
            </div>
            {editableSections.profile ? (
              <textarea
                className="paraa"
                style={{ padding: "10px" }}
                name="profile"
                onChange={(e) => handleChange(e, types.text)}
                value={getProfileRow("profile")?.data || ""}
              />
            ) : (
              <div className="paraa">{getProfileRow("profile")?.data}</div>
            )}
          </div>

          {/* SKILLS SECTION */}
          <div className="sectionn">
            <div className="bulletinn">
              <div className="sectionheaderr">Skills</div>
              <div className="sectioniconn">
                <img src="skill.png" alt="skill" className="imgg" />
              </div>
              {!editableSections.skills ? (
                <div className="editiconn" onClick={() => toggleEdit("skills")}>
                  <img src="edit.png" alt="edit" className="imgg" />
                </div>
              ) : (
                <>
                  <div
                    className="cancel"
                    onClick={() => handleCancel("skills")}>
                    <img src="cancel.png" alt="cancel" className="imgg" />
                  </div>
                  <div className="done" onClick={() => handleSave("skills")}>
                    <img src="check.png" alt="save" className="imgg" />
                  </div>
                </>
              )}
            </div>

            {/* Languages */}
            <div className="skilll">
              <div className="bulletinn">
                <div className="subsectionheaderr">LANGUAGES</div>
                {editableSections.skills && (
                  <div className="iconn">
                    <img
                      src="add.png"
                      alt="add"
                      className="imgg"
                      onClick={() =>
                        handleSkillAdd(languages, setLanguages, "languages")
                      }
                    />
                  </div>
                )}
              </div>
              <div className="paraa">
                {renderSkillItems(languages, setLanguages, "languages")}
              </div>
            </div>

            {/* Frameworks */}
            <div className="skilll">
              <div className="bulletinn">
                <div className="subsectionheaderr">FRAMEWORKS</div>
                {editableSections.skills && (
                  <div className="iconn">
                    <img
                      src="add.png"
                      alt="add"
                      className="imgg"
                      onClick={() =>
                        handleSkillAdd(frameworks, setFrameworks, "frameworks")
                      }
                    />
                  </div>
                )}
              </div>
              <div className="paraa">
                {renderSkillItems(frameworks, setFrameworks, "frameworks")}
              </div>
            </div>

            {/* Databases */}
            <div className="skilll">
              <div className="bulletinn">
                <div className="subsectionheaderr">DATABASE</div>
                {editableSections.skills && (
                  <div className="iconn">
                    <img
                      src="add.png"
                      alt="add"
                      className="imgg"
                      onClick={() =>
                        handleSkillAdd(databases, setDatabases, "databases")
                      }
                    />
                  </div>
                )}
              </div>
              <div className="paraa">
                {renderSkillItems(databases, setDatabases, "databases")}
              </div>
            </div>

            {/* Software */}
            <div className="skilll">
              <div className="bulletinn">
                <div className="subsectionheaderr">SOFTWARE</div>
                {editableSections.skills && (
                  <div className="iconn">
                    <img
                      src="add.png"
                      alt="add"
                      className="imgg"
                      onClick={() =>
                        handleSkillAdd(software, setSoftware, "software")
                      }
                    />
                  </div>
                )}
              </div>
              <div className="paraa">
                {renderSkillItems(software, setSoftware, "software")}
              </div>
            </div>
          </div>

          {/* PROJECTS SECTION */}
          <div className="sectionn">
            <div className="bulletinn">
              <div className="sectionheaderr">Projects</div>
              <div className="sectioniconn">
                <img src="project.png" alt="project" className="imgg" />
              </div>
              {!editableSections.projects ? (
                <div
                  className="editiconn"
                  onClick={() => toggleEdit("projects")}>
                  <img src="edit.png" alt="edit" className="imgg" />
                </div>
              ) : (
                <>
                  <div
                    className="cancel"
                    onClick={() => handleCancel("projects")}>
                    <img src="cancel.png" alt="cancel" className="imgg" />
                  </div>
                  <div className="done" onClick={() => handleSave("projects")}>
                    <img src="check.png" alt="save" className="imgg" />
                  </div>
                </>
              )}
            </div>

            <div className="projectt">
              {editableSections.projects ? (
                <>
                  <input
                    type="text"
                    className="subsectionheaderr"
                    name="project1Title"
                    onChange={(e) => handleChange(e, types.text)}
                    value={getProfileRow("project1Title")?.data || ""}
                  />
                  <input
                    type="text"
                    className="tagg"
                    name="project1Field"
                    onChange={(e) => handleChange(e, types.text)}
                    value={getProfileRow("project1Field")?.data || ""}
                  />
                  <textarea
                    className="paraa"
                    name="project1Description"
                    onChange={(e) => handleChange(e, types.text)}
                    value={getProfileRow("project1Description")?.data || ""}
                  />
                </>
              ) : (
                <>
                  <div className="subsectionheaderr">
                    {getProfileRow("project1Title")?.data}
                  </div>
                  <div className="tagg" style={{ width: "20%" }}>
                    {getProfileRow("project1Field")?.data}
                  </div>
                  <div className="paraa">
                    {getProfileRow("project1Description")?.data}
                  </div>
                </>
              )}

              <div className="bulletinn" style={{ gap: "5px" }}>
                <div className="proiconn">
                  <img
                    src="github.png"
                    alt="github"
                    className="imgg"
                    onClick={() =>
                      window.open(
                        getProfileRow("project1Github")?.data || "#",
                        "_blank"
                      )
                    }
                  />
                </div>
                {editableSections.projects ? (
                  <input
                    type="text"
                    className="protxtt"
                    style={{
                      all: "unset",
                      border: "1px solid black",
                      borderRadius: "9999px",
                      justifyContent: "center",
                      textAlign: "center",
                      display: "flex",
                      alignItems: "center",
                    }}
                    name="project1Github"
                    onChange={(e) => handleChange(e, types.text)}
                    value={getProfileRow("project1Github")?.data || ""}
                  />
                ) : (
                  <div className="protxtt">
                    {getProfileRow("project1Github")?.data}
                  </div>
                )}
                <div className="proiconn">
                  <img
                    src="wlink.png"
                    alt="resume"
                    className="imgg"
                    onClick={() =>
                      window.open(
                        getProfileRow("project1Website")?.data || "#",
                        "_blank"
                      )
                    }
                  />
                </div>
                {editableSections.projects ? (
                  <input
                    type="text"
                    className="protxtt"
                    style={{
                      all: "unset",
                      border: "1px solid black",
                      borderRadius: "9999px",
                      justifyContent: "center",
                      textAlign: "center",
                      display: "flex",
                      alignItems: "center",
                    }}
                    name="project1Website"
                    onChange={(e) => handleChange(e, types.text)}
                    value={getProfileRow("project1Website")?.data || ""}
                  />
                ) : (
                  <div className="protxtt">
                    {getProfileRow("project1Website")?.data}
                  </div>
                )}
              </div>
            </div>
            <div className="projectt">
              {editableSections.projects ? (
                <>
                  <input
                    type="text"
                    className="subsectionheaderr"
                    name="project2Title"
                    onChange={(e) => handleChange(e, types.text)}
                    value={getProfileRow("project2Title")?.data || ""}
                  />
                  <input
                    type="text"
                    className="tagg"
                    name="project2Field"
                    onChange={(e) => handleChange(e, types.text)}
                    value={getProfileRow("project2Field")?.data || ""}
                  />
                  <textarea
                    className="paraa"
                    name="project2Description"
                    onChange={(e) => handleChange(e, types.text)}
                    value={getProfileRow("project2Description")?.data || ""}
                  />
                </>
              ) : (
                <>
                  <div className="subsectionheaderr">
                    {getProfileRow("project2Title")?.data}
                  </div>
                  <div className="tagg" style={{ width: "20%" }}>
                    {getProfileRow("project2Field")?.data}
                  </div>
                  <div className="paraa">
                    {getProfileRow("project2Description")?.data}
                  </div>
                </>
              )}

              <div className="bulletinn" style={{ gap: "5px" }}>
                <div className="proiconn">
                  <img
                    src="github.png"
                    alt="github"
                    className="imgg"
                    onClick={() =>
                      window.open(
                        getProfileRow("project2Github")?.data || "#",
                        "_blank"
                      )
                    }
                  />
                </div>
                {editableSections.projects ? (
                  <input
                    type="text"
                    className="protxtt"
                    style={{
                      all: "unset",
                      border: "1px solid black",
                      borderRadius: "9999px",
                      justifyContent: "center",
                      textAlign: "center",
                      display: "flex",
                      alignItems: "center",
                    }}
                    name="project2Github"
                    onChange={(e) => handleChange(e, types.text)}
                    value={getProfileRow("project2Github")?.data || ""}
                  />
                ) : (
                  <div className="protxtt">
                    {getProfileRow("project2Github")?.data}
                  </div>
                )}
                <div className="proiconn">
                  <img
                    src="wlink.png"
                    alt="resume"
                    className="imgg"
                    onClick={() =>
                      window.open(
                        getProfileRow("project2Website")?.data || "#",
                        "_blank"
                      )
                    }
                  />
                </div>
                {editableSections.projects ? (
                  <input
                    type="text"
                    className="protxtt"
                    style={{
                      all: "unset",
                      border: "1px solid black",
                      borderRadius: "9999px",
                      justifyContent: "center",
                      textAlign: "center",
                      display: "flex",
                      alignItems: "center",
                    }}
                    name="project2Website"
                    onChange={(e) => handleChange(e, types.text)}
                    value={getProfileRow("project2Website")?.data || ""}
                  />
                ) : (
                  <div className="protxtt">
                    {getProfileRow("project2Website")?.data}
                  </div>
                )}
              </div>
            </div>
            <div className="projectt">
              {editableSections.projects ? (
                <>
                  <input
                    type="text"
                    className="subsectionheaderr"
                    name="project3Title"
                    onChange={(e) => handleChange(e, types.text)}
                    value={getProfileRow("project3Title")?.data || ""}
                  />
                  <input
                    type="text"
                    className="tagg"
                    name="project3Field"
                    onChange={(e) => handleChange(e, types.text)}
                    value={getProfileRow("project3Field")?.data || ""}
                  />
                  <textarea
                    className="paraa"
                    name="project3Description"
                    onChange={(e) => handleChange(e, types.text)}
                    value={getProfileRow("project3Description")?.data || ""}
                  />
                </>
              ) : (
                <>
                  <div className="subsectionheaderr">
                    {getProfileRow("project3Title")?.data}
                  </div>
                  <div className="tagg" style={{ width: "20%" }}>
                    {getProfileRow("project3Field")?.data}
                  </div>
                  <div className="paraa">
                    {getProfileRow("project3Description")?.data}
                  </div>
                </>
              )}

              <div
                className="bulletinn"
                style={{ paddingBottom: "20px", gap: "5px" }}>
                <div className="proiconn">
                  <img
                    src="github.png"
                    alt="github"
                    className="imgg"
                    onClick={() =>
                      window.open(
                        getProfileRow("project3Github")?.data || "#",
                        "_blank"
                      )
                    }
                  />
                </div>
                {editableSections.projects ? (
                  <input
                    type="text"
                    className="protxtt"
                    style={{
                      all: "unset",
                      border: "1px solid black",
                      borderRadius: "9999px",
                      justifyContent: "center",
                      textAlign: "center",
                      display: "flex",
                      alignItems: "center",
                    }}
                    name="project3Github"
                    onChange={(e) => handleChange(e, types.text)}
                    value={getProfileRow("project3Github")?.data || ""}
                  />
                ) : (
                  <div className="protxtt">
                    {getProfileRow("project3Github")?.data}
                  </div>
                )}
                <div className="proiconn">
                  <img
                    src="wlink.png"
                    alt="resume"
                    className="imgg"
                    onClick={() =>
                      window.open(
                        getProfileRow("project3Website")?.data || "#",
                        "_blank"
                      )
                    }
                  />
                </div>
                {editableSections.projects ? (
                  <input
                    type="text"
                    className="protxtt"
                    style={{
                      all: "unset",
                      border: "1px solid black",
                      borderRadius: "9999px",
                      justifyContent: "center",
                      textAlign: "center",
                      display: "flex",
                      alignItems: "center",
                    }}
                    name="project3Website"
                    onChange={(e) => handleChange(e, types.text)}
                    value={getProfileRow("project3Website")?.data || ""}
                  />
                ) : (
                  <div className="protxtt">
                    {getProfileRow("project3Website")?.data}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="parallax">
        <button
          className="print"
          onClick={handleSubmit}
          disabled={submitStatus === "submitting"}>
          <img src="submit.png" alt="submit" className="img" />
        </button>
        {submitStatus === "success" && (
          <div className="save-success">Saved successfully!</div>
        )}
        {submitStatus === "error" && (
          <div className="save-error">Error saving changes</div>
        )}
        <button
          className="print noprint"
          style={{ marginTop: "10px" }}
          onClick={() => (window.location.href = "http://localhost:5173/")}>
          <img src="app.png" alt="update" className="img" />
        </button>
      </div>
    </div>
  );
}

export default Admin;