import {Avatar, Box, Card, Group, SegmentedControl, Space, Stack, Stepper, Text, Title} from "@mantine/core";
import {BusIcon } from "@phosphor-icons/react";
import {useState} from "react";

export type RouteStop = {
    stopName: string;
}

const route: RouteStop[] = [
    {stopName: "Escuela Pacífica García"},
    {stopName: "Parque la Paz"},
    {stopName: "Parque la Paz 1"},
    {stopName: "Parque la Paz 2"},
    {stopName: "Parque la Paz 3"}
]

function StudentCard(){
    return (
        <Card styles={{root: {flexGrow: 1} }}>
            <Group wrap="nowrap">
                <Avatar radius="xl" size="lg"/>
                <Box>
                    <Title order={4}>Nombre del estudiante</Title>
                    <Text c="dimmed" size="xs" >Grado - Grupo</Text>
                </Box>
            </Group>
            <Space h="sm"/>
            <Group grow wrap="nowrap">
                <SegmentedControl fullWidth defaultValue="Ausente" data={['Presente', 'Ausente']} />
            </Group>
        </Card>
    );
}

export function RoutTracking() {
    const [active, setActive] = useState(0);
    
    const stepComps = route.map(() => {
        return (
            <Stepper.Step icon={<BusIcon weight="fill" size={18} />}>
            </Stepper.Step>
        )
    })
    
    return (
        <>
            <Card>
                <Text c="dimmed">Próxima parada</Text>
                <Title order={3}>{route[active].stopName}</Title>
                <Space h="md"/>
                    <Stepper active={active} onStepClick={setActive} size="xs" styles={{
                        /*steps: {flexWrap: 'nowrap'}*/
                    }}>
                        {stepComps}
                    </Stepper>
            </Card>
            <Space h="md" />
            <Title order={2}>Hoja de asistencia</Title>
            <Space h="sm" />
            <Stack >
                <StudentCard/>
                <StudentCard/>
                <StudentCard/>
                <StudentCard/>
                <StudentCard/>
                <StudentCard/>
                <StudentCard/>
                <StudentCard/>
                <StudentCard/>
                <StudentCard/>
            </Stack>
        </>
    );
}