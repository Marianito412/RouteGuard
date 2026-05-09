import {Student} from "./Users.ts"

export class Route {
    name: string;
    direction: "ToSchool" | "FromSchool";
    stops: string[]
    
    constructor(name: string) {
        this.name = name;
        this.direction = "ToSchool";
        this.stops = [];
    }
}

export class Incident {
    title: string
    description: string
    severity: "Medium" | "High" | "Low"
    
    constructor(title: string, description: string, severity: "Medium" | "High" | "Low") {
        this.title = title;
        this.description = description;
        this.severity = severity;
    }
}

export class Trip {
    route: Route | null;
    students: {student: Student, status: "Absent"|"Present"|"NotAttending", stop: string|null}[];
    incidents: Incident[];
    date: string;
    time: string;
    currentStop: number;
    
    constructor(route: Route | null = null, date: string = "", time: string = "") {
        this.route = route;
        this.incidents = [];
        this.students = [];
        this.date = date;
        this.time = time;
        this.currentStop = 0
    }
    
    addStudent(student: Student){
        this.students.push({student: student, status: "Absent", stop: null});
    }
    
    removeStudent(student: Student){
        this.students = this.students.filter(u => u.student === student);
    }
}