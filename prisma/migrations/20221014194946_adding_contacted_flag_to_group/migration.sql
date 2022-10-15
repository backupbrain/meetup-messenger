-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Group" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "url" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "fullDescription" TEXT,
    "pageNumber" INTEGER,
    "rowNumber" INTEGER,
    "numMembers" INTEGER NOT NULL,
    "organizersUrl" TEXT,
    "membersUrl" TEXT,
    "isPublic" BOOLEAN NOT NULL,
    "numPastEvents" INTEGER,
    "numUpcomingEvents" INTEGER,
    "initialMessage" TEXT,
    "initialMessageSent" BOOLEAN NOT NULL DEFAULT false,
    "html" TEXT,
    "activityId" TEXT NOT NULL,
    "locationId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Group_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "Activity" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Group_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Group" ("activityId", "createdAt", "description", "fullDescription", "html", "id", "initialMessage", "isPublic", "locationId", "membersUrl", "name", "numMembers", "numPastEvents", "numUpcomingEvents", "organizersUrl", "pageNumber", "rowNumber", "updatedAt", "url") SELECT "activityId", "createdAt", "description", "fullDescription", "html", "id", "initialMessage", "isPublic", "locationId", "membersUrl", "name", "numMembers", "numPastEvents", "numUpcomingEvents", "organizersUrl", "pageNumber", "rowNumber", "updatedAt", "url" FROM "Group";
DROP TABLE "Group";
ALTER TABLE "new_Group" RENAME TO "Group";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
