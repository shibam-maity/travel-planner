/*
	jsrepo 1.24.1
	Installed from github/davidhdev/react-bits
	12-1-2025
*/

import { forwardRef, useMemo, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import "./VariableProximity.scss";

function useAnimationFrame(callback) {
  const requestRef = useRef();
  const previousTimeRef = useRef();

  useEffect(() => {
    const animate = (time) => {
      if (previousTimeRef.current !== undefined) {
        const deltaTime = time - previousTimeRef.current;
        callback(deltaTime);
      }
      previousTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, [callback]);
}

const VariableProximity = forwardRef(({ children, settings = "" }, ref) => {
  const containerRef = useRef(null);
  const mousePosition = useRef({ x: 0, y: 0 });

  const parsedSettings = useMemo(() => {
    const defaultSettings = {
      proximity: 100,
      spread: 0,
      blur: 0,
      opacity: 0,
      color: "#000000",
    };

    if (!settings || typeof settings !== 'string') {
      return defaultSettings;
    }

    try {
      const settingsArray = settings.split(";").filter(Boolean);
      return settingsArray.reduce((acc, setting) => {
        const [key, value] = setting.split(":");
        if (key && value) {
          acc[key.trim()] = value.trim();
        }
        return acc;
      }, { ...defaultSettings });
    } catch (error) {
      console.error("Error parsing settings:", error);
      return defaultSettings;
    }
  }, [settings]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mousePosition.current = {
        x: e.clientX,
        y: e.clientY,
      };
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <motion.div
      ref={containerRef}
      className="variable-proximity"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
    >
      {children}
    </motion.div>
  );
});

VariableProximity.displayName = "VariableProximity";

export default VariableProximity;
