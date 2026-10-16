#!/bin/sh
# Télécharge les images de la maquette Figma dans ./assets
# À lancer depuis ce dossier :  sh download-assets.sh
# (les liens Figma sont temporaires : ~7 jours. S'ils expirent, demander à Claude de les régénérer.)
set -e
mkdir -p assets && cd assets
B="https://www.figma.com/api/mcp/asset"
dl() { echo "→ $1"; curl -fsSL -o "$1" "$B/$2"; }
dl illus-4-20.png   55b1d2b8-3776-4be2-963e-728e68119f22.png
dl bg-ropchrono.png 2d30b30d-125d-4c9d-a270-1393c797367f.png
dl voler-12.png     ad8c4d73-f8f4-40c7-8cdd-f99ba5fe97ef.png
dl illus-6-2.png    e6c86f0b-a75d-48f5-995c-7d9ba352b991.png
dl illus-5-1.png    39a30a8b-51f9-4c10-abc1-39034778f8f5.png
dl logo.png         dbf8d406-5e7e-4525-a725-4844eaaa69ed.png
dl illus-153-3.png  b2214b7e-5856-443c-9aec-69a756bbbd39.png
dl illus-154-3.png  87e8b314-207c-4044-8414-5b8f88a49e22.png
dl tres-bien.png    9f4d046c-25ad-4bfd-b932-627cd0736d11.png
dl illus-100-1.png  7bfa1b6c-d2a9-4747-8fe6-16d2b930a184.png
dl illus-7-1.png    e267256a-750b-4e83-a32e-9d8649a71dba.png
dl pixelbook.png    d115dd20-ca69-4452-a794-90593e82b147.png
dl illus-8-3.png    15df7a5b-a291-47c0-af2b-06dd7036dd63.png
dl illus-338-13.png 1ddbddaa-9033-4b10-ac71-52e2897eb5f8.png
dl illus-9-1.png    29e2819b-17cd-4e70-b692-26ce77ab2a95.png
dl illus-6-6.png    e2900e69-4b69-4fe5-906a-900ee6dbae8b.png
dl illus-6-7.png    6fd8bd3d-7ea2-4e51-86b1-71bd6f64c537.png
dl dell-xps.png     bdf8c191-5bb5-4bbb-a5f9-28c432ac5797.png
dl zenbook.png      a3023f58-9af1-4697-8464-d9c36e92f4f3.png
dl illus-154-2.png  6c536269-c4ce-49ee-9d50-05b9f3b7066d.png
dl illus-50-2.png   2aa0c50a-ca88-43bc-8b64-6c73820e3305.png
dl vector-1.svg     6265bb75-6bb4-4faf-adf7-28f107c8d58a.svg
dl vector-2.svg     7dd796f6-41c7-4119-94fc-3b6ef5e28c70.svg
dl vector-3.svg     cc600f9a-fa50-4c47-b62a-d240c522c9f3.svg
dl vector-4.svg     b549fe5d-e1d4-4e1d-8b90-f2b6eb96ece7.svg
dl vector-9.svg     1d6919c9-d54c-4709-b73e-53844dd180d4.svg
dl vector-10.svg    79d98e9a-4e67-4244-aad8-fd602131403e.svg
dl vector-11.svg    0560d1ba-a80c-4824-920a-1d4670835ef9.svg
dl vector-12.svg    e0aea5c4-dba4-4f99-a9e2-846d47ef7c86.svg
dl ellipse-1.svg    57cac344-9b1a-41e9-842f-8c9ec617f79f.svg
echo "Terminé : $(ls | wc -l) fichiers dans assets/"
