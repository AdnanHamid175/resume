import React, { useEffect, useState } from "react";
import "./App.css";
import Copy from "./components/Copy";
import Link from "./components/Link";

function App() {
  const [profileData, setProfileData] = useState([]);
  const [loading, setLoading] = useState(true); // No UI element shows when loading is true
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch("http://localhost:5000/profile");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProfileData(data);
      } catch (err) {
        setError(err.message);
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  const renderSkillItems = (skillName, className) => {
    const skillData = getProfileRow(skillName);
    if (!skillData) return null;

    try {
      const skills = JSON.parse(skillData.data);
      if (!Array.isArray(skills) || skills.length === 0) return null;

      return (
        <div className="skills-grid">
          {skills.map((skill, index) => (
            <div key={index} className="skill-item">
              <div className="bullet"></div>
              {skill}
            </div>
          ))}
        </div>
      );
    } catch (error) {
      console.error(`Error parsing ${skillName}:`, error);
      return null;
    }
  };
  // Show loading state
  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  // Show error state
  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  const getProfileRow = (name) => {
    const element = profileData.find((item) => item.name === name);
    if (element) {
      return element;
    } else {
      return null;
    }
  };

  return (
    <div className="App">
      <div className="body">
        <div className="headshade">
          <div className="pic ">
            <img src="logo.png" alt="pic" className="img" />
          </div>
          <div className="headbar ">
            <div className="title">Adnan Hamid</div>
            <div className="subtitle">MERN++ Stack Developer</div>
          </div>
        </div>
        <br />
        <div className="content">
          <div className="main">
            <div className="section">
              <div className="bulletin">
                <div className="sectionheaderm">Profile</div>
                <div className="sectionicon">
                  <img src="profile.png" alt="profile" className="img" />
                </div>
              </div>
              <div className="para">{getProfileRow("profile")?.data}</div>
            </div>
            <div className="section">
              <div className="bulletin">
                <div className="sectionheaderm">Skills</div>
                <div className="sectionicon">
                  <img src="skill.png" alt="skill" className="img" />
                </div>
              </div>
              <div className="skill">
                <div className="subsectionheader">LANGUAGES</div>
                <div className="para">
                  {renderSkillItems("languages", "language")}
                </div>
              </div>
              <div className="skill">
                <div className="subsectionheader">FRAMEWORKS</div>
                <div className="para">
                  {renderSkillItems("frameworks", "framework")}{" "}
                </div>
              </div>
              <div className="skill">
                <div className="subsectionheader">DATABASE</div>
                <div className="para">
                  {renderSkillItems("databases", "framework")}{" "}
                </div>
              </div>
              <div className="skill">
                <div className="subsectionheader">SOFTWARE</div>
                <div className="para">
                  {renderSkillItems("software", "language")}{" "}
                </div>
              </div>
            </div>
            <div className="section">
              <div className="bulletin">
                <div className="sectionheaderm">Projects</div>
                <div className="sectionicon">
                  <img src="project.png" alt="project" className="img" />
                </div>
              </div>
              <div className="project">
                <div className="subsectionheader">
                  {getProfileRow("project1Title")?.data}
                </div>
                <div className="tag" style={{ width: "20%" }}>
                  {getProfileRow("project1Field")?.data}
                </div>
                <div className="para">
                  {getProfileRow("project1Description")?.data}
                </div>
                <div className="bulletin">
                  <div className="proicon">
                    <img
                      src="github.png"
                      alt="github"
                      className="img"
                      onClick={() =>
                        window.open(
                          getProfileRow("project1Github")?.data || "#",
                          "_blank"
                        )
                      }
                    />
                  </div>
                  <div className="protxt">
                    {getProfileRow("project1Github")?.data}
                  </div>
                  <div className="proicon">
                    <img
                      src="wlink.png"
                      alt="resume"
                      className="img"
                      onClick={() =>
                        window.open(
                          getProfileRow("project1Website")?.data || "#",
                          "_blank"
                        )
                      }
                    />
                  </div>
                  <div className="protxt">
                    {getProfileRow("project1Website")?.data}
                  </div>
                </div>
              </div>
              <div className="project">
                <div className="subsectionheader">
                  {getProfileRow("project2Title")?.data}
                </div>
                <div className="tag" style={{ width: "20%" }}>
                  {getProfileRow("project2Field")?.data}
                </div>
                <div className="para">
                  {getProfileRow("project2Description")?.data}
                </div>
                <div className="bulletin">
                  <div className="proicon">
                    <img
                      src="github.png"
                      alt="github"
                      className="img"
                      onClick={() =>
                        window.open(
                          getProfileRow("project2Github")?.data || "#",
                          "_blank"
                        )
                      }
                    />
                  </div>
                  <div className="protxt">
                    {getProfileRow("project2Github")?.data}
                  </div>
                  <div className="proicon">
                    <img
                      src="wlink.png"
                      alt="resume"
                      className="img"
                      onClick={() =>
                        window.open(
                          getProfileRow("project2Website")?.data || "#",
                          "_blank"
                        )
                      }
                    />
                  </div>
                  <div className="protxt">
                    {getProfileRow("project2Website")?.data}
                  </div>
                </div>
              </div>
              <div className="project">
                <div className="subsectionheader">
                  {getProfileRow("project3Title")?.data}
                </div>
                <div className="tag" style={{ width: "20%" }}>
                  {getProfileRow("project3Field")?.data}
                </div>
                <div className="para">
                  {getProfileRow("project3Description")?.data}
                </div>
                <div className="bulletin">
                  <div className="proicon">
                    <img
                      src="github.png"
                      alt="github"
                      className="img"
                      onClick={() =>
                        window.open(
                          getProfileRow("project3Github")?.data || "#",
                          "_blank"
                        )
                      }
                    />
                  </div>
                  <div className="protxt">
                    {getProfileRow("project3Github")?.data}
                  </div>
                  <div className="proicon">
                    <img
                      src="wlink.png"
                      alt="resume"
                      className="img"
                      onClick={() =>
                        window.open(
                          getProfileRow("project3Website")?.data || "#",
                          "_blank"
                        )
                      }
                    />
                  </div>
                  <div className="protxt">
                    {getProfileRow("project3Website")?.data}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="sidebar">
            <div className="section" style={{ marginRight: "auto" }}>
              <div className="para">
                <div className="bulletin">
                  <div className="icon">
                    <img src="phone.png" alt="phone" className="img" />
                  </div>
                  <div>+91 9359319388</div>
                  <Copy
                    text="+91 9359319388"
                    copyIcon="copy.png"
                    checkIcon="check.png"
                  />
                </div>
                <div className="bulletin">
                  <div className="icon">
                    <img src="email.png" alt="email" className="img" />
                  </div>
                  <div className="mailtext">adnanyhamid786@gmail.com</div>
                  <Copy
                    text="adnanyhamid786@gmail.com"
                    copyIcon="copy.png"
                    checkIcon="check.png"
                  />
                </div>
                <div className="bulletin">
                  <div className="icon">
                    <img src="address.png" alt="address" className="img" />
                  </div>

                  <Link link={"https://maps.app.goo.gl/32wGQdNzgg7uXA7d8"} />
                  <div>Takli Rd., Dwarka, Nashik - 422011</div>
                  <Copy
                    text="Takli Rd., Dwarka, Nashik - 422011"
                    copyIcon="copy.png"
                    checkIcon="check.png"
                  />
                </div>
                <div className="bulletin">
                  <div className="icon">
                    <img
                      src="github.png"
                      alt="https://github.com/AdnanHamid175"
                      className="img"
                    />
                  </div>
                  <Link link={"https://github.com/AdnanHamid175"} />

                  <div className="ellipsisText">github.com/AdnanHamid175</div>
                  <Copy
                    text="https://github.com/AdnanHamid175"
                    copyIcon="copy.png"
                    checkIcon="check.png"
                  />
                </div>
                <div className="bulletin">
                  <div className="icon">
                    <img
                      src="linkedin.png"
                      alt="https://www.linkedin.com/in/adnan-hamid-73b073325/"
                      className="img"
                    />
                  </div>
                  <Link
                    link={"https://www.linkedin.com/in/adnan-hamid-73b073325/"}
                  />

                  <div className="ellipsisText">
                    www.linkedin.com/in/adnan-hamid-73b073325
                  </div>
                  <Copy
                    text="https://www.linkedin.com/in/adnan-hamid-73b073325/"
                    copyIcon="copy.png"
                    checkIcon="check.png"
                  />
                </div>
              </div>
            </div>
            <div className="section">
              <div className="bulletin">
                <div className="sectionheadersb">Education</div>
                <div className="sectionicon">
                  <img src="education.png" alt="education" className="img" />
                </div>
              </div>
              <div className="education">
                <div className="subsectionheader">
                  MSBHSC 12th - <div className="status">Pursuing</div>
                </div>
                <div className="para">
                  <div style={{ marginBottom: "3px" }}>
                    BYK College Of Commerce, Nashik
                  </div>
                  <div>2025 - 2026</div>
                </div>
              </div>
              <div className="education">
                <div className="subsectionheader">
                  MSBSSC 10th - <div className="status">84.20%</div>
                </div>
                <div className="para">
                  <div style={{ marginBottom: "3px" }}>
                    MSB Educational Institute, Nashik
                  </div>
                  <div>2023 - 2024</div>
                </div>
              </div>
            </div>
            <div className="section">
              <div className="bulletin">
                <div className="sectionheadersb">Interests</div>
                <div className="sectionicon">
                  <img src="interest.png" alt="interest" className="img" />
                </div>
              </div>
              <div>
                <div className="bulletin">
                  <div className="interest">
                    <img src="soccer.png" alt="soccer" className="img" />
                  </div>
                  <div className="interest">
                    <img src="book.png" alt="read" className="img" />
                  </div>
                </div>
                <div className="bulletin">
                  <div className="interest">
                    <img src="cook.png" alt="cooking" className="img" />
                  </div>
                  <div className="interest">
                    <img src="chess.png" alt="chess" className="img" />
                  </div>
                </div>
              </div>
            </div>
            <div className="section">
              <div className="bulletin">
                <div className="sectionheadersb">Awards</div>
                <div className="sectionicon">
                  <img src="award.png" alt="award" className="img" />
                </div>
              </div>
              <div className="subsectionheader"></div>
              <div className="para"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="parallax">
        <button className="print noprint" onClick={() => window.print()}>
          <img src="print.png" alt="print" className="img" />
        </button>
        <button
          className="print noprint"
          style={{ marginTop: "10px" }}
          onClick={() =>
            (window.location.href = "http://localhost:5173/Admin")
          }>
          <img src="update.png" alt="update" className="img" />
        </button>
      </div>
    </div>
  );
}

export default App;