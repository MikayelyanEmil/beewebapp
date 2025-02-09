import ISidebar from "@/interfaces/components/Sidebar";
import Button from "../Button/Button";

const Sidebar: React.FC<ISidebar> = ({ setShowForm, workspaces }) => {
    return (<div className="sidebar">
        <div className="title">
            <span>Workspaces</span>
            <Button variant="first" text="+" onClick={() => setShowForm(prev => !prev)} />
        </div>
        <hr />
        {workspaces.map(w => {
            return <a href="#" key={w.id}>{w.slug}</a>;
        })}
    </div>
    );
}

export default Sidebar;