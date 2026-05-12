import {Avatar, Box, Card, Group, SegmentedControl, Space, Stack, Stepper, Tabs, Text, Title} from "@mantine/core";
import {BusIcon } from "@phosphor-icons/react";
import {useState} from "react";
import {App} from "../core/Application.ts";
import type {Trip} from "../core/Trips.ts";
import type {Student} from "../core/Users.ts";
import IncidentReport from "./IncidentReport.tsx";

export type RouteStop = {
    stopName: string;
}

/*
const route: RouteStop[] = [
    {stopName: "Escuela Pacífica García"},
    {stopName: "Parque la Paz"},
    {stopName: "Parque la Paz 1"},
    {stopName: "Parque la Paz 2"},
    {stopName: "Parque la Paz 3"}
]
*/

function StudentCard({std}: {std: {student: Student, status: string, stop: string | null}}){
    return (
        <Card styles={{root: {flexGrow: 1} }}>
            <Group wrap="nowrap">
                <Avatar radius="xl" size="lg"/>
                <Box>
                    <Title order={4}>{std.student.name}</Title>
                    <Text c="dimmed" size="xs" >{std.student.grade} - {std.student.group}</Text>
                </Box>
            </Group>
            <Space h="sm"/>
            <Group grow wrap="nowrap">
                <SegmentedControl fullWidth defaultValue="Ausente" data={['Presente', 'Ausente']} />
            </Group>
        </Card>
    );
}

function RouteView({trp} : {trp: Trip}) {
    //console.log(trp.currentStop)
    const [active, setActive] = useState(trp.currentStop);
    const stepComps = trp.route?.stops.map(() => {
        return (
            <Stepper.Step icon={<BusIcon weight="fill" size={18} />}>
            </Stepper.Step>
        )
    })

    function handleNewStop(stepIndex: number) {
        App.setTripStop(trp, stepIndex)
        setActive(stepIndex)
    }

    return (
        <Tabs.Panel value={trp.route?.name || "invalid"} key={trp.route?.name}>
            <Card>
                <Text c="dimmed">Próxima parada</Text>
                <Title order={3}>{trp.route?.stops[active]}</Title>
                <Space h="md"/>
                <Stepper active={active} onStepClick={handleNewStop} size="xs">
                    {stepComps}
                </Stepper>
            </Card>
            <Space h="md"/>
            <Title order={2}>Hoja de asistencia</Title>
            <Space h="sm"/>
            <Stack>
                {
                    trp.students.map((student, i) => {
                        student.student
                        return (
                            <StudentCard key={i} std={student}/>
                        );
                    })
                }
            </Stack>
            <Space h="md"/>
            <Title order={2}>Reportar incidente</Title>
            <Space h="sm" />
            <IncidentReport trp={trp}/>
            
        </Tabs.Panel>
    )
}

export function RouteTracking() {
    let trps: Trip[] = App.employees[0].trips;
    console.log(trps);
    
    return (
        <>
        <Tabs variant="pills" defaultValue={trps[0].route?.name}>
            <Tabs.List>
                {
                    trps.map((trp) => {
                        return (
                            <Tabs.Tab value={trp.route?.name || "invalid"} key={trp.route?.name}>
                                {trp.route?.name}
                            </Tabs.Tab>
                        );
                    })
                }
            </Tabs.List>
            <Space h="sm"/>
            {trps.map((trp, i) => {return <RouteView key={i} trp={trp}/>})}
        </Tabs>
        </>
    );
}