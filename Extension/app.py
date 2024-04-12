from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/test', methods=['POST'])
def receive_data():
    data = request.json
    print("i am from flask", data)
    return jsonify({"status": "I am from flask"}), 200




if __name__ == '__main__':
    app.run(debug=True, port=5000)
