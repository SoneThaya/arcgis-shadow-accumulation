import React, { useEffect, useRef } from "react";
import { loadModules } from "esri-loader";

const Map = () => {
  const MapEl = useRef(null);

  useEffect(() => {
    loadModules([
      "esri/WebScene",
      "esri/views/SceneView",
      "esri/widgets/ShadowAccumulation",
    ]).then(([WebScene, SceneView, ShadowAccumulation]) => {
      const view = new SceneView({
        container: "viewDiv",

        map: new WebScene({
          portalItem: {
            id: "f2220db76c6448b4be8083d19ef4cf8d",
          },
        }),

        qualityProfile: "high",
        environment: {
          lighting: {
            directShadowsEnabled: false,
          },
        },
      });

      const widget = new ShadowAccumulation({
        view,
      });
      view.ui.add(widget, "top-right");
      widget.viewModel.date = new Date("May 1, 2021");

      let scenarioA = null;
      let scenarioB = null;

      view.when(() => {
        view.map.allLayers.forEach((layer) => {
          if (layer.title === "Development Scenario A") {
            scenarioA = layer;
          }
          if (layer.title === "Development Scenario B") {
            scenarioB = layer;
          }
        });
      });

      const buttonA = document.getElementById("scenarioA");
      const buttonB = document.getElementById("scenarioB");

      buttonA.addEventListener("click", (event) => {
        toggleScenarios("A");
      });

      buttonB.addEventListener("click", (event) => {
        toggleScenarios("B");
      });

      function toggleScenarios(active) {
        scenarioA.visible = active === "B" ? false : true;
        scenarioB.visible = active === "B" ? true : false;
        if (active === "B") {
          buttonA.classList.add("esri-button--secondary");
          buttonB.classList.remove("esri-button--secondary");
        }
        if (active === "A") {
          buttonA.classList.remove("esri-button--secondary");
          buttonB.classList.add("esri-button--secondary");
        }
      }
    });
  }, []);

  return (
    <>
      <div id="viewDiv" style={{ height: "100vh", width: "100vw" }} ref={MapEl}>
        <div id="selection">
          <button id="scenarioA" className="esri-button">
            Scenario A
          </button>
          <button id="scenarioB" className="esri-button esri-button--secondary">
            Scenario B
          </button>
        </div>
      </div>
    </>
  );
};

export default Map;
