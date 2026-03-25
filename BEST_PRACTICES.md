# 📋 Mejores Prácticas - Playwright POM

## 🏗️ Estructura del Proyecto

```
├── pages/                    # Page Object Models
│   ├── LoginPage.ts
│   ├── ProductsPage.ts
│   └── index.ts             # Barrel exports
├── fixtures/                 # Datos de prueba
│   └── testData.ts
├── tests/                    # Test specs
│   └── login.spec.ts
└── playwright.config.ts
```

## ✅ Mejores Prácticas Implementadas

### 1. **Page Object Model (POM)**
- ✅ **Separación de responsabilidades**: Lógica de UI separada de los tests
- ✅ **Reutilización**: Los Page Objects se pueden usar en múltiples tests
- ✅ **Mantenimiento**: Cambios en UI solo requieren actualizar el Page Object

### 2. **Localizadores**
- ✅ **Usar `data-test` attributes**: Más estables que CSS o XPath
- ✅ **Localizadores readonly**: Definidos en el constructor
- ✅ **Tipado fuerte**: TypeScript para mejor autocompletado e IntelliSense

### 3. **Organización de Tests**
- ✅ **Patrón AAA**: Arrange, Act, Assert (comentado en cada test)
- ✅ **BeforeEach**: Inicialización común para evitar duplicación
- ✅ **Nombres descriptivos**: Tests con nombres claros y en inglés
- ✅ **Test.describe**: Agrupa tests relacionados

### 4. **Datos de Prueba**
- ✅ **Centralizados**: En fixtures/testData.ts
- ✅ **Tipado**: TypeScript para evitar errores
- ✅ **Fácil mantenimiento**: Un solo lugar para actualizar datos

### 5. **Métodos en Page Objects**
- ✅ **Métodos de acción**: `login()`, `goto()`
- ✅ **Métodos de verificación**: `expectErrorVisible()`
- ✅ **Documentación JSDoc**: Cada método documentado
- ✅ **Async/Await**: Para mejor legibilidad

## 🎯 Recomendaciones Adicionales

### **1. Agregar Custom Fixtures**
```typescript
// fixtures/basePage.ts
import { test as base } from '@playwright/test';
import { LoginPage } from '../pages';

export const test = base.extend({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
});
```

### **2. Variables de Entorno**
Crear archivo `.env` para URLs y credenciales:
```env
BASE_URL=https://www.saucedemo.com
VALID_USERNAME=standard_user
VALID_PASSWORD=secret_sauce
```

Actualizar `playwright.config.ts`:
```typescript
use: {
  baseURL: process.env.BASE_URL,
}
```

### **3. Reporters Personalizados**
```typescript
// playwright.config.ts
reporter: [
  ['html'],
  ['json', { outputFile: 'test-results/results.json' }],
  ['junit', { outputFile: 'test-results/junit.xml' }],
],
```

### **4. Retry Lógico**
```typescript
// En Page Objects, agregar retry automático
async clickWithRetry(locator: Locator, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      await locator.click({ timeout: 5000 });
      return;
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      await this.page.waitForTimeout(1000);
    }
  }
}
```

### **5. Screenshots en Fallos**
```typescript
// playwright.config.ts
use: {
  screenshot: 'only-on-failure',
  video: 'retain-on-failure',
  trace: 'on-first-retry',
}
```

### **6. Helpers/Utilities**
Crear carpeta `utils/` para funciones comunes:
```typescript
// utils/helpers.ts
export const generateRandomEmail = () => {
  return `test_${Date.now()}@example.com`;
};

export const waitForNetworkIdle = async (page: Page) => {
  await page.waitForLoadState('networkidle');
};
```

### **7. Tags para Tests**
```typescript
test('should login @smoke @priority-high', async () => {
  // test code
});
```

Ejecutar solo tests con tags:
```bash
npx playwright test --grep @smoke
```

### **8. API Testing**
Crear Page Objects para APIs:
```typescript
// pages/api/LoginAPI.ts
export class LoginAPI {
  constructor(private request: APIRequestContext) {}
  
  async login(username: string, password: string) {
    return await this.request.post('/api/login', {
      data: { username, password }
    });
  }
}
```

### **9. Visual Testing**
```typescript
await expect(page).toHaveScreenshot('login-page.png', {
  maxDiffPixels: 100,
});
```

### **10. Playwright Test Generator**
Usar el generador para crear tests rápidamente:
```bash
npx playwright codegen https://www.saucedemo.com
```

## 🔍 Naming Conventions

### Tests
- `should [expected behavior] when [condition]`
- Ejemplo: `should show error message when credentials are invalid`

### Page Objects
- Clases: `PascalCase` + `Page` suffix
- Métodos de acción: verbos (`login`, `fillForm`, `clickButton`)
- Métodos de verificación: `expect` prefix (`expectErrorVisible`)

### Variables
- `camelCase` para variables y funciones
- `UPPER_SNAKE_CASE` para constantes

## 📊 Métricas y Mantenibilidad

### KPIs a Seguir:
- ⏱️ **Tiempo de ejecución**: Mantener tests rápidos (< 30seg por test)
- 🔄 **Flakiness**: Tests deben ser estables (< 1% fallo intermitente)
- 📈 **Cobertura**: Cubrir casos principales y edge cases
- 🔧 **Mantenimiento**: Tiempo para actualizar tests cuando cambia UI

### Code Review Checklist:
- [ ] ¿Los localizadores son estables?
- [ ] ¿Los tests son independientes?
- [ ] ¿Hay código duplicado que se pueda refactorizar?
- [ ] ¿Los nombres son descriptivos?
- [ ] ¿Hay assertions claras?
- [ ] ¿La documentación está actualizada?

## 🚀 Comandos Útiles

```bash
# Ejecutar todos los tests
npx playwright test

# Ejecutar un archivo específico
npx playwright test login.spec.ts

# Modo debug
npx playwright test --debug

# Modo UI
npx playwright test --ui

# Ver reporte
npx playwright show-report

# Ejecutar en un navegador específico
npx playwright test --project=chromium
```

## 📚 Recursos Adicionales

- [Playwright Documentation](https://playwright.dev)
- [Best Practices Guide](https://playwright.dev/docs/best-practices)
- [Page Object Model Pattern](https://playwright.dev/docs/pom)
