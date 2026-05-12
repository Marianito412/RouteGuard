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
    
    addTripStudent(trip: Trip, student: Student){
        trip.students.push({student: student, status: "Absent", stop: null});
    }

    removeTripStudent(trip: Trip, student: Student){
        trip.students = trip.students.filter(u => u.student.name == student.name);
    }
    
    addTripIncident(trip: Trip, incident: Incident){
        console.log(incident);
        trip.incidents.push(incident);
        this.saveApp()
    }
    
    setTripStop(trip: Trip, stop: number){
        trip.currentStop = stop;
        this.saveApp()
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
    
    static loadApp(): Application{
        const savedApp = localStorage.getItem('app');

        if (savedApp) {
            const parsed = JSON.parse(savedApp);
            const app = Object.assign(new Application(), parsed);

            // Revive nested class instances
            app.students = parsed.students.map((s: any) => Object.assign(new Student(), s));
            app.employees = parsed.employees.map((e: any) => Object.assign(new Employee(), e));
            app.serviceProviders = parsed.serviceProviders.map((e: any) => Object.assign(new ServiceProvider(), e));
            /*
            app.serviceProviders = parsed.serviceProviders.map((sp: any) => {
                let serviceProvider: ServiceProvider = Object.assign(new ServiceProvider(), sp)
                serviceProvider.trips = sp.trips.map((t: any) => Object.assign(new Trip(), t))
                return serviceProvider
            });
            */
            
            app.studentStakeholders = parsed.studentStakeholders.map((sp: any) => Object.assign(new StudentStakeHolder(), sp));
            return app;
        }
        return new Application();
    }
}

export const App = Application.loadApp();