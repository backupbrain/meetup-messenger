/*
  Warnings:

  - You are about to drop the column `description` on the `GroupEvent` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Group" ADD COLUMN "pageNumber" INTEGER;
ALTER TABLE "Group" ADD COLUMN "rowNumber" INTEGER;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_GroupEvent" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "url" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "location" TEXT,
    "groupId" TEXT NOT NULL,
    "numAttendees" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "GroupEvent_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_GroupEvent" ("createdAt", "date", "groupId", "id", "location", "name", "numAttendees", "updatedAt", "url") SELECT "createdAt", "date", "groupId", "id", "location", "name", "numAttendees", "updatedAt", "url" FROM "GroupEvent";
DROP TABLE "GroupEvent";
ALTER TABLE "new_GroupEvent" RENAME TO "GroupEvent";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
