import {Card, Group, Space, Stack, Text, Timeline, Title, ActionIcon, Scroller, Avatar} from "@mantine/core";
import {ChatCircleDotsIcon, GitBranchIcon, GitCommitIcon, GitPullRequestIcon, PhoneCallIcon, WhatsappLogoIcon} from "@phosphor-icons/react";
import {App} from "../../core/Application.ts";
import {Employee, Student, type StudentStakeHolder} from "../../core/Users.ts";
import {Incident, type Trip} from "../../core/Trips.ts";

function RouteCard({trp}: {trp: Trip}) {
    return (
        <Card orientation="horizontal" display="flex" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
            <Stack align="flex-start" gap="xs">
                <Title order={3}>{trp.route?.name}</Title>
                <Text size="sm" c="blue">Llegando en 6 minutos</Text>
            </Stack>
            
            <Space w="md"/>
            
            <Stack align="flex-end" gap="xs">
                <Title ta="right" order={3}>Próxima Parada</Title>
                <Text ta="right" size="sm" c="dimmed">{trp.route?.stops[trp.currentStop+1]}</Text>
            </Stack>
        </Card>
    )
}

function PersonnelCard({emp}: {emp: Employee}) {
    return(
        <Card w="fit-content">
            <Avatar mx="auto" size={60} src={null} alt="no image here"/>
            <Title mx="auto" ta="center" textWrap="balance" order={5}>{emp.userName}</Title>
            <Text mx="auto" ta="center" mb={6} c="dimmed" size="sm">{emp.job}</Text>
            <Group wrap="nowrap" justify="center">
                <ActionIcon variant="outline" aria-label="Call" component="a" href="tel:+00000000000" target="_blank">
                    <PhoneCallIcon style={{ width: '70%', height: '70%' }} />
                </ActionIcon>
                <ActionIcon variant="outline" aria-label="Message" component="a" href="https://wa.me/00000000000" target="_blank">
                    <WhatsappLogoIcon style={{ width: '70%', height: '70%' }} />
                </ActionIcon>
            </Group>
        </Card>
    )
}

function TripPersonnel({trp}: {trp: Trip}) {
    let employees = App.getTripEmployees(trp)
    
    return (
        <Scroller draggable>
            <Group wrap="nowrap" justify="center">
                {employees.map((employee: Employee, i) => {return <PersonnelCard key={i} emp={employee}/>})}
            </Group>
        </Scroller>
    )
}

function TripStatus({trp, st}: {trp: Trip, st: Student}){
    return (
        <Timeline active={1} bulletSize={24} lineWidth={2}>
            <Timeline.Item bullet={<GitBranchIcon size={12} />} title="Esperando">
                <Text c="dimmed" size="sm">Estamos esperando a que {st.name} llegue al transporte.</Text>
            </Timeline.Item>

            <Timeline.Item bullet={<GitCommitIcon size={12} />} title="A Bordo">
                <Text c="dimmed" size="sm">{st.name} ya está a bordo y está esperando al resto de sus compañeros.</Text>
            </Timeline.Item>

            <Timeline.Item title="En camino" bullet={<GitPullRequestIcon size={12} />} lineVariant="dashed">
                <Text c="dimmed" size="sm">El transporte ya se encuentra en camino, {st.name} llegará pronto a su destino.</Text>
            </Timeline.Item>

            <Timeline.Item title="Ha llegado" bullet={<ChatCircleDotsIcon size={12} />}>
                <Text c="dimmed" size="sm">{st.name} ha bajado del transporte en su destino.</Text>
            </Timeline.Item>
        </Timeline>
    )
}

function IncidentCard({incident}: {incident: Incident}) {
    return (
        <>
            <Title>{incident.title}</Title>
        </>
    );
}

function RouteTracker(){
    let st: StudentStakeHolder = App.studentStakeholders[0]

    let trp = App.findTrips(st.students[0])[0]
    
    return (
        <Stack>
            <RouteCard trp={trp}/>
            <Title order={2}>Equipo de Transporte</Title>
            <TripPersonnel trp={trp}/>
            <Title order={2}>Estado de viaje</Title>
            <TripStatus trp={trp} st={st.students[0]}/>
            <Title order={2}>Incidentes</Title>
            {trp.incidents.map((incident: Incident, idx) => {
                return <IncidentCard key={idx} incident={incident}/>
            })}
        </Stack>
    )
}
export default RouteTracker