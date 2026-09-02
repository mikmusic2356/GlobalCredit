# CardInsight Online — Documentación de Base de Datos (Turso / libSQL / SQLite)

Este documento detalla la integración completa de la base de datos de producción con **Turso (libSQL/SQLite)** para la plataforma CardInsight Online.

---

## 1. Arquitectura de Acceso a Datos

La plataforma sigue una arquitectura de capas desacopladas donde el cliente jamás se conecta directamente a Turso ni expone secretos:

```
┌─────────────────────────────────────────┐
│     UI / Frontend (React 19 + Vite)     │
└────────────────────┬────────────────────┘
                     │ HTTP Fetch / REST Endpoints
┌────────────────────▼────────────────────┐
│      API Server (Node.js + Express)     │
└────────────────────┬────────────────────┘
                     │
┌────────────────────▼────────────────────┐
│       Services / Business Logic         │
└────────────────────┬────────────────────┘
                     │
┌────────────────────▼────────────────────┐
│      Repositories Layer (src/db)        │
│   (Card, Article, Media, Settings)      │
└────────────────────┬────────────────────┘
                     │ libSQL Driver Segura
┌────────────────────▼────────────────────┐
│     Turso Database (Cloud libSQL)       │
└─────────────────────────────────────────┘
```

---

## 2. Variables de Entorno

Configuradas en el archivo privado `.env` (en el servidor):

```env
TURSO_DATABASE_URL=libsql://global-credit-mikmusic2356.aws-us-east-2.turso.io
TURSO_AUTH_TOKEN=eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9...
PORT=3000
NODE_ENV=development
```

> **IMPORTANTE DE SEGURIDAD**: `TURSO_AUTH_TOKEN` nunca se envía al navegador del cliente ni se expone en el bundle frontend de Vite.

---

## 3. Tablas y Esquema Relacional

El esquema está normalizado en `src/db/migrations/001_initial_schema.sql` con soporte para trazabilidad, claves foráneas e integridad:

1. **`countries`**: Jurisdicciones soberanas (`US`, `UK`, `CA`, `AU`, `NZ` y preparado para escalar a cualquier país).
2. **`issuers`**: Emisores y entidades bancarias licenciadas vinculadas a cada país.
3. **`sources`**: Trazabilidad y fuentes regulatorias (`CFPB`, `FCA`, `FCAC`, `ASIC`, `CCCFA`).
4. **`credit_cards`**: Catálogo financiero completo con APR, tarifas, recompensas, perfil de crédito, etc.
5. **`card_benefits`**: Beneficios y perks oficiales 1-a-N por tarjeta.
6. **`card_fees`**: Desglose de tarifas y penalidades con fechas de verificación.
7. **`card_requirements`**: Criterios de elegibilidad (edad, ingresos, residencia).
8. **`card_sources`**: Relación N-a-M entre tarjetas y sus fuentes oficiales.
9. **`categories`**: Jerarquías de categorías y subcategorías.
10. **`tags` / `card_tags` / `article_tags`**: Sistema transversal de etiquetado.
11. **`articles`**: Contenido educativo, guías de APR, noticias y tendencias.
12. **`article_images`**: Imágenes posicionables dentro de artículos.
13. **`article_recommendations`**: Recomendaciones automáticas y manuales prioritarias.
14. **`seo_metadata`**: Títulos, descripciones OpenGraph y robots por entidad.
15. **`media`**: Biblioteca multimedia editorial (metadata y URLs seguras).
16. **`ad_slots`**: Gestión y activación de espacios compatibles con Google AdSense.
17. **`cookie_categories` / `cookie_settings`**: Consentimiento y privacidad.
18. **`admin_users`**: Roles administrativos (`ADMIN`, `EDITOR`, `AUTHOR`).
19. **`audit_logs`**: Trazabilidad de acciones de edición y publicación.
20. **`site_settings`**: Configuraciones generales del sitio (nombre, defaults, políticas).

---

## 4. Comandos de Gestión y Migraciones

### Ejecutar Migraciones:
```bash
cmd /c "npx tsx src/db/migrations/runner.ts"
```

### Ejecutar Seed y Carga de Datos Iniciales:
```bash
cmd /c "npx tsx src/db/seed/seedData.ts"
```

### Comprobación de Health Check:
```bash
curl http://localhost:3000/api/health
```
**Respuesta:**
```json
{
  "status": "ok",
  "database": "connected",
  "platform": "CardInsight Online — International Credit Card Information Platform",
  "supportedCountries": ["US", "CA", "UK", "AU", "NZ"]
}
```

---

## 5. Endpoints de API RESTful Disponibles

- `GET /api/health` — Estado del sistema y conectividad con Turso.
- `GET /api/cards` — Obtener todas las tarjetas o por país (`?country=us`).
- `POST /api/cards` — Crear o actualizar tarjeta.
- `DELETE /api/cards/:id` — Eliminar tarjeta.
- `GET /api/articles` — Obtener artículos (`?published=true`).
- `POST /api/articles` — Crear o actualizar artículo/noticia.
- `DELETE /api/articles/:id` — Eliminar artículo.
- `GET /api/media` — Obtener ítems de la biblioteca de medios.
- `POST /api/media` — Guardar metadata de imagen.
- `DELETE /api/media/:id` — Eliminar imagen de la biblioteca.
- `GET /api/settings` — Obtener configuración del sitio.
- `POST /api/settings` — Actualizar configuración.
