#!/bin/bash
# Convert all PNG tech logos to WebP
cd src/assets/tech-logos

for f in *.png; do
  name="${f%.png}"
  echo "Converting $f -> ${name}.webp"
  npx -y sharp-cli --input "$f" -o "${name}.webp" -f webp
done

echo "Done! All PNGs converted to WebP."
