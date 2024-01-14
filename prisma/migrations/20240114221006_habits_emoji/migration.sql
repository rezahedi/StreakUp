-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_habits" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "emoji" TEXT NOT NULL DEFAULT '',
    "repeatPattern" TEXT NOT NULL DEFAULT '1d',
    "readablePattern" TEXT NOT NULL DEFAULT 'Daily',
    "levels" INTEGER NOT NULL DEFAULT 1,
    "lastLevel" INTEGER NOT NULL DEFAULT 0,
    "startDate" DATETIME,
    "endDate" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "streak" INTEGER NOT NULL DEFAULT 0,
    "lastStreak" INTEGER NOT NULL DEFAULT 0,
    "streakBreaks" INTEGER NOT NULL DEFAULT 0,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "updatedAt" DATETIME NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "habits_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_habits" ("createdAt", "endDate", "id", "lastLevel", "lastStreak", "levels", "name", "readablePattern", "repeatPattern", "startDate", "status", "streak", "streakBreaks", "updatedAt", "userId") SELECT "createdAt", "endDate", "id", "lastLevel", "lastStreak", "levels", "name", "readablePattern", "repeatPattern", "startDate", "status", "streak", "streakBreaks", "updatedAt", "userId" FROM "habits";
DROP TABLE "habits";
ALTER TABLE "new_habits" RENAME TO "habits";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
