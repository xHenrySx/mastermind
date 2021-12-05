# Objetivo: 
Definir una API para gestionar mi propio equipo pokemon y asi ganar la liga Sino

# Acciones:
- Identificarnos
- Anadir pokemon a nuestro equipo
- Eliminar pokemon de nuestro equipo
- Consultar informacion de nuestro equipo
- Intercambiar el orden de nuestros pokemones

# REST Design:
- Anadir pokemon: POST /team/pokemons
- Consultar Equipo: GET /team
- Eliminar pokemon: DELETE /team/pokemons/:id 
- Intercambiar el orden: PUT /team
- Sistema de credenciales
