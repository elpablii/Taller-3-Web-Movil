# DataMobile Dashboard - Taller 3

Buenas, este es un proyecto desarrollado por el Grupo 8 para el Taller 3 del curso Des. Web/Movil. Es un dashboard de visualización de ventas construido con Next.js, Redux y Prisma. La idea es poder ver las ventas de manera visual con diferentes gráficos y también poder gestionarlas directamente desde la aplicación.

Grupo 8:

Pablo Villarroel - 21.239.259-6
Sebastián Pleticosic - 19.307.465-0
Diego Véliz - 20.797.904-K
Vicente Araya - 20.797.409-9

## Eesta aplicación permite

- Ver un dashboard con diferentes gráficos que muestran las ventas por categoría, región, evolución temporal, etc.
- Filtrar las ventas por región o categoría
- Gestionar las ventas: crear nuevas, editar las existentes o eliminarlas
- Todo esto conectado a una base de datos PostgreSQL

## Requisitos previos

Antes de empezar, necesitas tener instalado:

- Node.js (versión 18 o superior)
- PostgreSQL (versión 12 o superior)
- npm o yarn

Si no tienes PostgreSQL instalado, puedes descargarlo desde su página oficial. También necesitarás crear una base de datos para el proyecto.

## Instalación paso a paso

### 1. Clonar o descargar el proyecto

Si tienes el proyecto en un repositorio, clónalo. Si lo descargaste como ZIP, descomprímelo y abre una terminal en esa carpeta.

### 2. Instalar las dependencias

Abre una terminal en la carpeta del proyecto y ejecuta:

```bash
npm install
```

Esto instalará todas las librerías que necesita el proyecto. Puede tardar un par de minutos la primera vez.

### 3. Configurar la base de datos

Primero, asegúrate de que PostgreSQL esté corriendo en tu computadora. Luego, crea una base de datos nueva. Puedes hacerlo desde la terminal con psql o desde pgAdmin si prefieres una interfaz gráfica.

Desde la terminal (con psql):

```bash
psql -U postgres
```

Y luego dentro de psql:

```sql
CREATE DATABASE taller3_db;
```

Para salir de psql se hace escribiendo `\q` (o ctrl + c en la terminal) y presionando Enter.

### 4. Configurar las variables de entorno

En la raíz del proyecto, crea un archivo llamado `.env`. Dentro de ese archivo, escribe:

```
DATABASE_URL="postgresql://usuario:password@localhost:5432/taller3_db?schema=public"
```

Reemplaza:
- `usuario` por tu usuario de PostgreSQL (normalmente es `postgres`)
- `password` por tu contraseña de PostgreSQL
- `taller3_db` por el nombre de la base de datos que creaste (si usaste otro nombre)

Por ejemplo, si tu usuario es `postgres`, tu contraseña es `mipassword123` y la base de datos se llama `taller3_db`, quedaría así:

```
DATABASE_URL="postgresql://postgres:mipassword123@localhost:5432/taller3_db?schema=public"
```

### 5. Ejecutar las migraciones de Prisma

Prisma necesita crear las tablas en la base de datos. Ejecuta:

```bash
npx prisma migrate dev
```

Te pedirá un nombre para la migración, puedes poner cualquier cosa como "init" o simplemente presionar Enter para usar el nombre por defecto.

IMPORTANTE: Si no ejecutan npx prisma generate, el cliente de Prisma no se genera y al intentar usarlo se produce un error que resulta en un error HTTP 500.

### 6. Poblar la base de datos con datos de ejemplo

Para que puedas ver algo en el dashboard, necesitas datos. El proyecto incluye un script que crea 50 ventas de ejemplo:

```bash
npx prisma db seed
```

Esto creará ventas aleatorias con diferentes categorías, regiones, montos y fechas.

## Ejecutar la aplicación

Una vez que hayas completado todos los pasos anteriores, puedes ejecutar la aplicación en modo desarrollo:

```bash
npm run dev
```

Abre tu navegador y ve a `http://localhost:3000`. Deberías ver el dashboard con los gráficos y los datos de ejemplo.

