#!/bin/bash

echo -n "Instalar programa? [s/n]: "
read resultado

if [[ $resultado == [sS] ]]; then
    echo "Instalando programa..."
elif [[ $resultado == [nN] ]]; then
    echo "El programa no se va a instalar"
else
    echo "Opcion invalida"
fi
