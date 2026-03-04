import React from "react";
import { useTheme } from "../context/ThemeContext.jsx";

function Loader() {
  const { isDark } = useTheme();

  const loaderStyle = {
    transform: "rotateZ(45deg)",
    perspective: "1000px",
    borderRadius: "50%",
    width: "5vw",
    height: "5vw",
    color: isDark ? "#fff" : "#1a1a2e",
    position: "relative",
  };

  const sharedCircleStyle = {
    content: "''",
    display: "block",
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  };

  return (
    <>
      <style>{`
        @keyframes spin {
          0%, 100% {
            box-shadow: .2em 0px 0 0px currentcolor;
          }
          12% {
            box-shadow: .2em .2em 0 0 currentcolor;
          }
          25% {
            box-shadow: 0 .2em 0 0px currentcolor;
          }
          37% {
            box-shadow: -.2em .2em 0 0 currentcolor;
          }
          50% {
            box-shadow: -.2em 0 0 0 currentcolor;
          }
          62% {
            box-shadow: -.2em -.2em 0 0 currentcolor;
          }
          75% {
            box-shadow: 0px -.2em 0 0 currentcolor;
          }
          87% {
            box-shadow: .2em -.2em 0 0 currentcolor;
          }
        }
      `}</style>

      <div style={loaderStyle}>
        <div
          style={{
            ...sharedCircleStyle,
            transform: "rotateX(70deg)",
            color: "#ff1f2c",
          }}
        ></div>
        <div
          style={{
            ...sharedCircleStyle,
            transform: "rotateY(70deg)",
            color: "#0edb61",
            animationDelay: ".4s",
          }}
        ></div>
      </div>
    </>
  );
}

export default Loader;
