import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Limpiar datos antiguos (opcional, cuidado en producción)
  await prisma.venta.deleteMany()

  const categorias = ['Electrónica', 'Ropa', 'Hogar', 'Deportes']
  const regiones = ['Norte', 'Centro', 'Sur', 'Metropolitana']
  const vendedores = ['Juan', 'Ana', 'Pedro', 'Maria', 'Luisa']

  const ventas = []

  // Generar 50 ventas falsas
  for (let i = 0; i < 50; i++) {
    const randomCategoria = categorias[Math.floor(Math.random() * categorias.length)]
    const randomRegion = regiones[Math.floor(Math.random() * regiones.length)]
    const randomVendedor = vendedores[Math.floor(Math.random() * vendedores.length)]

    // Fecha aleatoria en los últimos 30 días
    const date = new Date()
    date.setDate(date.getDate() - Math.floor(Math.random() * 30))

    ventas.push({
      producto: `Producto ${i + 1}`,
      categoria: randomCategoria,
      monto: Math.floor(Math.random() * 50000) + 1000, // Entre 1.000 y 51.000
      cantidad: Math.floor(Math.random() * 10) + 1,
      fecha: date,
      vendedor: randomVendedor,
      region: randomRegion,
    })
  }

  // Insertar en la BD
  await prisma.venta.createMany({
    data: ventas,
  })

  console.log('✅ Base de datos poblada con 50 ventas')
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