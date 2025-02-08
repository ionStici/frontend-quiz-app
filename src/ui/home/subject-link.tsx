import { Link } from "react-router-dom";

type SubjectLinkProps = { title: string; icon: string; color: string };

export function SubjectLink({ title, icon, color }: SubjectLinkProps) {
  return (
    <li>
      <Link to={title.toLowerCase()}>
        <div style={{ backgroundColor: color }}>
          <img src={icon} alt={title} width={28} height={28} />
        </div>
        <span>{title}</span>
      </Link>
    </li>
  );
}
