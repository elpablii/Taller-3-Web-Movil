
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Start seeding ...')

  // Clean up existing data
  await prisma.sensorReading.deleteMany()
  await prisma.device.deleteMany()

  // Create Devices
  const device1 = await prisma.device.create({
    data: {
      name: 'Sensor Norte 01',
      type: 'Temperature/Humidity',
      location: 'Plantación Zona Norte',
      readings: {
        create: [
          { value: 25.5, unit: 'C', latitude: -33.45, longitude: -70.66 },
          { value: 26.1, unit: 'C', latitude: -33.45, longitude: -70.66 },
          { value: 24.8, unit: 'C', latitude: -33.45, longitude: -70.66 },
        ]
      }
    }
  })

  const device2 = await prisma.device.create({
    data: {
      name: 'GPS Tracker Camión A',
      type: 'GPS',
      location: 'Móvil', // Represents a moving asset
      readings: {
        create: [
          { value: 0, unit: 'N/A', latitude: -33.4600, longitude: -70.6600 },
          { value: 0, unit: 'N/A', latitude: -33.4610, longitude: -70.6610 },
          { value: 0, unit: 'N/A', latitude: -33.4620, longitude: -70.6620 },
        ]
      }
    }
  })

    const device3 = await prisma.device.create({
    data: {
      name: 'Sensor Sur 05',
      type: 'Humidity',
      location: 'Invernadero Sur',
      readings: {
        create: [
            { value: 60.5, unit: '%', latitude: -33.5000, longitude: -70.7000 },
            { value: 62.0, unit: '%', latitude: -33.5000, longitude: -70.7000 },
        ]
      }
    }
  })


  console.log(`Created devices: ${device1.name}, ${device2.name}, ${device3.name}`)
  console.log('Seeding finished.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
