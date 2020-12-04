import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";

const esURL ="https://gist.githubusercontent.com/jhonatan89/e379fadf8ed0f5381a2d8f8f3dea90c3/raw/e2bc20df02828d297f99558551e37959ac97a6f8/pokemon-es.json";
const enURL="https://gist.githubusercontent.com/jhonatan89/2089276d3ce0faceff8e55fc3459b818/raw/30ee1a77b3e328108faaaa9aaac6f2ddaa3d3711/pokemons-en.json";
const locale =
  (navigator.languages && navigator.languages[0]) ||
  navigator.language ||
  navigator.userLanguage ||
  "en-US";
;

function App() {
  const [en, setlangEn] = useState([]);

  const [es, setlangEs] = useState([]);

  useEffect(() => {
    if (!navigator.onLine) {
      if (
        localStorage.getItem("en") === null &&
        localStorage.getItem("es") === null
      ) {
        
      } else {
        setlangEn(JSON.parse(localStorage.getItem("en")));
        setlangEs(JSON.parse(localStorage.getItem("es")));
      }
    } else {
      fetch(esURL)
        .then((res) => res.json())
        .then((res) => {
          localStorage.setItem("es", JSON.stringify(res));
          setlangEs(res);
        });
      fetch(enURL)
        .then((res) => res.json())
        .then((res) => {
          localStorage.setItem("en", JSON.stringify(res));
          setlangEn(res);
        });
    }
  }, []);

  let messages = {};
  let headers = [];

  let lang = String(locale).substring(0, 2);

  if (lang === "es") {
    messages[String(locale)] = es;

    headers[0] = "#";
    headers[1] = "Imagen ";
    headers[2] = "Nombre";
    headers[3] = "Descripcion";
    headers[4] = "Altura";
    headers[5] = "Peso";
 
  } else {
    messages[String(locale)] = en;


    headers[0] = "#";
    headers[1] = "Image";
    headers[2] = "Name";
    headers[3] = "Description";
    headers[4] = "Height";
    headers[5] = "Weight";
  }

  let msg = messages[String(locale)];

  return (
    <div className="App">
      <div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>{headers[0]}</th>
              <th>{headers[1]}</th>
              <th>{headers[2]}</th>
              <th>{headers[3]}</th>
              <th>{headers[4]}</th>
              <th>{headers[5]}</th>
            </tr>
          </thead>
          <tbody>
            {msg.map((row) => {
              return (
                <tr key={row.id}>
                   <td>{row.id}</td>
                  <td></td>
                  <td>{row.name}</td>
                  <td>{row.description}</td>
                  <td>{row.height}</td>
                  <td>{row.weight}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
      <div>
        <barChart></barChart>
      </div>
    </div>
  );
}

export default App;