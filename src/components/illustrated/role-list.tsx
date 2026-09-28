"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CAREER_ROLES, type CareerRole } from "@/lib/careers";
import { assets } from "./assets";

export function RoleTags({ role }: { role: CareerRole }) {
  return (
    <div className="design-role-tags">
      <span>{role.location}</span>
      <span>{role.type}</span>
      {role.experience && <span>{role.experience}</span>}
      <span>Works with the founders</span>
    </div>
  );
}
export function RoleList() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const roles = CAREER_ROLES.filter(
    (role) =>
      (!category || role.category === category) &&
      `${role.title} ${role.description} ${role.location}`
        .toLowerCase()
        .includes(query.trim().toLowerCase()),
  );
  return (
    <>
      <div className="design-role-filters">
        <div className="design-role-search">
          <Image
            src={assets.careers.imgMagnifyingGlass}
            width={32}
            height={32}
            alt=""
          />
          <label htmlFor="role-search" className="sr-only">
            Search roles
          </label>
          <Input
            id="role-search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search Role"
            type="search"
          />
        </div>
        <span>Or</span>
        <label htmlFor="role-category" className="sr-only">
          Role category
        </label>
        <select
          id="role-category"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        >
          <option value="">Category</option>
          {Array.from(new Set(CAREER_ROLES.map((role) => role.category))).map(
            (name) => (
              <option key={name}>{name}</option>
            ),
          )}
        </select>
      </div>
      <p className="sr-only" role="status">
        {roles.length} {roles.length === 1 ? "role" : "roles"} found
      </p>
      <div className="design-role-list">
        {roles.map((role) => (
          <Link
            href={`/careers/${role.slug}`}
            key={role.slug}
            className="design-role-card"
          >
            <div className="design-role-card-body">
              <h3>{role.title}</h3>
              <RoleTags role={role} />
              <p>{role.description}</p>
            </div>
            <span className="design-role-card-arrow">
              <Image
                src={assets.careers.imgArrowRight}
                alt=""
                width={32}
                height={32}
              />
            </span>
          </Link>
        ))}
      </div>
      {roles.length === 0 && (
        <div className="design-roles-empty">
          <h3>No roles found</h3>
          <p>Try a different keyword or category.</p>
          <Button
            variant="secondary"
            onClick={() => {
              setQuery("");
              setCategory("");
            }}
          >
            Clear filters
          </Button>
        </div>
      )}
    </>
  );
}
