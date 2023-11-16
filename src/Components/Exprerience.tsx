import {
  Center,
  Environment,
  OrbitControls,
  Text,
  Text3D,
} from "@react-three/drei";
// import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import { Perf } from "r3f-perf";

import px from "/environmentMap/px.png";
import nx from "/environmentMap/nx.png";
import py from "/environmentMap/py.png";
import ny from "/environmentMap/ny.png";
import pz from "/environmentMap/pz.png";
import nz from "/environmentMap/nz.png";

type props = {
  contributionCount: Number[][];
  username: String | undefined;
};

const Exprerience = (props: props) => {
  const uiControl = useControls("perf", {
    visible: true,
  });

  // useFrame((state, delta) => {});

  return (
    <>
      <color args={["#242424"]} attach={"background"} />
      <Environment files={[px, nx, py, ny, pz, nz]} />

      {/**
       * performance monitor
       */}
      {uiControl.visible ? <Perf position="top-left" /> : null}

      {/**
       * orbit controls
       */}
      {/* <OrbitControls maxPolarAngle={Math.PI / 2} /> */}
      <OrbitControls />

      {/**
       * lights
       */}
      <directionalLight castShadow intensity={1.5} position={[3, 3, 3]} />
      <ambientLight intensity={0.5} />

      {/**
       * walls
       */}
      <Center top>
        {props.contributionCount.map((weeks, weekCount) =>
          weeks.map((day, dayCount) => (
            <>
              <mesh
                receiveShadow
                castShadow
                scale={[1, day, 1]}
                position={[weekCount + 2, day / 2, dayCount + 1]}
                key={dayCount}
              >
                <boxGeometry />
                <meshStandardMaterial color="red" />
              </mesh>
              <Text
                position={[weekCount + 2, day + 0.5, dayCount + 1]}
                scale={0.5}
                color="gray"
              >
                {day}
              </Text>
            </>
          ))
        )}
      </Center>

      {/**
       * ground
       */}
      <mesh
        scale={[props.contributionCount.length + 2, 10, 1.99]}
        rotation={[-Math.PI / 2, 0, 0]}
        position-y={-1}
        receiveShadow
      >
        <boxGeometry />
        <meshStandardMaterial color="red" />
      </mesh>

      {/*
       * name tag
       */}
      <Text3D
        position={[
          -props.contributionCount.length / 2 + props.username?.length / 2,
          -1.5,
          5.1,
        ]}
        letterSpacing={-0.06}
        font="/Inter_Bold.json"
        height={0.2}
      >
        @{props.username}
        <meshStandardMaterial />
      </Text3D>
    </>
  );
};

export default Exprerience;
