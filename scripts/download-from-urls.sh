#!/bin/bash

# Instagram Photo Downloader for Pasticceria Mary Lou
# Uses URLs extracted from browser

set -e

echo "🍰 Pasticceria Mary Lou - Photo Downloader"
echo "=========================================="
echo ""

# Check if URL file exists
URL_FILE="${1:-$HOME/Downloads/instagram-urls.txt}"

if [ ! -f "$URL_FILE" ]; then
    echo "❌ Error: URL file not found: $URL_FILE"
    echo ""
    echo "Usage:"
    echo "  1. Run instagram-url-extractor.js in browser console"
    echo "  2. It will download instagram-urls.txt to Downloads"
    echo "  3. Run this script: ./download-from-urls.sh"
    echo ""
    echo "Or specify file:"
    echo "  ./download-from-urls.sh /path/to/urls.txt"
    exit 1
fi

# Create output directory
OUTPUT_DIR="downloaded-photos"
mkdir -p "$OUTPUT_DIR"

echo "📁 Output directory: $OUTPUT_DIR"
echo "📄 Reading URLs from: $URL_FILE"
echo ""

# Count URLs
URL_COUNT=$(wc -l < "$URL_FILE")
echo "📸 Found $URL_COUNT URLs"
echo ""

# Download photos
counter=1
success=0
failed=0

while IFS= read -r url; do
    # Skip empty lines
    [ -z "$url" ] && continue
    
    filename=$(printf "marylou-%02d.jpg" $counter)
    filepath="$OUTPUT_DIR/$filename"
    
    echo -n "[$counter/$URL_COUNT] Downloading $filename... "
    
    # Try wget first, fall back to curl
    if command -v wget &> /dev/null; then
        if wget -q -O "$filepath" "$url" 2>/dev/null; then
            echo "✅"
            ((success++))
        else
            echo "❌ Failed"
            ((failed++))
            rm -f "$filepath"
        fi
    elif command -v curl &> /dev/null; then
        if curl -s -o "$filepath" "$url" 2>/dev/null; then
            echo "✅"
            ((success++))
        else
            echo "❌ Failed"
            ((failed++))
            rm -f "$filepath"
        fi
    else
        echo "❌ Error: Neither wget nor curl found"
        exit 1
    fi
    
    ((counter++))
    
    # Rate limit: wait 0.5s between downloads
    sleep 0.5
    
done < "$URL_FILE"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✨ Download Complete!"
echo ""
echo "📊 Statistics:"
echo "   Success: $success"
echo "   Failed:  $failed"
echo "   Total:   $URL_COUNT"
echo ""
echo "📁 Photos saved to: $OUTPUT_DIR/"
echo ""
ls -lh "$OUTPUT_DIR"/*.jpg 2>/dev/null | head -10
echo ""
echo "📝 Next steps:"
echo "   1. Review photos in $OUTPUT_DIR/"
echo "   2. Create: pasticceria-marylou/public/images/"
echo "   3. Move photos: mv $OUTPUT_DIR/*.jpg pasticceria-marylou/public/images/"
echo "   4. Follow PHOTO-INTEGRATION-GUIDE.md"
echo ""
