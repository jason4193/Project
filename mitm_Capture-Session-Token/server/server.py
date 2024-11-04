from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/login', methods=['POST'])
def login():
    username = request.form.get('username')
    password = request.form.get('password')
    if username == 'admin' and password == 'password':
        response = jsonify({'message': 'Login successful'})
        response.set_cookie('session_token', 'flag{this_is_a_mitm_attack}')
        return response
    return jsonify({'message': 'Invalid credentials'}), 401

@app.route('/logout', methods=['POST'])
def logout():
    response = jsonify({'message': 'Logout successful'})
    response.set_cookie('session_token', '', expires=0)
    return response

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3000)