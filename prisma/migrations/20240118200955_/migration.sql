-- CreateTable
CREATE TABLE "streakup_accounts" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "streakup_accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "streakup_sessions" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "streakup_sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "streakup_users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "timezone" TEXT NOT NULL DEFAULT 'UTC',
    "tokens" INTEGER NOT NULL DEFAULT 10,
    "level" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "streakup_users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "streakup_verificationtokens" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "streakup_habits" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "emoji" TEXT NOT NULL DEFAULT '',
    "repeatPattern" TEXT NOT NULL DEFAULT '1d',
    "readablePattern" TEXT NOT NULL DEFAULT 'Daily',
    "levels" INTEGER NOT NULL DEFAULT 1,
    "lastLevel" INTEGER NOT NULL DEFAULT 0,
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "streak" INTEGER NOT NULL DEFAULT 0,
    "lastStreak" INTEGER NOT NULL DEFAULT 0,
    "streakBreaks" INTEGER NOT NULL DEFAULT 0,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "streakup_habits_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "streakup_accounts_provider_providerAccountId_key" ON "streakup_accounts"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "streakup_sessions_sessionToken_key" ON "streakup_sessions"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "streakup_users_email_key" ON "streakup_users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "streakup_verificationtokens_token_key" ON "streakup_verificationtokens"("token");

-- CreateIndex
CREATE UNIQUE INDEX "streakup_verificationtokens_identifier_token_key" ON "streakup_verificationtokens"("identifier", "token");

-- AddForeignKey
ALTER TABLE "streakup_accounts" ADD CONSTRAINT "streakup_accounts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "streakup_users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "streakup_sessions" ADD CONSTRAINT "streakup_sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "streakup_users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "streakup_habits" ADD CONSTRAINT "streakup_habits_userId_fkey" FOREIGN KEY ("userId") REFERENCES "streakup_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
