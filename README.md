# Documentacion de un TFG en Ingenieria Informatica en tiempos de IA

Libro electronico no oficial, opinionated y practico para preparar la documentacion de un Trabajo de Fin de Grado en el Grado en Ingenieria Informatica de la Universidad de Salamanca.

Autor: **Alvaro Lozano Murciego**
Ano: **2026**
Licencia del texto original: **CC BY 4.0**

## Objetivo

El libro ayuda a interpretar la normativa vigente del TFG, reutilizar buenas practicas de la antigua documentacion de ITIS/PFC y trabajar con herramientas modernas: gestores bibliograficos, Word/OneDrive, LaTeX/Overleaf, VS Code, diagramas como codigo y asistentes de IA.

No sustituye a la normativa oficial ni al criterio del tutor, la comision o el tribunal.

## Estructura

- Normativa TFG.
- Documentacion del TFG.
- Ingenieria del software aplicada.
- Herramientas de documentacion.
- Errores comunes y FAQ.
- Presentacion y defensa.
- Creditos, licencias, cita y bibliografia.

Los ejemplos originales de la plantilla TeachBook se conservan en `book/_examples_archive/` como referencia, pero no forman parte del indice visible.

## Comandos utiles

Configurar entorno:

```powershell
python scripts/setup_env.py --yes
```

Compilar HTML:

```powershell
python scripts/build_book.py
```

Vista previa:

```powershell
python scripts/launch_preview.py --background
```

Exportar PDF:

```powershell
python scripts/setup_env.py --yes --extras pdf
python scripts/setup_latex.py --yes --full
python scripts/export_pdf.py --engine auto
```

Verificar integridad:

```powershell
python scripts/check_encoding.py
python scripts/check_multilang_integrity.py
```

## Comentarios

La versión web integra comentarios por página con Giscus y GitHub Discussions.

Configuración actual:

- Repositorio: `elloza/tfg-grado-ing-informatica`.
- Categoría: `Announcements`.
- Mapeo: `pathname`, con coincidencia estricta.
- Carga local: desactivada por defecto para no crear hilos desde `localhost`.
- Páginas activas: allowlist en `book/_static/custom.js`, pensada para páginas centrales. Las portadas, introducciones de bloque, búsqueda, índice y páginas finales no muestran comentarios.

Para activar comentarios en una página concreta, añade su ruta HTML a `allowedPaths`, por ejemplo `es/02_documentacion/memoria.html`. Para activar comentarios en todo el libro, usa `showOnAllPages: true`; para excluir páginas concretas, usa `disabledPaths`.

Para que funcione en producción, el repositorio debe ser público, tener Discussions activo y tener instalada la app de Giscus: <https://github.com/apps/giscus>.
