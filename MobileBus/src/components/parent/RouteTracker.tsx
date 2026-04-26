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
    Avatar
} from "@mantine/core";
import {
    ChatCircleDotsIcon,
    GitBranchIcon,
    GitCommitIcon,
    GitPullRequestIcon,
    PhoneCallIcon, WhatsappLogoIcon
} from "@phosphor-icons/react";

function RouteCard(){
    return (
        <Card orientation="horizontal" display="flex" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
            <Stack align="flex-start" gap="xs">
                <Title order={3}>Ruta Escolar A-7</Title>
                <Text size="sm" c="blue">Llegando en 6 minutos</Text>
            </Stack>
            
            <Space w="md"/>
            
            <Stack align="flex-end" gap="xs">
                <Title ta="right" order={3}>Próxima Parada</Title>
                <Text ta="right" size="sm" c="dimmed">Av. Las Palmas 402</Text>
            </Stack>
        </Card>
    )
}

function PersonnelCard(){
    return(
        <Card w="fit-content">
            <Avatar mx="auto" size={60} src={null} alt="no image here"/>
            <Title mx="auto" ta="center" textWrap="balance" order={5}>José Miguel</Title>
            <Text mx="auto" ta="center" mb={6} c="dimmed" size="sm">Chofer</Text>
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

function TripPersonnel(){
    return (
        <Scroller draggable>
            <Group wrap="nowrap" justify="center">
                <PersonnelCard/>
                <PersonnelCard/>
                <PersonnelCard/>
                <PersonnelCard/>
            </Group>
        </Scroller>
    )
}

function TripStatus(){
    return (
        <Timeline active={1} bulletSize={24} lineWidth={2}>
            <Timeline.Item bullet={<GitBranchIcon size={12} />} title="Esperando">
                <Text c="dimmed" size="sm">Estamos esperando a que Mateo llegue al transporte.</Text>
            </Timeline.Item>

            <Timeline.Item bullet={<GitCommitIcon size={12} />} title="A Bordo">
                <Text c="dimmed" size="sm">Mateo ya está a bordo y está esperando al resto de sus compañeros.</Text>
            </Timeline.Item>

            <Timeline.Item title="En camino" bullet={<GitPullRequestIcon size={12} />} lineVariant="dashed">
                <Text c="dimmed" size="sm">El transporte ya se encuentra en camino, Mateo llegará pronto a su destino</Text>
            </Timeline.Item>

            <Timeline.Item title="Arribado" bullet={<ChatCircleDotsIcon size={12} />}>
                <Text c="dimmed" size="sm">Mateo ha bajado del transporte en su destino</Text>
            </Timeline.Item>
        </Timeline>
    )
}

function RouteTracker(){
    return (
        <Stack>
            <RouteCard/>
            <Title order={2}>Equipo de Transporte</Title>
            <TripPersonnel/>
            <Title order={2}>Estado de viaje</Title>
            <TripStatus/>
            <Title order={2}>Incidentes</Title>
        </Stack>
    )
}
export default RouteTracker