# UML y documentacion como codigo

Los diagramas deben ayudar a entender. Un diagrama que no se menciona en el texto o que no aclara una decision sobra.

Hoy es muy recomendable mantener diagramas como codigo cuando sea posible:

- Mermaid para diagramas simples y rapidos.
- PlantUML para UML mas expresivo.
- Kroki para renderizar distintos lenguajes de diagramas.
- Structurizr/C4 para arquitectura cuando encaje.

## Ventajas

- Los diagramas se versionan con Git.
- Es mas facil revisarlos en pull requests.
- Se pueden regenerar si cambia el diseno.
- Evitan imagenes editadas a mano sin fuente.

## Diagramas utiles en un TFG

- Casos de uso o mapa de historias.
- Diagrama de clases o modelo de dominio.
- Diagramas de secuencia para flujos criticos.
- Diagrama de componentes.
- Diagrama de despliegue.
- Modelo entidad-relacion o esquema de datos.
- Diagramas de actividad para procesos complejos.

La regla es simple: cada diagrama debe tener fuente, titulo, explicacion y referencia en el texto.
