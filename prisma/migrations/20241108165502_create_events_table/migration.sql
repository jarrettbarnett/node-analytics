-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "eventType" TEXT NOT NULL,
    "userId" TEXT,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "metadata" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Event_eventType_timestamp_idx" ON "Event"("eventType", "timestamp");

-- CreateIndex
CREATE INDEX "Event_userId_idx" ON "Event"("userId");
