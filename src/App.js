import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import "./App.css";
import * as THREE from "three";
import earthTexture from "./textures/earthmap1k.jpg";
import earthBumpMap from "./textures/earthbump1k.jpg";
import earthSpecularMap from "./textures/earthspec1k.jpg";
import cloudImage from "./textures/cloudimage.png";
import cloudTransparency from "./textures/earthcloudmaptrans.jpg";

const styleCanvas = {
  position: "absolute",
  top: 0,
  left: 0,
};
const info = {
  color: "white",
  position: "absolute",
  top: "10px",
  width: "100%",
  textAlign: "center",
  zIndex: 100,
  display: "block",
};

export default function App() {
  const CamRef = useRef();
  const RenderRef = useRef();
  useEffect(() => {
    var scene = new THREE.Scene();
    //define camera reference
    CamRef.current = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    //create canvas
    const canvas = document.querySelector("#c");
    RenderRef.current = new THREE.WebGLRenderer({ canvas });
    RenderRef.current.setSize(window.innerWidth, window.innerHeight);

    //add light
    var ambientLight = new THREE.AmbientLight(0xcccccc, 0.6);
    scene.add(ambientLight);

    var pointLight = new THREE.PointLight(0xffffff, 0.8);
    pointLight.position.x = 0;
    pointLight.position.y = 0;
    pointLight.position.z = 10;
    scene.add(pointLight);

    //create loader and load map texture to be used directly in material creation
    var loader = new THREE.TextureLoader();
    var earthTex = loader.load(earthTexture);
    var earthBump = loader.load(earthBumpMap);
    var eathSpec = loader.load(earthSpecularMap);
    //create sphere
    const geometry = new THREE.SphereGeometry(2, 32, 32);
    const material = new THREE.MeshPhongMaterial();
    material.map = earthTex;
    material.bumpMap = earthBump;
    material.bumpScale = 0.15;
    material.specularMap = eathSpec;
    material.specular = new THREE.Color("grey");
    material.shininess = 5;
    const earthMesh = new THREE.Mesh(geometry, material);

    var cloudTex = loader.load(cloudImage);
    var cloudGeometry = new THREE.SphereGeometry(2.05, 32, 32);
    var cloudMaterial = new THREE.MeshPhongMaterial({
      map: cloudTex,
      side: THREE.DoubleSide,
      opacity: 0.8,
      transparent: true,
      depthWrite: false,
    });
    var cloudMesh = new THREE.Mesh(cloudGeometry, cloudMaterial);
    earthMesh.add(cloudMesh);

    scene.add(earthMesh);

    CamRef.current.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);
      earthMesh.rotation.x = 0.4;
      earthMesh.rotation.y += 0.01;
      RenderRef.current.render(scene, CamRef.current);
    };

    animate();
  }, []);

  return (
    <div>
      <div style={info}>Description</div>
      <canvas style={styleCanvas} id="c" />
    </div>
  );
}
