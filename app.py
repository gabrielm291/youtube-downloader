from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import yt_dlp
import os

app = Flask(__name__)
CORS(app)

DOWNLOAD_FOLDER = 'downloads'
os.makedirs(DOWNLOAD_FOLDER, exist_ok=True)

@app.route('/download', methods=['POST'])
def download_video():
    data = request.get_json()

    url = data.get('url')
    format_type = data.get('format', 'mp4')

    if not url:
        return jsonify({'error': 'Keine URL'}), 400

    try:
        ydl_opts = {
            'outtmpl': f'{DOWNLOAD_FOLDER}/%(title)s.%(ext)s'
        }

        if format_type == 'mp3':
            ydl_opts.update({
                'format': 'bestaudio/best',
                'postprocessors': [{
                    'key': 'FFmpegExtractAudio',
                    'preferredcodec': 'mp3',
                    'preferredquality': '192'
                }]
            })
        else:
            ydl_opts.update({
                'format': 'best'
            })

        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(url, download=True)
            filename = ydl.prepare_filename(info)

        if format_type == 'mp3':
            filename = os.path.splitext(filename)[0] + '.mp3'

        file_only = os.path.basename(filename)

        return jsonify({
            'success': True,
            'download_url': f'https://DEIN-SERVER.onrender.com/file/{file_only}'
        })

    except Exception as e:
        return jsonify({'error': str(e)})

@app.route('/file/<path:filename>')
def download_file(filename):
    return send_from_directory(DOWNLOAD_FOLDER, filename, as_attachment=True)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)