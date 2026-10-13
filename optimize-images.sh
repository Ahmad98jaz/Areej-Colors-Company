#!/bin/bash
# سكربت لضغط وتحويل صور معرض الأعمال إلى WebP
# المتطلبات: تثبيت cwebp (يأتي مع مكتبة webp)
# على Ubuntu/Debian: sudo apt install webp
# على macOS: brew install webp

FOLDERS=("bath" "living" "majlis" "kitchen" "bedroom" "Interfaces" "landscape")

for folder in "${FOLDERS[@]}"; do
    if [ -d "$folder" ]; then
        echo "معالجة مجلد: $folder"
        for img in "$folder"/*.jpg "$folder"/*.jpeg "$folder"/*.png; do
            [ -f "$img" ] || continue
            output="${img%.*}.webp"
            cwebp -q 75 "$img" -o "$output"
            echo "  تم تحويل: $img -> $output"
        done
    fi
done

echo "انتهى التحويل. الخطوة التالية: عدّل مسارات الصور بالكود (script.js و index.html) من .jpg إلى .webp"
