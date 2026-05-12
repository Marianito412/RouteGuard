import {useState} from "react";
import {useDisclosure} from "@mantine/hooks";
import {AppShell, Burger, Group} from "@mantine/core";
import {HouseIcon, StudentIcon} from "@phosphor-icons/react"
import {DynamicNavBar, type NavBarItem} from "../components/DynamicNavBar.tsx";
import TripSchedule from "../components/parent/TripSchedule.tsx";
import RouteTracker from "../components/parent/RouteTracker.tsx";

const myItems: NavBarItem[] = [
    { id: "schedule", label: "Schedule", icon: <HouseIcon/>, component: <TripSchedule/> },
    { id: "routeGuard", label: "Route Guard", icon: <StudentIcon />, component: <RouteTracker/> },
];

function ParentPage(){
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
                    RouteGuard - Parent
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

export default ParentPage