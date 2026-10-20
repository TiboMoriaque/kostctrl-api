import { and } from "@prisma/orm-postgres/orm-client";
import { db } from "./db";
import * as bcrypt from "bcrypt"

const companyRoles = [
  "OWNER",
  "ADMIN",
  "PROJECT_MANAGER",
  "ACCOUNTANT",
  "STAFF",
  "VIEWER",
];

const projectRoles = [
  "OWNER",
  "CONTRACTOR",
  "PROJECT_MANAGER",
  "SITE_MANAGER",
  "ACCOUNTANT",
  "WORKER",
  "VIEWER",
];

const roles = [
  ...companyRoles.map((name) => ({ name, roleScope: "COMPANY" as const })),
  ...projectRoles.map((name) => ({ name, roleScope: "PROJECT" as const })),
];

async function main() {
  for (const role of roles) {
    const existing = await db.orm.public.Role
      .where((ro) => and(ro.name.eq(role.name)  ,  ro.roleScope.eq(role.roleScope) ))
      .first();

    if (!existing) {
      await db.orm.public.Role.create(role);
    }
  }
  const hashedPassword = await bcrypt.hash("Password@2", 10)

  const user = await db.orm.public.User.create({
    email:  "tibo@test.com",
    firstName: "Tibo",
    lastName: "Tibus",
    phone: "0161117500",
    location: "Agla",
    password: hashedPassword
  })


}

main().catch((error: unknown) => {
  console.error("Failed to seed roles:", error);
  process.exitCode = 1;
});