import {Student, Employee, ServiceProvider, User, StudentStakeHolder} from "./Users.ts"
import {Incident, Trip} from "./Trips.ts";

class Application {
    
    students: Student[];
    employees: Employee[];
    serviceProviders: ServiceProvider[];
    studentStakeholders: StudentStakeHolder[];
    
    //user that logged in
    user: User | null;
    
    constructor() {
        this.students = []
        this.employees = []
        this.serviceProviders = []
        this.studentStakeholders = []
        this.user = null
    }
    
    getTripEmployees(trp: Trip): Employee[]{
        return this.employees.filter(employee => {
            return employee.trips.findIndex((tp) => {
                return tp.date == trp.date && tp.time == trp.time;
            }) != -1
        });
    }

    addTripStudent(trip: Trip, student: Student) {
        const newEntry = { student: student, status: "Absent", stop: null };

        // Add to serviceProviders
        for (const sp of this.serviceProviders) {
            const found = sp.trips.find(t => t.date === trip.date && t.time === trip.time && t.route?.name === trip.route?.name);
            if (found) {
                found.students.push(newEntry);
            }
        }

        // Add to employees
        for (const emp of this.employees) {
            const found = emp.trips.find(t => t.date === trip.date && t.time === trip.time && t.route?.name === trip.route?.name);
            if (found) {
                found.students.push(newEntry);
            }
        }

        this.saveApp();
    }

    removeTripStudent(trip: Trip, student: Student) {
        // Remove from serviceProviders
        for (const sp of this.serviceProviders) {
            const found = sp.trips.find(t => t.date === trip.date && t.time === trip.time && t.route?.name === trip.route?.name);
            if (found) {
                found.students = found.students.filter(s => s.student.name !== student.name);
            }
        }

        // Remove from employees
        for (const emp of this.employees) {
            const found = emp.trips.find(t => t.date === trip.date && t.time === trip.time && t.route?.name === trip.route?.name);
            if (found) {
                found.students = found.students.filter(s => s.student.name !== student.name);
            }
        }

        this.saveApp();
    }
    
    addTripIncident(trip: Trip, incident: Incident){
        for (const sp of this.serviceProviders) {
            const found = sp.trips.find(t => t.date === trip.date && t.time === trip.time && t.route?.name === trip.route?.name);
            if (found) {
                found.incidents.push(incident);
                this.saveApp();
                return;
            }
        }
    }
    
    setTripStop(trip: Trip, stop: number){
        for (const sp of this.serviceProviders) {
            const found = sp.trips.find(t => t.date === trip.date && t.time === trip.time && t.route?.name === trip.route?.name);
            if (found) {
                found.currentStop = stop;
                this.saveApp();
                return;
            }
        }
    }
    
    getAllTrips(): Trip[]{
        let allTrips: Trip[] = [];
        for (let serviceProvider of this.serviceProviders) {
            for (let trip of serviceProvider.trips) {
                allTrips.push(trip);
            }
        }
        return allTrips;
    }
    
    findTrips(st: Student){
        let trps: Trip[] = []
        for (let serviceProvider of this.serviceProviders) {
            for (let trip of serviceProvider.trips) {
                let found = trip.students.findIndex(student => {return st.name == student.student.name})
                if (found != -1) {
                    trps.push(trip)
                }
            }
        }
        return trps
    }

    updateTripStudentStatus(trip: Trip, student: Student, status: "Absent" | "Present" | "NotAttending") {
        for (const sp of this.serviceProviders) {
            const found = sp.trips.find(t => t.date === trip.date && t.time === trip.time && t.route?.name === trip.route?.name);
            if (found) {
                const entry = found.students.find(s => s.student.name === student.name);
                if (entry) entry.status = status;
            }
        }

        for (const emp of this.employees) {
            const found = emp.trips.find(t => t.date === trip.date && t.time === trip.time && t.route?.name === trip.route?.name);
            if (found) {
                const entry = found.students.find(s => s.student.name === student.name);
                if (entry) entry.status = status;
            }
        }

        this.saveApp();
    }

    hasStudentMissedBus(trip: Trip, student: Student): boolean {
        const entry = trip.students.find(s => s.student.name === student.name);
        if (!entry) return false;
        return trip.currentStop > 0 && entry.status === "Absent";
    }
    
    login(userName: string, password: string, userType: "ServiceProvider"|"Employee"|"StakeHolder"): boolean{
        let foundUser = undefined;
        if (userType == "Employee"){
            foundUser = this.employees.find((element) => {
                return element.userName == userName && element.password == password;
            })
        }
        
        if (userType == "StakeHolder"){
            foundUser = this.studentStakeholders.find((element) => {
                return element.userName == userName && element.password == password;
            })
        }
        
        if (userType =="ServiceProvider"){
            foundUser = this.serviceProviders.find((element) => {
                return element.userName == userName && element.password == password;
            })
        }
        if (foundUser == undefined) return false;
        
        this.user = foundUser;
        return true;
    }
    
    saveApp(): void{
        const userCopy: User | null = this.user
        this.user = null
        localStorage.setItem('app', JSON.stringify(this));
        this.user = userCopy;
    }

    static loadApp(): Application {
        const savedApp = localStorage.getItem('app');

        if (savedApp) {
            const parsed = JSON.parse(savedApp);
            const app = Object.assign(new Application(), parsed);

            app.students = parsed.students.map((s: any) => Object.assign(new Student(), s));
            app.employees = parsed.employees.map((e: any) => {
                const emp = Object.assign(new Employee(), e);
                emp.trips = e.trips.map((t: any) => {
                    const trip = Object.assign(new Trip(), t);
                    trip.incidents = t.incidents.map((i: any) => Object.assign(new Incident(), i));
                    trip.students = t.students.map((s: any) => ({
                        ...s,
                        student: Object.assign(new Student(), s.student)
                    }));
                    return trip;
                });
                return emp;
            });
            app.serviceProviders = parsed.serviceProviders.map((sp: any) => {
                const serviceProvider = Object.assign(new ServiceProvider(), sp);
                serviceProvider.trips = sp.trips.map((t: any) => {
                    const trip = Object.assign(new Trip(), t);
                    trip.incidents = t.incidents.map((i: any) => Object.assign(new Incident(), i));
                    trip.students = t.students.map((s: any) => ({
                        ...s,
                        student: Object.assign(new Student(), s.student)
                    }));
                    return trip;
                });
                return serviceProvider;
            });
            app.studentStakeholders = parsed.studentStakeholders.map((sp: any) => Object.assign(new StudentStakeHolder(), sp));

            return app;
        }
        return new Application();
    }
}

export const App = Application.loadApp();