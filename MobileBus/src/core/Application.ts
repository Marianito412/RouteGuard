import {Student, Employee, ServiceProvider, Educator} from "./Users.ts"

class Application {
    
    students: Student[];
    employees: Employee[];
    serviceProviders: ServiceProvider[];
    
    constructor() {
        this.students = []
        this.employees = []
        this.serviceProviders = []
    }
}

export const App = new Application();