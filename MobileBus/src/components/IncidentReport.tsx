import {Button, Card, NativeSelect, Space, Stack, Textarea, TextInput, Title} from "@mantine/core";
import {App} from "../core/Application.ts";
import {Incident, type Trip} from "../core/Trips.ts";
import {useState} from "react";

function IncidentReport() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [severity, setSeverity] = useState('Low');

    let trp = App.employees[0].trips[0]
    
    console.log(App.employees[0]);
    
    const handleSubmit = () => {
        const formData = { title, description, severity };
        App.addTripIncident(trp, new Incident(title, description, severity))
        console.log(formData); // replace with your handler
    };
    
    return (
        <>
            <Title>Incident Report</Title>
            <Space h="md" />
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