import requests
import time

server_url = 'http://server:3000'

def login():
    response = requests.post(f'{server_url}/login', data={'username': 'admin', 'password': 'password'})
    if response.status_code == 200:
        print('Login successful')
        return response.cookies
    else:
        print('Login failed')
        return None

def logout(cookies):
    response = requests.post(f'{server_url}/logout', cookies=cookies)
    if response.status_code == 200:
        print('Logout successful')
    else:
        print('Logout failed')

if __name__ == '__main__':
    while True:
        cookies = login()
        if cookies:
            time.sleep(5)
            logout(cookies)
        time.sleep(10)