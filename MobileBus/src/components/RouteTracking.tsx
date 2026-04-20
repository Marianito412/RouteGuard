import {Group, Space, Stepper, Text, Title} from "@mantine/core";
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
    {stopName: "Parque la Paz 3"},
    {stopName: "Parque la Paz 4"}
]

export function RoutTracking() {
    const [active, setActive] = useState(0);
    
    const steps = route.map(() => {
        return (
            <Stepper.Step icon={<BusIcon weight="fill" size={18} />}>
            </Stepper.Step>
        )
    })
    
    return (
        <>
            <Text c="dimmed">Próxima parada</Text>
            <Title order={3}>{route[active].stopName}</Title>
            <Space h="md" />
            
            <Stepper active={active} onStepClick={setActive} size="xs">
                {steps}
            </Stepper>
            <Group justify="center">
                
            </Group>
        </>
    );
}