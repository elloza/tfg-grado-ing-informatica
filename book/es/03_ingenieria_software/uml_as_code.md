# UML y documentación como código

Los diagramas deben ayudar a entender. Un diagrama que no se menciona en el texto o que no aclara una decisión sobra.

Hoy es muy recomendable mantener diagramas como código cuando sea posible:

- Mermaid para diagramas simples y rápidos.
- PlantUML para UML más expresivo.
- Kroki para renderizar distintos lenguajes de diagramas.
- Structurizr/C4 para arquitectura cuando encaje.

## Ventajas

- Los diagramas se versionan con Git.
- Es más fácil revisarlos en pull requests.
- Se pueden regenerar si cambia el diseño.
- Evitan imágenes editadas a mano sin fuente.

## Diagramas útiles en un TFG

- Casos de uso o mapa de historias.
- Diagrama de clases o modelo de dominio.
- Diagramas de secuencia para flujos críticos.
- Diagrama de componentes.
- Diagrama de despliegue.
- Modelo entidad-relación o esquema de datos.
- Diagramas de actividad para procesos complejos.

La regla es simple: cada diagrama debe tener fuente, título, explicación y referencia en el texto.
