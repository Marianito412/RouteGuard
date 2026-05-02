import pickle
from core.User import User
from flask import Flask
#from Handlers.SalesHandler import SalesBlueprint
#from Handlers.AdminHandler import AdminBlueprint

app = Flask(__name__)

# agregar acá todos los blueprints con sus prefijos respectivos
#app.register_blueprint(SalesBlueprint, url_prefix='/sales')
#app.register_blueprint(AdminBlueprint, url_prefix='/admin')

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>" 

if __name__ == '__main__':
    print(app.url_map)

    user: User = None

    with open('my_data.pkl', 'rb') as file:
        user = pickle.load(file)
    
    #user.friend = User("Another", "User", None)
    print(user)
    
    #user.lastname = "Torres"

    with open('my_data.pkl', 'wb') as file:
        pickle.dump(user, file)
    
    app.run(debug = True)