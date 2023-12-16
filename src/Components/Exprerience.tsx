import {
  // BakeShadows,
  Center,
  Environment,
  Html,
  OrbitControls,
  Text,
  Text3D,
  useGLTF,
  // useHelper,
} from "@react-three/drei";
// import { useFrame } from "@react-three/fiber";
// import { useControls } from "leva";
// import { Perf } from "r3f-perf";
// import * as THREE from "three";

import px from "/environmentMap/px.png";
import nx from "/environmentMap/nx.png";
import py from "/environmentMap/py.png";
import ny from "/environmentMap/ny.png";
import pz from "/environmentMap/pz.png";
import nz from "/environmentMap/nz.png";
import { useRef } from "react";
import { useThree } from "@react-three/fiber";

type props = {
  contributionCount: Number[][];
  username: String | undefined;
  year: String | undefined;
};

const Exprerience = (props: props) => {
  const model = useGLTF("/models/base.glb");

  const { gl, scene, camera } = useThree();

  const captureSnapshot = () => {
    gl.render(scene, camera);

    const dataURL = gl.domElement.toDataURL("image/png");

    // Create a temporary <a> element to trigger the download
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "snapshot.png";
    document.body.appendChild(link);

    // Simulate a click on the link to trigger the download
    link.click();

    // Clean up the temporary <a> element
    document.body.removeChild(link);
  };

  /**
   * controls
   */
  // const uiControl = useControls("perf", {
  //   visible: true,
  // });

  // useFrame((state, delta) => {});

  /**
   * helpers
   */

  const directionalLight = useRef();
  // useHelper(directionalLight, THREE.DirectionalLightHelper, 1);

  return (
    <>
      {/* <BakeShadows /> */}
      <color args={["#242424"]} attach={"background"} />
      <Environment files={[px, nx, py, ny, pz, nz]} />

      {/**
       * performance monitor
       */}
      {/* {uiControl.visible ? <Perf position="top-left" /> : null} */}

      {/**
       * orbit controls
       */}

      <OrbitControls maxPolarAngle={Math.PI / 2} />

      {/**
       * lights
       */}
      <directionalLight
        // ref={directionalLight}
        castShadow
        intensity={2}
        position={[5, 5, 5]}
      />

      <directionalLight
        ref={directionalLight}
        castShadow
        intensity={0.4}
        position={[-5, 7, -5]}
      />
      <ambientLight intensity={0.6} />
      {/**
       * walls
       */}
      <Center top>
        {props.contributionCount.map((weeks, weekCount) =>
          weeks.map((day: any, dayCount) => (
            <group key={dayCount} scale={0.2}>
              <mesh
                receiveShadow
                castShadow
                scale={[0.9, day, 0.9]}
                position={[weekCount, day / 2, dayCount]}
                onPointerEnter={(e) => {
                  e.eventObject.parent.children[1].scale.y = 0.5;
                }}
                onPointerLeave={(e) => {
                  e.eventObject.parent.children[1].scale.y = 0;
                }}
              >
                <boxGeometry />
                <meshStandardMaterial
                  color="#B931FC"
                  roughness={0.3}
                  metalness={0.9}
                />
              </mesh>
              <Text
                position={[weekCount, day + 0.5, dayCount]}
                scale={[0.5, 0.0, 0.5]}
                color="gray"
              >
                {day}
              </Text>
            </group>
          ))
        )}
      </Center>

      {/**
       * base
       */}
      <mesh
        geometry={model.scene.children[0].geometry}
        // object={.scene}
        position-y={-0.265}
        scale={[3.6, 1, 21]}
        receiveShadow
        rotation={[0, Math.PI / 2, 0]}
        castShadow
      >
        <meshStandardMaterial color="#330000" roughness={0.2} metalness={0} />
      </mesh>

      {/**
       * ground
       */}
      <group scale={0.2}>
        <mesh
          scale={[100, 100, 1]}
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, -2, 0]}
          receiveShadow
        >
          <planeGeometry />
          <meshStandardMaterial color="#242424" roughness={1} metalness={0} />
        </mesh>

        {/*
         * name tag
         */}
        {props.username && (
          <Text3D
            position={[-props.contributionCount.length / 2.5, -1.5, 4.9]}
            rotation={[-0.3, 0, 0]}
            letterSpacing={-0.06}
            font="/Inter_Bold.json"
            height={0.4}
            castShadow
          >
            @{props.username}
            <meshStandardMaterial color="red" roughness={0} metalness={1} />
          </Text3D>
        )}
        {/* year */}
        {props.year && (
          <Text3D
            position={[props.contributionCount.length / 2.5, -1.5, 4.9]}
            rotation={[-0.3, 0, 0]}
            letterSpacing={-0.06}
            font="/Inter_Bold.json"
            height={0.5}
            castShadow
          >
            {props.year}
            <meshStandardMaterial color="red" roughness={0} metalness={1} />
          </Text3D>
        )}
        <Html>
          <button
            className="button absolute top-[40vh] right-[15vw] bg-red-100 whitespace-nowrap"
            onClick={captureSnapshot}
          >
            Capture snapshot
          </button>
        </Html>
      </group>
    </>
  );
};

export default Exprerience;
