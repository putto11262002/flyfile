import { sql } from "drizzle-orm";
import {
  bigint,
  boolean,
  pgEnum,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uuid,
  type AnyPgColumn,
} from "drizzle-orm/pg-core";

const userRoles = ["admin", "user"] as const
export const userRoleEnum = pgEnum("user_role", userRoles);

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  role: userRoleEnum("role").notNull().default("user"),
  isSignIn: boolean("is_sign_in").notNull().default(false),
  blocked: boolean("blocked").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => sql`now()`),
});
    
export const OAuthAccounts = pgTable("oauth_accounts", {})

export const LocalAuthAccounts = pgTable("local_account", {})

const fileTypes = ["file", "folder"] as const
export const fileTypeEnum = pgEnum("file_type", fileTypes);

export const files = pgTable("files", {
  key: text("key").primaryKey(),
  name: text("name").notNull(),
  type: fileTypeEnum("file_type").notNull(),
  parent: text("parent").references((): AnyPgColumn => files.key),
  size: bigint("size", { mode: "number" }).notNull(), // Max value ~ 9e+15
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => sql`now()`),
});
    
const permissions=[
  "owner",
  "editor",
  "viewer",
] as const
export const permissionEnum = pgEnum("permission_enum", permissions);

export const userFiles = pgTable(
  "user_files",
  {
    userId: uuid("user_id").references(() => users.id),
    fileKey: text("file_key").references(() => files.key),
    permission: permissionEnum("permission").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at")
      .notNull()
      .defaultNow()
      .$onUpdate(() => sql`now()`),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.userId, table.fileKey] }),
  })
);
