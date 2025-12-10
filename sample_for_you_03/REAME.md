# Description

- Basado en el ejemplo 04 Crear un servicio de compose para substituir redis por mongodb. Habra que modificar 
  el microservicio de node para no utilizar redis y si mongo (chatgpt)
- Probar los tres servicios en local y ver que funcionan
- Borrar recursos de docker locales para no dejar basura.
- Crear un cluster de swarm o utilizar uno ya existente.
- Desplegar el stack al manager.
- Probar que se puede acceder al mismo desde el navegador y que el contador se cambia en mongo
- Escalar el stack, monitorizar los servicios, tasks.
- Finalmente borrar el stack