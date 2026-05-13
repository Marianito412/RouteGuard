import {Button, Card, NativeSelect, Space, Stack, Textarea, TextInput, Title} from "@mantine/core";
import {App} from "../core/Application.ts";
import {Incident, type Trip} from "../core/Trips.ts";
import {useState} from "react";

function IncidentReport() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [severity, setSeverity] = useState('Low');
    const [selectedTrip, setSelectedTrip] = useState<Trip | null>(App.getAllTrips()[0] ?? null);

    const trips = App.getAllTrips();
    const tripOptions = trips.map(t => t.route?.name + " - " + t.date);
    
    //console.log(App.employees[0]);
    
    const handleSubmit = () => {
        if (!selectedTrip) return;
        App.addTripIncident(selectedTrip, new Incident(title, description, severity));
    };
    
    return (
        <>
            <Title>Incident Report</Title>
            <Space h="md" />
            <Card>
                <Stack>
                    <NativeSelect
                        label="Viaje"
                        data={tripOptions}
                        onChange={(e) => setSelectedTrip(trips[e.target.selectedIndex])}
                    />
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