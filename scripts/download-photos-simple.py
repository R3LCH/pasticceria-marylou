#!/usr/bin/env python3
"""
Instagram Photo Downloader for Pasticceria Mary Lou

Simple script to download high-quality Instagram photos.

Usage:
    python3 download-photos-simple.py

Or provide URLs directly:
    python3 download-photos-simple.py https://www.instagram.com/p/ABC123/ https://www.instagram.com/p/DEF456/
"""

import sys
import subprocess
import json
from pathlib import Path

def download_instagram_photo(url, output_filename):
    """Download a single Instagram photo using yt-dlp"""
    try:
        # yt-dlp can download Instagram content
        result = subprocess.run([
            'yt-dlp',
            '--no-warnings',
            '--quiet',
            '--format', 'best',
            '--output', output_filename,
            url
        ], capture_output=True, text=True, timeout=30)
        
        if result.returncode == 0:
            print(f"✅ Downloaded: {output_filename}")
            return True
        else:
            print(f"❌ Failed: {output_filename} - {result.stderr}")
            return False
    except subprocess.TimeoutExpired:
        print(f"⏱️  Timeout: {url}")
        return False
    except FileNotFoundError:
        print("❌ Error: yt-dlp not installed")
        print("Install: pip install yt-dlp")
        print("Or: sudo apt install yt-dlp")
        return False
    except Exception as e:
        print(f"❌ Error: {e}")
        return False

def main():
    print("🍰 Pasticceria Mary Lou - Instagram Photo Downloader\n")
    
    # Create output directory
    output_dir = Path("downloaded-photos")
    output_dir.mkdir(exist_ok=True)
    print(f"📁 Output directory: {output_dir.absolute()}\n")
    
    # Instagram post URLs (you can modify this list)
    post_urls = [
        # Add Instagram post URLs here, for example:
        # "https://www.instagram.com/p/ABC123/",
        # "https://www.instagram.com/p/DEF456/",
    ]
    
    # Override with command-line args if provided
    if len(sys.argv) > 1:
        post_urls = sys.argv[1:]
    
    if not post_urls:
        print("⚠️  No URLs provided!")
        print("\nMethod 1: Edit this script and add URLs to the post_urls list")
        print("Method 2: Run with URLs as arguments:")
        print(f"  python3 {sys.argv[0]} https://www.instagram.com/p/ABC123/ https://www.instagram.com/p/DEF456/\n")
        print("Method 3: Use the browser console script (see scripts/download-instagram-photos.js)\n")
        return
    
    print(f"📸 Downloading {len(post_urls)} photos...\n")
    
    success_count = 0
    for i, url in enumerate(post_urls, 1):
        filename = output_dir / f"marylou-{i:02d}.jpg"
        if download_instagram_photo(url, str(filename)):
            success_count += 1
    
    print(f"\n✨ Downloaded {success_count}/{len(post_urls)} photos successfully!")
    print(f"\n📝 Next steps:")
    print(f"1. Review photos in: {output_dir.absolute()}")
    print(f"2. Create: pasticceria-marylou/public/images/")
    print(f"3. Move photos there and follow PHOTO-INTEGRATION-GUIDE.md")

if __name__ == "__main__":
    main()
