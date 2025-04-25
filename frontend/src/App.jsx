import React from "react";
import "./App.css";
import Copy from "./components/Copy";
import Link from "./components/Link";

function App() {
  return (
    <div className="App">
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
        <br />
        <div className="content">
          <div className="main">
            <div className="section">
              <div className="bulletin">
                <div className="sectionheaderm">Profile</div>
                <div className="sectionicon">
                  <img
                    src="../public/profile.png"
                    alt="profile"
                    className="img"
                  />
                </div>
              </div>
              <div className="para"></div>
            </div>
            <div className="section">
              <div className="bulletin">
                <div className="sectionheaderm">Skills</div>
                <div className="sectionicon">
                  <img src="../public/skill.png" alt="skill" className="img" />
                </div>
              </div>
              <div className="skill">
                <div className="subsectionheader">LANGUAGES</div>
                <div className="para">
                  <div className="language"></div>
                </div>
              </div>
              <div className="skill">
                <div className="subsectionheader">FRAMEWORKS</div>
                <div className="para">
                  <div className="framework"></div>
                </div>
              </div>
              <div className="skill">
                <div className="subsectionheader">DATABASE</div>
                <div className="para">
                  <div className="framework"></div>
                </div>
              </div>
              <div className="skill">
                <div className="subsectionheader">SOFTWARE</div>
                <div className="para">
                  <div className="language"></div>
                </div>
              </div>
            </div>
            <div className="section">
              <div className="bulletin">
                <div className="sectionheaderm">Projects</div>
                <div className="sectionicon">
                  <img
                    src="../public/project.png"
                    alt="project"
                    className="img"
                  />
                </div>
              </div>
              <div className="project">
                <div className="subsectionheader">PROJECT</div>
                <div className="tag" style={{ width: "20%" }}>
                  Field
                </div>
                <div className="para"></div>
                <div className="bulletin">
                  <div className="proicon">
                    <img
                      src="../public/github.png"
                      alt="github"
                      className="img"
                      onClick={() =>
                        window.open(
                          "https://github.com/AdnanHamid175",
                          "_blank"
                        )
                      }
                    />
                  </div>
                  <div className="protxt">github.com/AdnanHamid175</div>
                  <div className="proicon">
                    <img
                      src="../public/wlink.png"
                      alt="resume"
                      className="img"
                      onClick={() => window.open("www.example.com", "_blank")}
                    />
                  </div>{" "}
                  <div className="protxt">www.example.com</div>
                </div>
              </div>
              <div className="project">
                <div className="subsectionheader">PROJECT</div>
                <div className="tag" style={{ width: "20%" }}>
                  Field
                </div>
                <div className="para"></div>
                <div className="bulletin">
                  <div className="proicon">
                    <img
                      src="../public/github.png"
                      alt="github"
                      className="img"
                      onClick={() =>
                        window.open(
                          "https://github.com/AdnanHamid175",
                          "_blank"
                        )
                      }
                    />
                  </div>
                  <div className="protxt">github.com/AdnanHamid175</div>
                  <div className="proicon">
                    <img
                      src="../public/wlink.png"
                      alt="resume"
                      className="img"
                      onClick={() => window.open("www.example.com", "_blank")}
                    />
                  </div>{" "}
                  <div className="protxt">www.example.com</div>
                </div>
              </div>
              <div className="project">
                <div className="subsectionheader">PROJECT</div>
                <div className="tag" style={{ width: "20%" }}>
                  Field
                </div>
                <div className="para"></div>
                <div className="bulletin">
                  <div className="proicon">
                    <img
                      src="../public/github.png"
                      alt="github"
                      className="img"
                      onClick={() =>
                        window.open(
                          "https://github.com/AdnanHamid175",
                          "_blank"
                        )
                      }
                    />
                  </div>
                  <div className="protxt">github.com/AdnanHamid175</div>
                  <div className="proicon">
                    <img
                      src="../public/wlink.png"
                      alt="resume"
                      className="img"
                      onClick={() => window.open("www.example.com", "_blank")}
                    />
                  </div>{" "}
                  <div className="protxt">www.example.com</div>
                </div>
              </div>
            </div>
          </div>
          <div className="sidebar">
            <div className="section" style={{ marginRight: "auto" }}>
              <div className="para">
                <div className="bulletin">
                  <div className="icon">
                    <img
                      src="../public/phone.png"
                      alt="phone"
                      className="img"
                    />
                  </div>
                  <div>+91 9359319388</div>
                  <Copy
                    text="+91 9359319388"
                    copyIcon="/copy.png"
                    checkIcon="/check.png"
                  />
                </div>
                <div className="bulletin">
                  <div className="icon">
                    <img
                      src="../public/email.png"
                      alt="email"
                      className="img"
                    />
                  </div>
                  <div className="mailtext">adnanyhamid786@gmail.com</div>
                  <Copy
                    text="adnanyhamid786@gmail.com"
                    copyIcon="/copy.png"
                    checkIcon="/check.png"
                  />
                </div>
                <div className="bulletin">
                  <div className="icon">
                    <img
                      src="../public/address.png"
                      https:alt="address"
                      className="img"
                    />
                  </div>

                  <Link link={"https://maps.app.goo.gl/32wGQdNzgg7uXA7d8"} />
                  <div>Takli Rd., Dwarka, Nashik - 422011</div>
                  <Copy
                    text="Takli Rd., Dwarka, Nashik - 422011"
                    copyIcon="/copy.png"
                    checkIcon="/check.png"
                  />
                </div>
                <div className="bulletin">
                  <div className="icon">
                    <img
                      src="../public/github.png"
                      alt="https://github.com/AdnanHamid175"
                      className="img"
                    />
                  </div>
                  <Link link={"https://github.com/AdnanHamid175"} />

                  <div className="ellipsisText">github.com/AdnanHamid175</div>
                  <Copy
                    text="https://github.com/AdnanHamid175"
                    copyIcon="/copy.png"
                    checkIcon="/check.png"
                  />
                </div>
                <div className="bulletin">
                  <div className="icon">
                    <img
                      src="../public/linkedin.png"
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
                    copyIcon="/copy.png"
                    checkIcon="/check.png"
                  />
                </div>
              </div>
            </div>
            <div className="section">
              <div className="bulletin">
                <div className="sectionheadersb">Education</div>
                <div className="sectionicon">
                  <img
                    src="../public/education.png"
                    alt="education"
                    className="img"
                  />
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
                  <img
                    src="../public/interest.png"
                    alt="interest"
                    className="img"
                  />
                </div>
              </div>
              <div>
                <div className="bulletin">
                  <div className="interest">
                    <img
                      src="../public/soccer.png"
                      alt="soccer"
                      className="img"
                    />
                  </div>
                  <div className="interest">
                    <img src="../public/book.png" alt="read" className="img" />
                  </div>
                </div>
                <div className="bulletin">
                  <div className="interest">
                    <img
                      src="../public/cook.png"
                      alt="cooking"
                      className="img"
                    />
                  </div>
                  <div className="interest">
                    <img
                      src="../public/chess.png"
                      alt="chess"
                      className="img"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="section">
              <div className="bulletin">
                <div className="sectionheadersb">Awards</div>
                <div className="sectionicon">
                  <img src="../public/award.png" alt="award" className="img" />
                </div>
              </div>
              <div className="subsectionheader"></div>
              <div className="para"></div>
            </div>
          </div>
        </div>
      </div>
      <button className="print noprint" onClick={() => window.print()}>
        <img src="../public/print.png" alt="print" className="img" />
      </button>
    </div>
  );
}

export default App;
