import { useState } from "react";

export default function FactoryObjectMove({ selectedObject, setSelectedObject }) {
  const [dragging, setDragging] = useState(false);

  const handlePointerDown = (e, obj) => {
    if (e.shiftKey) {
      setDragging(true);
      setSelectedObject(obj);
    }
  };

  const handlePointerMove = (e) => {
    if (!dragging || !selectedObject) return;

    // X, Z축으로만 이동 (Y축 고정)
    setSelectedObject((prev) => ({
      ...prev,
      position: [prev.position[0] + e.movementX * 0.1, prev.position[1], prev.position[2] + e.movementY * 0.1],
    }));
  };

  const handlePointerUp = () => {
    setDragging(false);
  };

  return { handlePointerDown, handlePointerMove, handlePointerUp };
}
