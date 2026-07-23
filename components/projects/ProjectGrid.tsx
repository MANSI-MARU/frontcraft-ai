import ProjectCard from "./ProjectCard";

interface ProjectGridProps {
    projects: any[];
}

export default function ProjectGrid({
    projects,
}: ProjectGridProps) {
    return (
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {projects.map((project) => (
                <ProjectCard
                    key={project.id}
                    project={project}
                />
            ))}
        </div>
    );
}