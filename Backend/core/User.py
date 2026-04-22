
class User:
    def __init__(self, name: str, lastname: str):
        self.name = name
        self.lastname = lastname

class ServiceProvider(User):
    pass

class Employee(User):
    pass

class StudentStakeholder(User):
    pass

class CareTaker(User):
    pass



class Student(User):
    pass