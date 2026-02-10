#!/bin/sh
for f in *.png
do
	pngcrush -rem allb -brute -reduce $f tmp.png
        mv tmp.png $f
done
