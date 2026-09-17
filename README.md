# VALMA_factory

Gestión total de fábrica.

## Versión actual
**v0.2 — Prototipo funcional**

Esta versión implementa la primera base navegable de VALMA Factory:

- Dashboard con estructura de departamentos y contadores.
- Departamentos: Fábrica, Matriceria y Calidad.
- Proyectos y Trabajos.
- Piezas.
- Tareas.
- Alta y edición de registros mediante **NUEVO REGISTRO** / **Editar**.
- Navegación contextual mediante **← ATRÁS**.
- Prioridades: ALTA, MEDIA, BAJA y EN ESPERA.
- Un Trabajo requiere obligatoriamente un Proyecto.
- Las relaciones de Tareas son opcionales.
- Sin base de datos: los datos de esta versión se mantienen en memoria del navegador.

## Estructura

```text
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

## Próximos pasos
La base está preparada para evolucionar hacia persistencia de datos, usuarios/permisos, producción, almacén, mantenimiento, calidad e integración futura con el ERP.
