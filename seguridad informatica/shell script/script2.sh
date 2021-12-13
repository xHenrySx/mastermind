#!/bin/bash


echo -n "Escribe un número: "
read valor

if [[ $valor -ne 5 ]]; then
    echo "Tu numero no es igual a 5"
else
    echo "Tu numero es igual a 5"
fi

# -gt greater than
# -ge greater or equal
# -lt lower than
# -le lower or equal
# -eq equal
# -ne not equal
