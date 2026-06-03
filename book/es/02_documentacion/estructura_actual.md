# Estructura actual

La documentación actual recomendada para el TFG de Ingeniería Informática se organiza alrededor de una **memoria principal** y varios **anexos técnicos** {cite:p}`dia_documentacion_tfg_v2`. La guía adapta la Norma Técnica del Colegio de Ingeniería Informática al contexto académico del TFG {cite:p}`cpiicm_normativa_proyectos_2026,cpiicm_nt_v2`.

La numeración de capítulos debe empezar en la **Introducción**. Antes de ella van los elementos preliminares: portada, páginas de cabecera e índices.

```{admonition} Orden base
:class: note

Esta página no sustituye a una plantilla completa. Sirve como mapa esquemático para ver qué apartados y subapartados debe tener la memoria antes de desarrollar cada uno en páginas separadas.
```

## Preliminares sin numeración

### Portada

- Título del TFG.
- Autor o autora.
- Fecha de defensa: mes y año.
- Tutor o tutores.

El título debe ser claro, significativo y no excesivamente largo. Conviene evitar siglas o expresiones que no permitan entender el contenido del trabajo.

### Páginas de cabecera

- Consentimiento informado firmado por el tutor.
- Resumen y *abstract* en español e inglés, respectivamente y con keywords.
- Agradecimientos y dedicatoria, si procede.
- Glosario, si se usan siglas, abreviaturas o términos no estándar.

El resumen y el *abstract* deben ser **autocontenidos**. Deben explicar el problema, la metodología, las herramientas utilizadas, los resultados y las conclusiones, **sin remitir a capítulos posteriores**.

### Índices

- Índice de capítulos y subcapítulos de la memoria.
- Índice de anexos.
- Índice de tablas y figuras, cuando existan.

## Memoria numerada

### 1. Introducción

Presenta el dominio del problema, su contexto, la motivación del proyecto y una visión general de la documentación del TFG.

Debe incluir:

- Contexto general del problema.
- Motivación del trabajo, problema a resolver o necesidad a cubrir.
- Posibles soluciones o enfoques generales.
- Breve explicación de la estructura de la memoria.

### 2. Objeto

Define qué se pretende conseguir con el TFG, en líneas generales. Posteriormente se detallan los objetivos. Estos deben ser SMART: (Specific, Measurable, Achievable, Relevant, Time-bound), es decir, específicos, medibles, alcanzables, relevantes y acotados en el tiempo.

#### 2.1 Objetivo principal

Expresa el propósito central del trabajo en una frase clara.

#### 2.2 Subobjetivos

Descompone el objetivo principal en acciones concretas. Es recomendable usar verbos en infinitivo: *diseñar*, *implementar*, *evaluar*, *comparar*, *validar*.

#### 2.3 Objetivos personales

Incluye, cuando proceda, objetivos formativos o personales relacionados con el aprendizaje del autor.

### 3. Antecedentes

Presenta el marco teórico o contextual necesario para entender el problema.

Debe incluir:

- Conceptos previos del dominio no estrictamente informático.
- Estudios, investigaciones o trabajos previos relevantes.
- Contexto de empresa o institución, si el TFG se ha desarrollado en ese ámbito y existe permiso para describirlo.
- Justificación de la necesidad del proyecto.

### 4. Descripción de la situación actual

Describe el estado del arte, el estudio de mercado o las soluciones existentes, según el tipo de TFG.

Debe incluir:

- Aplicaciones, sistemas o enfoques similares.
- Evolución tecnológica relevante, si ayuda a entender el problema.
- Comparación breve de alternativas existentes.
- Justificación del camino elegido.
- Referencias bibliográficas que sostengan las afirmaciones.

### 5. Normas y referencias

Recoge los elementos técnicos y metodológicos que condicionan el desarrollo del TFG.

#### 5.1 Métodos

Explica la metodología técnica seguida: proceso unificado, metodologías ágiles, método experimental, diseño iterativo u otro enfoque aplicable.

