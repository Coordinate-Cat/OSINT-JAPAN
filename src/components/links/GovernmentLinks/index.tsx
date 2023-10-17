import Link from "next/link";
import { FC } from "react";
import data from "./links.json";

const organizations = data.organizations;
export const organizationsLength = organizations.length;
export const organizationsName = organizations.map(
  (organization) => organization.name
);

export const GovernmentLinks: FC = () => {
  return (
    <ul className="grid grid-cols-3 gap-4">
      {organizations.map((organization) => (
        <li key={organization.id}>
          <Link href={organization.url} key={organization.name}>
            <p className="text-sm">{organization.name}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
};
