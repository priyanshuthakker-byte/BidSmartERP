-- CreateTable
CREATE TABLE "Tender" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tenderNumber" TEXT NOT NULL,
    "workDescription" TEXT NOT NULL,
    "emd" TEXT NOT NULL,
    "preBid" TEXT NOT NULL,
    "queryDeadline" TEXT NOT NULL,
    "submissionDeadline" TEXT NOT NULL,
    "consortium" TEXT NOT NULL,
    "evaluation" TEXT NOT NULL,
    "pq" TEXT NOT NULL,
    "tq" TEXT NOT NULL,
    "scope" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "PreBidQuestion" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tenderId" INTEGER NOT NULL,
    "question" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Reminder" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tenderId" INTEGER NOT NULL,
    "note" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "WorkOrder" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "keyword" TEXT NOT NULL,
    "reference" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "StatusLog" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tenderId" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "updatedAt" DATETIME NOT NULL
);
