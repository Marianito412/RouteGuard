import {useState} from "react";
import {useDisclosure} from "@mantine/hooks";
import {AppShell, Burger, Group} from "@mantine/core";
import {HouseIcon, StudentIcon} from "@phosphor-icons/react"
import {DynamicNavBar, type NavBarItem} from "../components/DynamicNavBar.tsx";
import {RoutTracking} from "../components/RouteTracking.tsx";
import IncidentReport from "../components/IncidentReport.tsx";

const myItems: NavBarItem[] = [
    { id: "home", label: "Home", icon: <HouseIcon/>, component: <RoutTracking/> },
    { id: "incidentReport", label: "Incident Report", icon: <StudentIcon />, component: <IncidentReport/> },
];

function AppShellBase(){
    const [opened, { toggle }] = useDisclosure();
    let [mainComp, setMainComp] = useState(myItems[0].component);
    
    return (
        <AppShell
            padding="md"
            header={{ height: { base: 60, md: 70, lg: 80 } }}
            navbar={{
                width: 300,
                breakpoint: 'sm',
                collapsed: { mobile: !opened },
            }}
        >
            <AppShell.Header>
                <Group h="100%" px="md">
                    <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
                    Header
                </Group>
            </AppShell.Header>

            <AppShell.Navbar p="md">
                <DynamicNavBar items={myItems} onElementSelected={item => {
                    setMainComp(item.component);
                    toggle();
                }}/>
            </AppShell.Navbar>
            
            <AppShell.Main>
                {mainComp}
            </AppShell.Main>
        </AppShell>
    );
}

export default AppShellBase