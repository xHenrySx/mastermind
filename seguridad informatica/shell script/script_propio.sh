#!/bin/bash

if [ ! -d $1 ]; then
    echo "El directorio no existe"
    exit 1
fi

total=0
for f in `ls $1`; do
    name="$1/$f"
    if [ -f $name ]; then
       bytes=`ls -l $name | cut -d " " -f 5` 
       echo "El fichero $name ocupa $bytes" | tr -s /
       ((total += $bytes))
    fi
done

echo -e  "\nTotal: $total"
