import {Button, Card, NativeSelect, Space, Stack, Textarea, TextInput, Title} from "@mantine/core";
import {App} from "../core/Application.ts";
import {Incident, type Trip} from "../core/Trips.ts";
import {useState} from "react";

function IncidentReport({trp}: {trp: Trip}) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [severity, setSeverity] = useState('Low');

    /*
    let mytrp: Trip;
    for (let employee of App.employees) {
        let test = employee.trips.find((thistrip) => {return thistrip===trp}); 
        if (test != undefined){
            mytrp = test;
        }
    }
    */
    //console.log(App.employees[0]);
    
    const handleSubmit = () => {
        //const formData = { title, description, severity };
        App.addTripIncident(trp, new Incident(title, description, severity))
        //console.log(formData); // replace with your handler
    };
    
    return (
        <>
            <Card>
                <Stack>
                    <TextInput label="Título" placeholder="Título" onChange={(e) => setTitle(e.target.value)} />
                    <Textarea label="Descripción" placeholder="Descripción" onChange={(e) => setDescription(e.target.value)} />
                    <NativeSelect label="Severidad" description="Severidad" data={['Low', 'Medium', 'High']} onChange={(e) => setSeverity(e.target.value)} />
                    
                    <Button fullWidth onClick={handleSubmit}>Enviar Reporte</Button>
                </Stack>
            </Card>
        </>
    );
}

export default IncidentReport;