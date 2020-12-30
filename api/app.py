from flask import Flask, request, jsonify, make_response
import jwt
import datetime
import os
from werkzeug.utils import secure_filename
#from gevent.pywsgi import WSGIServer
from flask_sqlalchemy import SQLAlchemy
from functools import wraps



#from gevent.pywsgi import WSGIServer

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI']= 'postgresql://admin:12345@db/user-login-inforamation'
db=SQLAlchemy(app)

app.config['SECRET_KEY']='secretkey'
#app.config['UPLOAD_FOLDER'] = '/app/image-repo'
ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'])




class User(db.Model):
    id=db.Column(db.Integer, primary_key=True)
    userName=db.Column(db.String(50),unique=True)
    password=db.Column(db.String(80))
    isPublic=db.Column(db.Boolean)


#db.create_all()



def token_required(f):
    print("hiiiiiiiiii")
    @wraps(f)
    def decorated(*args, **kwargs):
        print(request.headers)

        token=None

        if('x-access-token' in request.headers):
            token=request.headers['x-access-token']
        if( not token):
            return jsonify({'message': 'token is missing'}),401

        try:
            data=jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])

            
            if(data['public_id']=="admin"):
                current_user=data['public_id']
            else:
                return jsonify({'message': 'token is invalidjkjkjkjkj'})

        except:
            return jsonify({'message': 'token is invalid'})

        return f(current_user, *args, **kwargs)
    return decorated







@app.route('/login', methods=['POST'])
def login():
    print("salam")

    print(request)
    auth=request.authorization
    if not auth or not auth.username or not auth.password:
        return make_response('could yo verify', 401)
    if auth.password!="12345":
        return ('could yo verify', 401)
    if auth.password=="12345":

        token=jwt.encode({'public_id':'admin', 'exp':datetime.datetime.utcnow()+datetime.timedelta(minutes=5)},app.config['SECRET_KEY'])

        return jsonify({'token':token})

    return make_response('could yo verify', 401, {'WWW-Authenticate': 'Basic realm=Login required'})


@app.route('/upload', methods=['POST'])
@token_required
def add_image(current_user):
    image=request.files['myImage']
    filename = "Screen Shot 2020-12-15 at 22.15.50.png"
    image.save(os.path.join('/app/image-repo', filename))


    return jsonify({'type': str(type(image))})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)

  #  WSGIServer(('0.0.0.0', 5000), app).serve_forever()
