-- CreateTable
CREATE TABLE "UserData" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "contactNumber" INTEGER,
    "address" TEXT,
    "gender" TEXT,
    "age" INTEGER,

    CONSTRAINT "UserData_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserData_id_key" ON "UserData"("id");

-- CreateIndex
CREATE UNIQUE INDEX "UserData_userId_key" ON "UserData"("userId");

-- AddForeignKey
ALTER TABLE "UserData" ADD CONSTRAINT "UserData_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
