import { PrismaClient } from '@prisma/client'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'
import * as dotenv from 'dotenv'
import * as path from 'path'

dotenv.config({ path: path.join(__dirname, '../.env') })

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
})

const adapter = new PrismaPg(pool)

const prisma = new PrismaClient({
    adapter,
})

async function main() {
  await prisma.venta.deleteMany()

  const categorias = ['Electrónica', 'Ropa', 'Hogar', 'Deportes']
  const regiones = ['Norte', 'Centro', 'Sur', 'Metropolitana']
  const vendedores = ['Juan', 'Ana', 'Pedro', 'Maria', 'Luisa']

  const ventas = []

  for (let i = 0; i < 50; i++) {
    const randomCategoria = categorias[Math.floor(Math.random() * categorias.length)]
    const randomRegion = regiones[Math.floor(Math.random() * regiones.length)]
    const randomVendedor = vendedores[Math.floor(Math.random() * vendedores.length)]

    const date = new Date()
    date.setDate(date.getDate() - Math.floor(Math.random() * 30))

    ventas.push({
      producto: `Producto ${i + 1}`,
      categoria: randomCategoria,
      monto: Math.floor(Math.random() * 50000) + 1000,
      cantidad: Math.floor(Math.random() * 10) + 1,
      fecha: date,
      vendedor: randomVendedor,
      region: randomRegion,
    })
  }
  await prisma.venta.createMany({
    data: ventas,
  })

  console.log('Base de datos poblada con 50 ventas')
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