#### 5.2 Herramientas

Describe las herramientas relevantes para:

- La implementación: IDEs, lenguajes, frameworks, bibliotecas, APIs, plataformas de despliegue, etc.
- La metodología: herramientas de gestión, planificación, seguimiento, control de versiones, etc.
- La documentación del TFG: herramientas de escritura, diagramación, edición de imágenes, etc.

```{warning}
No rellenes páginas describiendo qué es cada herramienta. Es mejor justificar por qué se ha empleado cada una, qué problema resuelve y cómo encaja con el resto del flujo de trabajo: desarrollo, control de versiones, pruebas, despliegue y documentación.
```

#### 5.3 Modelos

Incluye modelos técnicos usados en el trabajo cuando sean relevantes: modelos de IA, modelos industriales, modelos electrónicos, modelos matemáticos, modelos de simulación, etc.

#### 5.4 Prototipos

Incluye wireframes, mock-ups, diagramas de navegación u otros prototipos si la metodología los utiliza.

#### 5.5 Métricas

Describe las métricas usadas para evaluar el proyecto: rendimiento, usabilidad, calidad, precisión, satisfacción de usuarios u otras medidas aplicables.

### 6. Requisitos iniciales

Resume los requisitos que se desarrollan con detalle en el anexo A1.

Puede incluir:

- Casos de uso.
- Historias de usuario.
- Requisitos funcionales.
- Requisitos no funcionales.
- Restricciones iniciales derivadas del contexto.

### 7. Hipótesis, restricciones y alcance

Delimita el proyecto y evita que la memoria prometa más de lo que realmente se ha desarrollado.

#### 7.1 Hipótesis

Explica las suposiciones de partida que condicionan el trabajo.

#### 7.2 Restricciones

Detalla restricciones técnicas, temporales, legales, económicas, metodológicas o de recursos.

#### 7.3 Alcance

Aclara qué entra y qué no entra en el TFG.

#### 7.4 Impacto esperado

Describe las ventajas o mejoras esperadas para usuarios, sociedad, empresa, institución o comunidad científica.

### 8. Estudio de alternativas y viabilidad

Justifica las decisiones principales del proyecto.

#### 8.1 Alternativas técnicas

Compara lenguajes, APIs, bibliotecas, herramientas, arquitecturas o enfoques posibles.

#### 8.2 Viabilidad

Explica por qué la solución elegida es razonable dadas las restricciones del proyecto.

#### 8.3 Coste y monetización

Incluye, cuando tenga sentido, una valoración cualitativa del coste total del desarrollo y posibles formas de explotación o beneficio.

### 9. Descripción de la solución propuesta

Explica técnicamente el producto, sistema, prototipo, estudio o resultado final del TFG.

#### 9.1 Funcionalidades principales

Describe qué hace la solución y qué aporta frente a la situación inicial.

#### 9.2 Evidencias de la solución

Puede incluir capturas, diagramas de flujo, enlaces a la aplicación desplegada, instalables, repositorios o vídeos demostrativos.

### 10. Análisis de riesgos

Identifica riesgos relevantes y propone medidas de respuesta.

#### 10.1 Riesgos de aceptación

Aplicable a desarrollos orientados a usuarios. Puede incluir adopción, satisfacción, facilidad de uso o rechazo del sistema.

#### 10.2 Riesgos tecnológicos

Aplicable a proyectos de investigación, integración tecnológica o desarrollo con dependencias técnicas relevantes.

#### 10.3 Herramientas de análisis

La guía propone usar herramientas como:

- Matriz de riesgos.
- Análisis DAFO.
- Registro de riesgos con prioridad, complejidad y medidas correctoras.

### 11. Organización y gestión del proyecto

Explica cómo se ha organizado y ejecutado el trabajo.

#### 11.1 Organización

Debe conectar la metodología elegida con el desarrollo real del proyecto.

Puede incluir:

