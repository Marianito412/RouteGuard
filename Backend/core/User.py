
class User:
    def __init__(self, name: str, lastname: str, friend: object):
        self.name = name
        self.lastname = lastname
        self.friend = friend
    def __str__(self):
        return f"{self.name} {self.lastname} \n\tFriend: {self.friend.__str__()}"

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