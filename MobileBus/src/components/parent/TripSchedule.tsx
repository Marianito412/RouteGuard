import {Button, Card, SegmentedControl, Space, Stack, Tabs, Title} from "@mantine/core";
import {useState} from "react";

function ScheduleCards(){
    let [hasChanged, setHasChanged] = useState(false);
    
    const trips = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes"]

    const test = trips.map((trip)=>{
        return (
            <Card key={trip}>
                <Title>{trip}</Title>
                <SegmentedControl fullWidth data={['Asiste', 'No Asiste']} onChange={() => setHasChanged(true)} />
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
    
    const students = ["Max", "Steve", "Carl"]

    return (
        <Tabs variant="pills" defaultValue={students[0]}>
            <Tabs.List>
                {
                    students.map((student) => {
                        return (
                            <Tabs.Tab value={student} key={student}>
                                {student}
                            </Tabs.Tab>
                        );
                    })
                }
            </Tabs.List>
            {
                students.map((student) => {
                    return (
                        <Tabs.Panel value={student} key={student}>
                            <ScheduleCards/>
                        </Tabs.Panel>    
                    )
                })
            }
        </Tabs>
    );
}

export default TripSchedule