import {Button, Card, SegmentedControl, Space, Stack, Tabs, Title} from "@mantine/core";
import {App} from "../../core/Application.ts"
import {useState} from "react";
import type {Trip} from "../../core/Trips.ts";
import type {Student} from "../../core/Users.ts";

function ScheduleCards({student}: {student: Student}){
    let [hasChanged, setHasChanged] = useState(false);

    const tripChanged = (trip: Trip) => (newState: string) => {
        if (newState == "Asiste") {
            trip.addStudent(student);
        }
        
        if (newState == "No Asiste") {
            trip.removeStudent(student);
        }
        
        App.saveApp()
        setHasChanged(true);
    }
    
    const getTripState = (trip: Trip): string  => {
        const isGoing: Boolean = trip.students.find(
            (s) => {
                return student.name == s.student.name
            }) != undefined
        
        return isGoing ? "Asiste" : "No Asiste";
    }
    
    const test = App.serviceProviders[0].trips.map((trip, idx)=>{
        return (
            <Card key={idx}>
                <Title>{trip.route?.name + " @ " + trip.date+trip.time}</Title>
                <SegmentedControl fullWidth defaultValue={getTripState(trip)} data={['Asiste', 'No Asiste']} onChange={tripChanged(trip)}/>
            </Card>
        )
    })
    
    return (
        <>
            <Space h="sm"/>
            <Stack>
                {hasChanged ? <Button onClick={() => {setHasChanged(false)}}>Guardar Cambios</Button> : null}
                {test}
            </Stack>
        </>
    );
}

function TripSchedule(){
    let studentStakeHolder = App.studentStakeholders[0]
    const students = studentStakeHolder.students
    
    return (
        <Tabs variant="pills" defaultValue={students[0].name}>
            <Tabs.List>
                {
                    students.map((student) => {
                        return (
                            <Tabs.Tab value={student.name} key={student.name}>
                                {student.name}
                            </Tabs.Tab>
                        );
                    })
                }
            </Tabs.List>
            {
                students.map((student) => {
                    return (
                        <Tabs.Panel value={student.name} key={student.name}>
                            <ScheduleCards student={student}/>
                        </Tabs.Panel>    
                    )
                })
            }
        </Tabs>
    );
}

export default TripSchedule