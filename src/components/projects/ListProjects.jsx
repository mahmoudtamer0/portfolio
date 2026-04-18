import { useEffect, useState } from "react";
import ProjectCard from "./ProjectCard";
import "./listProjects.css"

const CATEGORIES = ["All", "Fullstack", "Backend", "Frontend"];
export default function ListProjects() {
    const [active, setActive] = useState("All");
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                setLoading(true);

                const res = await fetch(
                    `${import.meta.env.VITE_API_URL}/projects`
                );


                const data = await res.json();
                console.log("Fetched projects:", data);
                if (!res.ok) {
                    console.log("Fetched projects:", data);
                    throw new Error(data.message || "Failed to fetch projects");
                }

                setProjects(data);
            } catch (err) {
                console.log("Fetched projects:", data);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };


        fetchProjects();
    }, []);


    const filtered =
        active === "All"
            ? projects
            : projects.filter((p) =>
                p.stack?.toLowerCase() === active.toLowerCase()
            );

    return (
        <section id="projects">
            <div className="container">

                <div className="row mb-2" style={{ paddingBottom: "50px" }}>
                    <div className="col-lg-8">
                        <span className="section-label reveal">My Work</span>
                        <h2 className="section-title reveal reveal-delay-1">
                            Projects
                        </h2>
                    </div>
                </div>

                {loading && <p>Loading projects...</p>}

                {error && <p style={{ color: "red" }}>{error}</p>}

                {/* {!loading && (
                    <div className="filter-pills reveal-delay-2 mb-5">
                        {CATEGORIES.map((cat) => (
                            <button
                                key={cat}
                                className={`filter-pill ${active === cat ? "active" : ""
                                    }`}
                                onClick={() => setActive(cat)}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                )} */}


                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 cards-grid">
                    {filtered.map((project) => (
                        <div
                            key={project._id}
                        >
                            <ProjectCard project={project} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}