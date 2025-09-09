# RutaControl — Landing / Portfolio (React + Vite + Tailwind)

**RutaControl** es un proyecto académico (trabajo final universitario) orientado a la gestión de flotas y logística: viajes, choferes, vehículos, servicios, reportes y estadísticas.  
Esta **landing** cumple dos propósitos:
1) **Presentación/venta del proyecto** (comunicar alcance y valor).  
2) **Integración de IA** como requisito de la cátedra mediante un **chat/contestador de dudas** embebido.

> Materia/Contexto: Proyecto Final (p.ej., *Práctica Profesionalizante II*).  
> Estado: MVP funcional con roadmap de mejoras.

---

## ¿Por qué existe esta landing?

- **Comunicación académica**: explicar en minutos el problema, la solución y el alcance del proyecto.
- **Demostración rápida**: enlaces a demo/login y sección de screenshots con capturas del sistema.
- **Requisito de IA**: incorporar un chat/FAQ con respuestas automáticas (y base para conectar un proveedor LLM más adelante).
- **Evaluación y feedback**: estructura clara (problema → módulos → casos de uso → beneficios → contacto) para recopilar comentarios de docentes y revisores.

---

## ¿Qué es RutaControl?

Plataforma web para centralizar:
- **Viajes**: odómetro, origen/destino, cálculo de km y duración.
- **Choferes**: datos, licencias, vencimientos.
- **Tractores y Semirremolques**: RTO, inspecciones, pruebas técnicas.
- **Servicios**: GLP, metanol, combustibles líquidos.
- **Usuarios y Roles**: permisos y trazabilidad.
- **Reportes y estadísticas**: exportables (PDF/Excel) y métricas operativas.

**Objetivo pedagógico**: practicar diseño full-stack, modelado de datos, flujos de UI y entrega (build/deploy).

---

## Integración de IA (requisito del proyecto)

La landing incluye un **Chat/FAQ** (botón flotante, abajo a la derecha) con dos niveles de integración:

1. **Local (incluido)** – *Contestador por keywords*  
   - Sin backend ni costos. Responde a preguntas frecuentes (módulos, reportes, login, precios demo).
   - Útil para cumplir el requisito mínimo de IA en la entrega.

2. **Escalable (opcional)** – *Proveedor LLM/Backend propio*  
   - Se puede conectar a un endpoint propio (`/api/chat`) o a un servicio LLM.  
   - Sugerido: exponer `VITE_AI_API_URL` y `VITE_AI_API_KEY` en `.env` y modificar el componente `ChatWidget` para usar `fetch`/`POST`.

> En esta entrega, el modo **Local** está activo por defecto. El modo **Escalable** queda documentado para futura extensión.

---

## Secciones de la landing

- **Hero** (slogan + CTA a demo/login)  
- **Problema** (dolor del cliente/empresa)  
- **Módulos** (Choferes, Viajes, Tractores, Semirremolques, Servicios, Usuarios/Roles)  
- **Casos de uso** (flujos principales)  
- **Beneficios**  
- **Screenshots** (reemplazar por capturas reales del sistema)  
- **Planes** (piloto/educativo y escalamiento)  
- **Contacto** (demo y correo)  
- **Chat/FAQ con IA** (requisito académico)

---

## Tecnologías

- **React + Vite + TypeScript**
- **TailwindCSS** (estilos rápidos y consistentes)
- **Sin dependencias pesadas** en el frontend de la landing

---
