import {
    Card,
    Group,
    Space,
    Stack,
    Text,
    Timeline,
    Title,
    ActionIcon,
    Scroller,
    Avatar,
    Badge,
    Modal, Tabs
} from "@mantine/core";
import {ChatCircleDotsIcon, GitBranchIcon, GitCommitIcon, GitPullRequestIcon, PhoneCallIcon, WhatsappLogoIcon} from "@phosphor-icons/react";
import {App} from "../../core/Application.ts";
import {Employee, Student, type StudentStakeHolder} from "../../core/Users.ts";
import {Incident, type Trip} from "../../core/Trips.ts";
import {useState} from "react";

function RouteCard({trp}: {trp: Trip}) {
    let nextStopName = trp.route?.stops[trp.currentStop+1]
    
    return (
        <Card orientation="horizontal" display="flex" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
            <Stack align="flex-start" gap="xs">
                <Title order={3}>{trp.route?.name}</Title>
                <Text size="sm" c="blue">Llegando en 6 minutos</Text>
            </Stack>
            
            <Space w="md"/>
            
            <Stack align="flex-end" gap="xs">
                <Title ta="right" order={3}>Próxima Parada</Title>
                <Text ta="right" size="sm" c="dimmed">{nextStopName || "El viaje terminó"}</Text>
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

function TripStatus({trp, st}: { trp: Trip, st: Student }) {
    const info = trp.students.find((s) => {
        return s.student.name == st.name
    })
    const missedBus = App.hasStudentMissedBus(trp, st);

    let state: number = 0;
    if (info?.status === "Present") {
        state = 1;
    }
    if (trp.currentStop > 0) {
        state = 2;
    }
    if (trp.route) {
        let idx = trp.route.stops.findIndex((stp) => stp === info?.stop);
        if (idx >= trp.currentStop) {
            state = 3;
        }
    }

    return (
        <>
            {missedBus ?
                <Timeline active={state} bulletSize={24} lineWidth={2} color={missedBus ? "red" : "blue"}>
                    <Timeline.Item bullet={<GitBranchIcon size={12}/>} title="Ausente">
                        <Text c="dimmed" size="sm">
                            {st.name} no abordó el transporte a tiempo.
                        </Text>
                    </Timeline.Item>
                </Timeline>
                :
                <Timeline active={state} bulletSize={24} lineWidth={2} color={missedBus ? "red" : "blue"}>
                    <Timeline.Item bullet={<GitBranchIcon size={12}/>} title="Esperando">
                        <Text c="dimmed" size="sm">
                            {missedBus
                                ? "${st.name} no abordó el transporte a tiempo."
                                : "Estamos esperando a que ${st.name} llegue al transporte."}
                        </Text>
                    </Timeline.Item>
                    <Timeline.Item bullet={<GitCommitIcon size={12}/>} title="A Bordo">
                        <Text c="dimmed" size="sm">{st.name} ya está a bordo y está esperando al resto de sus
                            compañeros.</Text>
                    </Timeline.Item>

                    <Timeline.Item bullet={<GitPullRequestIcon size={12}/>} title="En camino">
                        <Text c="dimmed" size="sm">El transporte ya se encuentra en camino, {st.name} llegará pronto a
                            su destino.</Text>
                    </Timeline.Item>

                    <Timeline.Item bullet={<ChatCircleDotsIcon size={12}/>} title="Ha llegado">
                        <Text c="dimmed" size="sm">{st.name} ha bajado del transporte en su destino.</Text>
                    </Timeline.Item>
                </Timeline>
            }
        </>
    )
}

function IncidentCard({incident}: {incident: Incident}) {
    const [opened, setOpened] = useState(false);
    
    const getColor = (severity: string) => {
        switch (severity) {
            case "Low":
                return "lime"
            case "Medium":
                return "yellow"
            case "High":
                return "red"
        }
    }
    
    return (
        <>
            <Modal title={
                <Group>
                    <Title order={3}>{incident.title}</Title>
                    <Badge color={getColor(incident.severity)}>{incident.severity}</Badge>
                </Group>
            }
                   opened={opened} onClose={() => setOpened(false)}>
                <Text>{incident.description}</Text>
            </Modal>
            <Card onClick={() => setOpened(true)} style={{cursor: 'pointer'}}>
                <Group justify="space-between">
                    <Title order={4}>{incident.title}</Title>
                    <Badge color={getColor(incident.severity)}>{incident.severity}</Badge>
                </Group>
                <Text c="dimmed" lineClamp={1}>{incident.description}</Text>
            </Card>
        </>
    );
}

function RouteTracker(){
    let st: StudentStakeHolder = App.studentStakeholders[0]

    //let trp = App.employees[0].trips[0]//App.findTrips(st.students[0])[0]
    
    const students = st.students
    
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
        <Space h="md" />
            {
                students.map((std) => {
                    const myTrp = App.findTrips(std)[0]
                    
                    return (myTrp != undefined ? 
                        <Tabs.Panel value={std.name} key={std.name}>
                        <Stack>
                            <RouteCard trp={myTrp}/>
                            <Title order={2}>Equipo de Transporte</Title>
                            <TripPersonnel trp={myTrp}/>
                            <Title order={2}>Estado de viaje</Title>
                            <TripStatus trp={myTrp} st={st.students[0]}/>
                            <Title order={2}>Incidentes</Title>
                            {myTrp.incidents.map((incident: Incident, idx) => {
                                return <IncidentCard key={idx} incident={incident}/>
                            })}
                        </Stack>
                        </Tabs.Panel> 
                            : <Tabs.Panel value={std.name} key={std.name}><Title>No trip found</Title></Tabs.Panel>
                    )
                })
            }
        </Tabs>
        
    )
}
export default RouteTracker