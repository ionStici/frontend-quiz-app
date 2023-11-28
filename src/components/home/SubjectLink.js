import Link from "next/link";
import Image from "next/image";

function SubjectLink({ title, icon, color }) {
  return (
    <li>
      <Link href={title.toLowerCase()}>
        <div style={{ backgroundColor: color }}>
          <Image src={icon} alt={title} width={28} height={28} />
        </div>
        <span>{title}</span>
      </Link>
    </li>
  );
}

export default SubjectLink;
