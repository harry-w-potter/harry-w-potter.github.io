from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/messages.json', methods=['POST'])
def update_json():
    # Get the message from the request
    message = request.form['message']

    # Open the JSON file and read the data
    with open('messages.json', 'r') as f:
        data = json.load(f)

    # Add the new message to the data
    data['messages'].append(message)

    # Save the data to the JSON file
    with open('messages.json', 'w') as f:
        json.dump(data, f)

    return jsonify({'success': True})

if __name__ == '__main__':
    app.run()