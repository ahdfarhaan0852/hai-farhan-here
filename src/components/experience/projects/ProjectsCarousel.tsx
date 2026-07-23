import { useMemo, useState } from "react";
import { ProjectTile } from "./ProjectTile";
import { AHMAD_FARHAN_PROJECTS } from "../../../constants/mohitvirliData";
import { usePortalStore } from "../../../stores/portalStore";

export const ProjectsCarousel: React.FC = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const isActive = usePortalStore((state) => state.activePortalId === "projects");
  const activeId = isActive ? selectedId : null;

  const onClick = (id: number) => {
    setSelectedId(id === selectedId ? null : id);
  };

  const tiles = useMemo(() => {
    const fov = Math.PI;
    const distance = 10;

    const columns = Math.ceil(AHMAD_FARHAN_PROJECTS.length / 2);

    return AHMAD_FARHAN_PROJECTS.map((project, i) => {
      const row = i % 2;
      const column = Math.floor(i / 2);

      const angle = (fov / columns) * column;

      const z = -distance * Math.sin(angle);
      const x = -distance * Math.cos(angle);

      const rotY = Math.PI / 2 - angle;

      const y = row === 0 ? 3.25 : 1;
      const datePosition = row === 0 ? "top" : "bottom";
      return (
        <ProjectTile
          key={i}
          datePosition={datePosition}
          project={project}
          index={i}
          position={[x, y, z]}
          rotation={[0, rotY, 0]}
          activeId={activeId}
          onClick={() => onClick(i)}
        />
      );
    });
  }, [activeId, isActive]);

  return (
    <group rotation={[0, -Math.PI / 12, 0]}>
      {tiles}
    </group>
  );
};
