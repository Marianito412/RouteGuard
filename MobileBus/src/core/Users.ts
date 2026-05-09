import {Route, Trip} from "./Trips.ts"

export class User {
    userName: string;
    password: string;

    constructor(userName: string = "", password: string = "") {
        this.userName = userName;
        this.password = password;
    }
}

export class Student{
    name: string;
    school: string;
    grade: string;
    group: string;
    
    constructor(name: string = "", school: string = "", grade: string = "", group: string = "") {
        this.name = name;
        this.school = school;
        this.grade = grade;
        this.group = group;
    }
}

export class StudentStakeHolder extends User {
    students: Student[];
    
    constructor(userName: string = "", password: string = "", students: Student[] = []) {
        super(userName, password);
        this.students = students;
    }
}

export class CareTaker extends StudentStakeHolder {
    
}

export class Educator extends StudentStakeHolder {
    
}

export class ServiceProvider extends User {
    routes: Route[];
    trips: Trip[];
    
    constructor(userName: string = "", password: string = "", routes: Route[] = [], trips: Trip[] = []) {
        super(userName, password);
        this.routes = routes;
        this.trips = trips;
    }
}

export class Employee extends User {
    trips: Trip[];
    job: string;
    
    constructor(userName: string = "", password: string = "", trips: Trip[] = []) {
        super(userName, password);
        this.trips = trips;
        this.job = "Chofer"
    }
}