Si el puerto 3000 está ocupado, Next.js te avisará y usará otro puerto (normalmente 3001 o superior dependiendo de cuantos puertos estén en uso).

## Cómo usar la aplicación

### Dashboard

En la pestaña "Dashboard" puedes ver:

- **Gráfico de Barras**: Muestra las ventas agrupadas por categoría (Electrónica, Ropa, Hogar, Deportes)
- **Gráfico de Líneas**: Muestra la evolución de las ventas a lo largo del tiempo
- **Gráfico de Torta**: Muestra la distribución de ventas por región
- **Gráfico de Área**: Muestra el crecimiento acumulado de las ventas
- **Gráfico Radar**: Muestra métricas generales como ticket promedio, transacciones, etc.

Puedes filtrar los datos usando los selectores de "Región" y "Categoría" que están arriba de los gráficos. Los gráficos se actualizan automáticamente cuando cambias los filtros.

### Gestión de Ventas

En la pestaña "Gestión de Ventas" puedes:

- Ver todas las ventas en una tabla
- Crear una nueva venta haciendo clic en el botón "+ Nueva Venta"
- Editar una venta existente haciendo clic en el botón "Editar" de la fila correspondiente
- Eliminar una venta haciendo clic en el botón "Eliminar" (te pedirá confirmación)

Al crear o editar una venta, debes completar los campos marcados con asterisco (*):
- Producto: nombre del producto
- Categoría: selecciona una de las opciones disponibles
- Monto: el precio (solo números enteros, sin decimales)
- Cantidad: cuántas unidades se vendieron (solo números enteros)

Los campos de Vendedor y Región son opcionales.

## Estructura del proyecto

Si quieres entender cómo está organizado el código:

- `app/`: Contiene las páginas y las rutas de la API
  - `page.tsx`: La página principal
  - `api/ventas/`: Las rutas de la API para gestionar ventas
- `components/`: Los componentes de React reutilizables
  - `DashboardCharts.tsx`: Los gráficos del dashboard
  - `FilterBar.tsx`: La barra de filtros
  - `VentasTable.tsx`: La tabla de gestión de ventas
- `store/`: La configuración de Redux
  - `slices/`: Los "slices" de Redux que manejan el estado
- `prisma/`: La configuración de Prisma
  - `schema.prisma`: El esquema de la base de datos
  - `seed.ts`: El script que crea datos de ejemplo

## Comandos útiles

```bash
# Ejecutar en modo desarrollo
npm run dev

# Compilar para producción
npm run build

# Ejecutar la versión compilada
npm start

# Ver la base de datos con Prisma Studio (interfaz gráfica)
npx prisma studio

# Regenerar el cliente de Prisma después de cambiar el schema
npx prisma generate
```

## Problemas comunes

### Error: "Missing required environment variable: DATABASE_URL"

Asegúrate de haber creado el archivo `.env` en la raíz del proyecto con la variable `DATABASE_URL` correctamente configurada.

### Error al conectar con PostgreSQL

Verifica que:
- PostgreSQL esté corriendo
- La base de datos exista
- El usuario y contraseña en `DATABASE_URL` sean correctos
- El puerto sea el correcto (por defecto es 5432)

### Los gráficos no se muestran o están vacíos

Ejecuta el seed de la base de datos con `npx prisma db seed` para crear datos de ejemplo.

### El puerto 3000 está ocupado

Next.js automáticamente usará otro puerto. Revisa el mensaje en la terminal para ver qué puerto está usando.

## Tecnologías utilizadas

- **Next.js 16**: Framework de React para el frontend y backend
- **React 19**: Librería para construir la interfaz
- **Redux Toolkit**: Para manejar el estado global de la aplicación
- **Prisma 7**: ORM para trabajar con la base de datos
- **PostgreSQL**: Base de datos relacional
- **Recharts**: Librería para crear los gráficos
- **Tailwind CSS**: Para los estilos
- **TypeScript**: Para tener tipado estático