- Arquitectura del sistema.
- Diseño detallado de componentes.
- Base de datos, algoritmos, protocolos o entidades relevantes.
- Desarrollo de la solución desde la propuesta inicial hasta el resultado final.
- Problemas encontrados y decisiones tomadas.
- Pruebas realizadas.

#### 11.2 Gestión del proyecto

Debe explicar los recursos y la planificación.

Puede incluir:

- Recursos materiales y personales.
- Configuración o diseño de recursos relevantes.
- Planificación temporal.
- Diagrama de Gantt.
- Hitos y fases del proyecto.

### 12. Conclusiones y trabajo futuro

Cierra la memoria con una valoración clara del trabajo realizado.

#### 12.1 Cumplimiento de objetivos

Indica si se han alcanzado los objetivos planteados y en qué medida.

#### 12.2 Aprendizaje y problemas encontrados

Reflexiona sobre dificultades, errores, decisiones y conocimientos adquiridos.

#### 12.3 Limitaciones

Explica qué límites tiene la solución o el estudio realizado.

#### 12.4 Trabajo futuro

Propone mejoras, ampliaciones o nuevas líneas de desarrollo.

### 13. Bibliografía

Recoge las fuentes citadas en el texto. La guía recomienda un formato estándar, como APA, y exige coherencia entre citas y bibliografía.

Debe comprobarse que:

- Toda fuente de la bibliografía aparece citada en el texto.
- Toda cita del texto tiene una entrada en la bibliografía.
- Las fuentes son relevantes para el tema trabajado.
- No se abusa de páginas web cuando existen libros, artículos, documentación técnica o fuentes académicas mejores.

```{admonition} Criterio práctico
:class: tip

La memoria debe explicar y justificar. El detalle técnico extenso debe ir a los anexos, especialmente requisitos completos, diseño detallado, estimaciones, seguridad, manuales, listados o evidencias largas.
```

## Anexos

Los anexos desarrollan, justifican o aclaran partes específicas de la memoria. Cada anexo debe comenzar con un índice propio si contiene varios documentos o secciones.

### A1. Especificaciones del sistema

Debe incluir la especificación detallada de requisitos.

Puede contener:

- Requisitos funcionales.
- Requisitos no funcionales.
- Casos de uso o historias de usuario.
- Diagramas necesarios para entender los requisitos.

Este anexo sirve de base para el análisis y diseño del sistema.

### A2. Análisis y diseño del sistema

Debe incluir los documentos de análisis y diseño.

Puede contener:

- Modelo del sistema a construir.
- Arquitectura del sistema.
- Diseño funcional.
- Diseño de interfaces.
- Modelo de datos.
- Diseño de alto nivel y diseño detallado.
- Diagramas UML u otros diagramas necesarios.

### A3. Estimación de tamaño y esfuerzo

Debe justificar las métricas usadas para estimar tamaño, esfuerzo, coste o tiempo.

Puede contener:

- Métricas aplicadas.
- Criterios estándar utilizados.
- Métricas propias, si están documentadas y referenciadas.
- Estimación del coste temporal.
- Base para el presupuesto detallado, si procede.

### A4. Plan de seguridad

Debe describir los aspectos de seguridad relevantes del proyecto.

Puede contener:

- Seguridad técnica.
- Seguridad organizativa.
- Seguridad legal.
- Identificación de puntos críticos.
- Medidas de protección o mitigación.
- Normativa aplicable, si existe.

### A5. Otros anexos

Recoge documentación adicional que ayude a comprender o justificar el proyecto.

Puede contener:

- Manuales de usuario.
- Manuales del programador.
- Listados extensos.
- Catálogos.
- Información técnica complementaria.
- Evidencias de pruebas.
- Material de instalación o despliegue.

No todos los TFG necesitan el mismo peso en cada anexo. Lo importante es que la estructura final sea coherente con la naturaleza del proyecto y que cualquier ausencia o adaptación esté justificada.
