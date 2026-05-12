import { Student, CareTaker, Educator, ServiceProvider, Employee } from './Users.ts';
import { Route, Trip, Incident } from './Trips.ts';
import { App } from './Application.ts';

// --- Students ---
const students: Student[] = [
    new Student("Alice Johnson", "Greenwood Elementary", "3rd", "A"),
    new Student("Bob Smith", "Greenwood Elementary", "3rd", "A"),
    new Student("Carlos Rivera", "Greenwood Elementary", "4th", "B"),
    new Student("Diana Lee", "Sunnydale Middle School", "6th", "C"),
    new Student("Ethan Brown", "Sunnydale Middle School", "6th", "C"),
    new Student("Fiona Davis", "Sunnydale Middle School", "7th", "D"),
];

// --- Routes ---
const routeA = new Route("Route A - North");
routeA.direction = "ToSchool";
routeA.stops = ["Oak Street", "Maple Avenue", "Pine Road", "Greenwood Elementary"];

const routeB = new Route("Route B - South");
routeB.direction = "FromSchool";
routeB.stops = ["Sunnydale Middle School", "Elm Street", "Cedar Lane", "Birch Boulevard"];

// --- Incidents ---
const incidents: Incident[] = [
    new Incident("Late Departure", "Bus departed 10 minutes late due to traffic.", "Low"),
    new Incident("Student Injury", "Student fell while boarding the bus.", "High"),
    new Incident("Route Deviation", "Driver took an alternate route due to road closure.", "Medium"),
    new Incident("Missed Stop", "Driver took an alternate route due to road closure.", "Medium"),
];

// --- Trips ---
const tripA = new Trip(routeA, "2024-11-01", "07:30");
tripA.students = [
    { student: students[0], status: "Present", stop: null},
    { student: students[5], status: "Absent", stop: null },
    { student: students[2], status: "Present", stop: null },
];
tripA.incidents = [incidents[0], incidents[3]];

//const tripA1 = new Trip(routeA, "2024-11-02", "07:30");
//const tripA2 = new Trip(routeA, "2024-11-03", "07:30");
//const tripA3 = new Trip(routeA, "2024-11-04", "07:30");

const tripB = new Trip(routeB, "2024-11-01", "14:00");
tripB.students = [
    { student: students[3], status: "Present", stop: null },
    { student: students[4], status: "NotAttending", stop: null },
    { student: students[1], status: "Present", stop: null },
];
tripB.incidents = [incidents[1], incidents[2]];

// --- ServiceProviders ---
const serviceProviders: ServiceProvider[] = [
    new ServiceProvider("provider_north", "svcpass1", [routeA], [tripA]),
    new ServiceProvider("provider_south", "svcpass2", [routeB], [tripB]),
];

// --- Employees ---
const employees: Employee[] = [
    new Employee("driver_mike", "drvpass1", [tripA, tripB]),
    new Employee("driver_sara", "drvpass2", [tripB]),
];

// --- CareTakers ---
const careTakers: CareTaker[] = [
    new CareTaker("parent_alice", "password123", [students[0], students[1]]),
    new CareTaker("parent_carlos", "password456", [students[2]]),
    new CareTaker("parent_diana", "password789", [students[3], students[4]]),
];

// --- Educators ---
const educators: Educator[] = [
    new Educator("teacher_johnson", "edupass1", [students[0], students[1], students[2]]),
    new Educator("teacher_smith", "edupass2", [students[3], students[4], students[5]]),
];


// --- Populate and save the App singleton ---
App.students = students;
App.employees = employees;
App.serviceProviders = serviceProviders;
App.studentStakeholders = [...careTakers, ...educators];
App.saveApp();

console.log("Mock application data saved to localStorage.");
