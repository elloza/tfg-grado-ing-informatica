---
name: teachbook-export-latex-project
description: >
  Exporta el libro TeachBook/Jupyter Book como proyecto LaTeX completo para
  edición manual posterior. Usar cuando el usuario pida exportar el libro en
  LaTeX, generar o conservar los .tex, editar el libro en LaTeX, retocar el
  resultado final en Overleaf, entregar una carpeta LaTeX editable, o disponer
  del build LaTeX sin interferir con el flujo normal de PDF.
---

# Skill: Exportar Proyecto LaTeX Editable

## Regla principal

Usar siempre `scripts/export_latex_project.py`. No ejecutar `jupyter-book build --builder latex` directamente, porque se saltaría el preprocesado del proyecto: bibliografía usada, GIF a PNG, metadatos, logo de portada configurable, plantillas LaTeX, conversión SVG y rutas de assets.

La salida LaTeX es un artefacto para retoque editorial final. La fuente principal sigue siendo `book/`. Si se regenera, los cambios manuales hechos en `latex_exports/` pueden perderse.

## Comandos

Windows PowerShell:

```powershell
.\.venv\Scripts\python.exe scripts\export_latex_project.py --output latex_exports
```

macOS/Linux:

```bash
.venv/bin/python scripts/export_latex_project.py --output latex_exports
```

Exportar solo un idioma:

```powershell
.\.venv\Scripts\python.exe scripts\export_latex_project.py --lang es --output latex_exports
```

Validar una exportación existente sin reconstruir:

```powershell
.\.venv\Scripts\python.exe scripts\export_latex_project.py --quick-validate --output latex_exports
```

## Salida esperada

```text
latex_exports/
|-- es/
|   |-- projectnamenotset.tex
|   |-- bookmetadata.tex
|   |-- jupyterBook.cls
|   |-- assets/
|   |   |-- images/
|   |   `-- support/
|   `-- ...
`-- en/
    |-- projectnamenotset.tex
    |-- bookmetadata.tex
    |-- jupyterBook.cls
    |-- assets/
    |   |-- images/
    |   `-- support/
    `-- ...
```

El script imprimirá el archivo principal que debe compilarse manualmente, normalmente:

```bash
latexmk -xelatex main.tex
```

También genera ZIPs listos para subir a Overleaf:

```text
latex_exports/teachbook_es_overleaf.zip
latex_exports/teachbook_en_overleaf.zip
```

En Overleaf:

- Crear proyecto nuevo desde "Upload Project".
- Subir el ZIP del idioma deseado.
- Usar `main.tex` como documento principal.
- Usar `XeLaTeX` como compilador.
- Las figuras y assets gráficos quedan en `assets/images/`; el `.tex` exportado ya apunta a esas rutas.

## Validación

Después de exportar:

- Confirmar que existe `latex_exports/<lang>/`.
- Confirmar que hay `main.tex` y `projectnamenotset.tex`.
- Confirmar que están `bookmetadata.tex`, `jupyterBook.cls` y `assets/images/`.
- Confirmar que existe `latex_exports/teachbook_<lang>_overleaf.zip`.
- Ejecutar `python scripts/export_latex_project.py --quick-validate --output latex_exports`.
- Ejecutar `python scripts/check_encoding.py` si se ha tocado el script o la skill.

## Límites

- No publicar `latex_exports/`: esta carpeta está ignorada por Git.
- No considerar el LaTeX exportado como fuente principal del libro.
- Para el PDF oficial del proyecto, seguir usando `scripts/export_pdf.py --engine auto`.
