import {Student, Employee, ServiceProvider, User, StudentStakeHolder} from "./Users.ts"

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
    
    saveApp(){
        //Save instance of the app without session data
        const userCopy: User | null = this.user
        this.user = null
        localStorage.setItem('app', JSON.stringify(this));
        this.user = userCopy;
    }
    
    static loadApp(): Application{
        const savedUser = localStorage.getItem('app');

        if (savedUser) {
            const newApp: Application = JSON.parse(savedUser);
            return newApp;
        }
        return new Application();
    }
}

export const App = Application.loadApp();