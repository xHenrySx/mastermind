#!/bin/bash

echo -n "Escribe un número: "
read valor

if [ $valor -lt 5 -o $valor -gt 10 ]; then
    echo "Tu numero está fuera  del rango [5, 10]"
else
    echo "Tu numero está en el rango [5, 10]"
fi

# -a and
# -o or