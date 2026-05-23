#!/usr/bin/env python3
import http.server
import socketserver
import os
import cgi
import json
import time
from io import BytesIO
try:
    from PIL import Image
except Exception:
    Image = None

PORT = 3000
UPLOAD_DIR = os.path.join(os.getcwd(), 'images', 'uploads')
os.makedirs(UPLOAD_DIR, exist_ok=True)

class UploadHandler(http.server.SimpleHTTPRequestHandler):
    def do_POST(self):
        if self.path != '/upload-image':
            self.send_response(404)
            self.end_headers()
            return

        ctype, pdict = cgi.parse_header(self.headers.get('content-type'))
        if ctype != 'multipart/form-data':
            self.send_response(400)
            self.end_headers()
            return

        fs = cgi.FieldStorage(fp=self.rfile, headers=self.headers, environ={'REQUEST_METHOD':'POST'})
        if 'image' not in fs:
            self.send_response(400)
            self.end_headers()
            return

        fileitem = fs['image']
        if not fileitem.filename:
            self.send_response(400)
            self.end_headers()
            return

        filename = os.path.basename(fileitem.filename)
        name_part, ext = os.path.splitext(filename)
        ext = ext.lower()
        # sanitize name and ensure a safe extension
        safe_name = ''.join(c if c.isalnum() or c in '._-' else '_' for c in name_part)
        if not ext or ext not in ['.jpg', '.jpeg', '.png', '.gif', '.webp']:
            # default to .jpg for unknown extensions
            ext = '.jpg'

        base = f"{int(time.time())}-{safe_name}"
        outname = base + ext
        outpath = os.path.join(UPLOAD_DIR, outname)

        data = fileitem.file.read()
        try:
            with open(outpath, 'wb') as f:
                f.write(data)
        except Exception:
            with open(outpath, 'wb') as f:
                f.write(data)

        # If Pillow is available, generate responsive variants and WebP
        if Image:
            try:
                img = Image.open(BytesIO(data)).convert('RGB')
                sizes = [480, 768, 1200, 1920]
                for w in sizes:
                    ratio = w / img.width
                    h = int(img.height * ratio)
                    resized = img.resize((w, h), Image.LANCZOS)
                    resized.save(os.path.join(UPLOAD_DIR, f"{base}-{w}.jpg"), format='JPEG', quality=85)
                    # webp
                    resized.save(os.path.join(UPLOAD_DIR, f"{base}-{w}.webp"), format='WEBP', quality=80)
                # thumbnail
                thumb = img.copy()
                thumb.thumbnail((300, 300))
                thumb.save(os.path.join(UPLOAD_DIR, f"{base}-thumb.jpg"), format='JPEG', quality=80)
            except Exception as e:
                print('Variant generation failed:', e)

        url = f"/images/uploads/{outname}"
        self.send_response(200)
        self.send_header('Content-Type', 'application/json')
        self.end_headers()
        self.wfile.write(json.dumps({'url': url}).encode('utf-8'))


if __name__ == '__main__':
    os.chdir(os.getcwd())
    with socketserver.TCPServer(('', PORT), UploadHandler) as httpd:
        print(f"Upload server running at http://127.0.0.1:{PORT}")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print('\nShutting down')
            httpd.server_close()
