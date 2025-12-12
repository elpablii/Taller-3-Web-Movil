-- CreateTable
CREATE TABLE "devices" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "type" VARCHAR(50) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "location" VARCHAR(255),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "devices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sensor_readings" (
    "id" SERIAL NOT NULL,
    "deviceId" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "unit" VARCHAR(20) NOT NULL,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "recordedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "sensor_readings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ventas" (
    "id" SERIAL NOT NULL,
    "producto" TEXT NOT NULL,
    "categoria" TEXT NOT NULL,
    "monto" DOUBLE PRECISION NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "vendedor" TEXT,
    "region" TEXT,

    CONSTRAINT "ventas_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "sensor_readings_deviceId_recordedAt_idx" ON "sensor_readings"("deviceId", "recordedAt");

-- AddForeignKey
ALTER TABLE "sensor_readings" ADD CONSTRAINT "sensor_readings_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "devices"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
