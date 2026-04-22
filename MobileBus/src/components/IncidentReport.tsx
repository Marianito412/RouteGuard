import {Button, Card, NativeSelect, Space, Stack, Textarea, TextInput, Title} from "@mantine/core";


function IncidentReport() {
    return (
        <>
            <Title>Incident Report</Title>
            <Space h="md" />
            <Card>
                <Stack>
                    <TextInput label="Título" placeholder="Título"/>
                    <Textarea label="Descripción" placeholder="Descripción"/>
                    <NativeSelect label="Severidad" description="Severidad" data={['Leve', 'Media', 'Grave']} />
                    
                    <Button fullWidth>Enviar Reporte</Button>
                </Stack>
            </Card>
        </>
    );
}

export default IncidentReport;