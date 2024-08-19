-- CreateTable
CREATE TABLE "logistic-operator" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cubicFactor" DOUBLE PRECISION NOT NULL,
    "distanceMult" DOUBLE PRECISION NOT NULL,
    "distanceMult100" DOUBLE PRECISION NOT NULL,
    "distanceMult500" DOUBLE PRECISION NOT NULL,
    "deliveryTime" DOUBLE PRECISION NOT NULL,
    "deliveryTime100" DOUBLE PRECISION NOT NULL,
    "deliveryTime500" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "logistic-operator_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "simulation" (
    "id" TEXT NOT NULL,
    "clientName" TEXT NOT NULL,
    "fromAddress" TEXT NOT NULL,
    "toAddress" TEXT NOT NULL,
    "productHeight" DOUBLE PRECISION NOT NULL,
    "productWidth" DOUBLE PRECISION NOT NULL,
    "productLength" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "simulation_pkey" PRIMARY KEY ("id")
);
