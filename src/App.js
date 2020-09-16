import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import "./App.css";
import * as THREE from "three";


const styleCanvas = {
  position: "absolute",
  top: 0,
  left: 0,
};

export default function App() {
  const CamRef = useRef();
  const RenderRef = useRef();
  useEffect(() => {

    var scene = new THREE.Scene();
    CamRef.current = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    const canvas = document.querySelector("#c");
    RenderRef.current = new THREE.WebGLRenderer({ canvas });
    RenderRef.current.setSize(
      window.innerWidth,
      window.innerHeight
    );

    const geometry = new THREE.BoxGeometry(2, 2, 2);
    const material = new THREE.MeshBasicMaterial({ color: 0x0000ff });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    CamRef.current.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);
      cube.rotation.x = 0.5;
      cube.rotation.y = 0.5;
      RenderRef.current.render(scene, CamRef.current);
    };

    animate();
  }, []);
  
  return (
    <div>
      <canvas style={styleCanvas} id="c" />
    </div>
  );
}
