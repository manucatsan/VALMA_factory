# VALMA_factory

Gestión y control integral de fábrica.

## Versión en evolución
**V0.3 — Actualización de estructura y diseño**

### Menú principal
- Dashboard
- Clientes
- Departamentos
- Proyectos
- Órdenes de Trabajo (OT)
- Piezas
- Personal
- Configuración

### Dashboard
- Acceso directo a Departamentos, Proyectos, Piezas y Órdenes de Trabajo.
- Clientes, Personal y Configuración permanecen en el menú lateral, no como cuadrantes del Dashboard.
- Calendario general mensual del mes en curso, situado debajo de los cuadrantes y accesible mediante scroll.
- Los proyectos se representan como eventos de calendario; las OT independientes también aparecen.
- Las OT vinculadas a proyectos no se representan como eventos independientes.
- Al pasar a datos reales, los eventos mostrarán nombre y estado y abrirán su ficha al seleccionarlos.

### Modelo funcional acordado
- Los proyectos grandes son entidades PROYECTO.
- Las Órdenes de Trabajo son los trabajos operativos; pueden ser independientes o estar vinculadas a un proyecto.
- Las piezas se gestionan desde su propio módulo.
- Los proyectos y las piezas se crean desde sus módulos y posteriormente se asocian a un cliente.
- La ficha del cliente consulta sus proyectos, piezas y OT asociadas.
- Los trabajos internos de un proyecto se mantienen como elementos subordinados del proyecto cuando corresponda.

### Estado técnico
- Prototipo sin base de datos; los datos de ejemplo se mantienen en memoria del navegador.
- Los campos de fechas necesarios para pintar eventos del calendario aún deben incorporarse a los formularios y al modelo de datos.
- Los módulos Clientes, Personal y Configuración están previstos en navegación, pendientes de desarrollo.
- Integración ERP y módulo de IA/TensorFlow quedan para fases posteriores.

## Estructura
```
index.html
css/style.css
js/data.js
js/navigation.js
js/app.js
js/modules/
  dashboard.js
  proyectos.js
  trabajos.js
  piezas.js
  tareas.js
```
