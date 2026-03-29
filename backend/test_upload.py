import urllib.request
import json

url = 'http://127.0.0.1:8000/api/token/'
data = json.dumps({'username': 'r_mishra', 'password': 'faculty@2025'}).encode('utf-8')
req = urllib.request.Request(url, data=data, headers={'Content-Type': 'application/json'})

try:
    with urllib.request.urlopen(req) as f:
        token = json.loads(f.read().decode('utf-8'))['access']
except Exception as e:
    print('Failed getting token', getattr(e, 'read', lambda: b'')().decode('utf-8'))
    exit(1)

# Get valid subject
try:
    req_sub = urllib.request.Request('http://127.0.0.1:8000/api/subjects/')
    req_sub.add_header('Authorization', 'Bearer ' + token)
    with urllib.request.urlopen(req_sub) as f:
        subjects = json.loads(f.read().decode('utf-8'))
        subject_id = str(subjects[0]['id'])
except Exception as e:
    print('Failed getting subject', e)
    exit(1)

boundary = '----WebKitFormBoundary7MA4YWxkTrZu0gW'
body = []

def add_field(name, value):
    body.append('--' + boundary)
    body.append('Content-Disposition: form-data; name="' + name + '"')
    body.append('')
    body.append(value)

add_field('subject', subject_id)
add_field('title', 'Test PDF Upload')
add_field('category', 'notes')
add_field('description', 'Test upload via python')

body.append('--' + boundary)
body.append('Content-Disposition: form-data; name="file"; filename="test.pdf"')
body.append('Content-Type: application/pdf')
body.append('')
body.append('dummy pdf content')
body.append('--' + boundary + '--')
body.append('')

body_str = '\r\n'.join(body)

req2 = urllib.request.Request('http://127.0.0.1:8000/api/materials/', data=body_str.encode('utf-8'))
req2.add_header('Authorization', 'Bearer ' + token)
req2.add_header('Content-Type', 'multipart/form-data; boundary=' + boundary)

try:
    with urllib.request.urlopen(req2) as f:
        print('Upload Success:', f.read().decode('utf-8'))
except urllib.error.HTTPError as e:
    print('Upload failed:', e.code, e.reason)
    print(e.read().decode('utf-8'))
