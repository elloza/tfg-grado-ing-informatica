# Team LaTeX

LaTeX es muy cómodo cuando el TFG tiene muchas referencias, ecuaciones, tablas, código, diagramas o necesidad de reproducibilidad. Overleaf reduce la fricción porque permite revisión compartida sin configurar todo localmente.

## Flujo recomendado

- Crear el proyecto en Overleaf si el tutor dispone de cuenta institucional o pro.
- Separar capítulos en archivos.
- Mantener bibliografía en BibTeX.
- Usar etiquetas y referencias cruzadas.
- Revisar warnings de compilación.
- Exportar PDF final desde una versión limpia.

## Plantillas de partida en Overleaf

Overleaf permite buscar plantillas públicas de TFG y memorias universitarias que pueden servir como punto de partida técnico {cite:p}`overleaf_templates_tfg_informatica`. Esto no convierte esas plantillas en plantillas oficiales de la USAL ni del Departamento de Informática y Automática. Si se reutiliza una plantilla externa, hay que adaptarla a la normativa vigente del TFG, revisar su licencia y citar explícitamente la plantilla original en la memoria o en los créditos del proyecto.

Algunas plantillas útiles para estudiar estructura, organización de ficheros LaTeX y configuración editorial son:

- [Plantilla LaTeX para TFG](https://www.overleaf.com/latex/templates/plantilla-latex-para-tfg/xqmjbwmgrjwr), orientada a TFG de Ingeniería Informática de la Universidad de Sevilla {cite:p}`overleaf_tfg_us_trinidad`.
- [ULL-ESIT-GII Memoria de Trabajo de Fin de Grado](https://es.overleaf.com/latex/templates/ull-esit-gii-memoria-de-trabajo-de-fin-de-grado/djcchzsbgvvh), plantilla en español para el Grado en Ingeniería Informática de la Universidad de La Laguna {cite:p}`overleaf_tfg_ull_torres`.
- [Universidad de Málaga - Memoria TFG](https://es.overleaf.com/latex/templates/universidad-de-malaga-memoria-tfg/fdmkzqfrmmyn), localizable también desde la etiqueta de plantillas de la Universidad de Málaga en Overleaf {cite:p}`overleaf_tfg_uma_benitez`.
- [Plantilla TFG GII UCA - desarrollo de software](https://es.overleaf.com/latex/templates/plantilla-tfg-gii-uca-desarrollo-de-software/zrbmfzbjxkys), pensada para proyectos de desarrollo de software del Grado en Ingeniería Informática de la Universidad de Cádiz {cite:p}`overleaf_tfg_uca_software`.
- [Plantilla TFG Graduado en Ingeniería Informática UDIMA](https://es.overleaf.com/latex/templates/plantilla-tfg-graduado-en-ingenieria-informatica-udima/jvnggyqnwqdq), útil para observar una estructura modular de contenidos, bibliografía y anexos {cite:p}`overleaf_tfg_udima_mataran`.

```{important}
Tomar una plantilla de otra universidad no significa copiar su normativa, su portada ni sus textos institucionales. Lo correcto es reutilizar solo la infraestructura técnica que interese, eliminar el contenido de ejemplo, adaptar portada y estructura a la USAL, y dejar constancia de la plantilla original utilizada.
```

## Overleaf desde VS Code

Si prefieres escribir en VS Code pero mantener el proyecto en Overleaf, existen dos caminos:

- Usar la integración Git oficial de Overleaf para clonar el proyecto como repositorio remoto, editar localmente y sincronizar cambios con `pull` y `push` {cite:p}`overleaf_git_integration`.
- Usar la extensión comunitaria [Overleaf Workshop](https://marketplace.visualstudio.com/items?itemName=iamhyc.overleaf-workshop), que permite abrir proyectos de Overleaf/ShareLaTeX en VS Code, compilar, previsualizar y trabajar con soporte de colaboración {cite:p}`vscode_overleaf_workshop`.

La opción basada en Git es más transparente y encaja mejor con un TFG centrado en código, pero puede depender del tipo de cuenta de Overleaf o de la configuración institucional. Overleaf Workshop puede ser cómoda para editar desde VS Code sin abandonar del todo Overleaf, pero hay que tratarla como una herramienta externa: revisa permisos, autenticación, estado del proyecto y posibles conflictos antes de usarla para trabajo serio.

```{warning}
No copies tokens, cookies o credenciales en equipos compartidos. Si usas una extensión para acceder a Overleaf desde VS Code, revisa cómo autentica, qué permisos necesita y cómo cerrar sesión.
```

## VS Code y LaTeX

Si se trabaja localmente, VS Code con extensiones de LaTeX puede ser muy potente. Es especialmente útil si el TFG ya vive en un repositorio Git y se quiere revisar memoria, código y diagramas en el mismo entorno.

## Bibliografía

El flujo natural en LaTeX es usar un archivo `.bib`. Mendeley y Zotero pueden exportarlo, pero conviene revisar claves, autores corporativos, mayúsculas protegidas y URLs antes de entregar.
