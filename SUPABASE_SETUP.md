# Configuración de Supabase para Growcast

## 🚀 Configuración Inicial

### 1. Obtener Access Token

1. Ve a [Supabase Dashboard](https://supabase.com/dashboard/account/tokens)
2. Crea un nuevo token con permisos de `project_admin`
3. Copia el token generado

### 2. Configurar variables de entorno

```bash
# Copiar el archivo de ejemplo
cp env.example .env.local

# Editar .env.local y agregar tu token
# SUPABASE_ACCESS_TOKEN=tu_token_aqui
```

### 3. Configurar Supabase automáticamente

```bash
npm run supabase:setup
```

### 4. Aplicar migraciones

```bash
npm run supabase:push
```

## 📊 Estructura de la Base de Datos

### Tabla: `Growcast`

- `id` (int, primary key, auto-increment)
- `name` (text, required) - Nombre del contacto
- `email` (text, required) - Email del contacto
- `"Tipo de Cultivo"` (text) - Tipo de ambiente (invernadero, túnel, etc.)
- `Cultivo` (text) - Tipo de cultivo (frutilla, tomate, etc.)
- `created_at` (timestamp) - Fecha de creación

## 🔐 Políticas de Seguridad

### Inserción Pública

- ✅ Usuarios anónimos pueden enviar formularios de contacto
- ✅ No requiere autenticación para enviar datos

### Lectura Restringida

- 🔒 Solo usuarios autenticados pueden ver los datos
- 🔒 Protege la información de los contactos

## 🛠️ Comandos Útiles

### Aplicar migraciones

```bash
npm run supabase:push
```

### Ver estado del proyecto

```bash
npm run supabase:status
```

### Resetear base de datos (¡CUIDADO!)

```bash
npm run supabase:reset
```

## 🌐 Variables de Entorno

Las siguientes variables están configuradas en el cliente:

- **URL**: `https://biynsnwdafhpxcqkueog.supabase.co`
- **Anon Key**: Configurada en `src/integrations/supabase/client.ts`

## 📝 Uso en el Código

### Enviar formulario de contacto

```typescript
import { supabaseService } from '@/lib/supabase-service'

const contactData = {
  name: 'Juan Pérez',
  email: 'juan@ejemplo.com',
  'Tipo de Cultivo': 'invernadero',
  Cultivo: 'tomate'
}

await supabaseService.submitContactForm(contactData)
```

### Obtener contactos (solo usuarios autenticados)

```typescript
const submissions = await supabaseService.getContactSubmissions()
```

## 🔧 Troubleshooting

### Error: "new row violates row-level security policy"

- Ejecuta: `npm run supabase:push` para aplicar las políticas

### Error: "relation does not exist"

- Ejecuta: `npm run supabase:reset` para recrear la base de datos

### Error de conexión

- Verifica que el proyecto esté linkeado: `supabase status`
- Verifica las credenciales en el cliente
