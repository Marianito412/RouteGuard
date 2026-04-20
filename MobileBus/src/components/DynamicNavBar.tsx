import {type ReactNode, useState} from "react";
import {NavLink, Title} from "@mantine/core";

export type NavBarItem = {
    id: string;
    label: string;
    icon: ReactNode;
    component: ReactNode;
}

export function DynamicNavBar({items, onElementSelected}: {items: NavBarItem[], onElementSelected: (item: NavBarItem) => void}) {
    let [active, setActive] = useState(0);

    const NavBarLinks = items.map((item, i) => {
        return(
            <NavLink
                label={<Title order={5}>{item.label}</Title>}
                active={i === active}
                leftSection={item.icon}
                key={item.id}
                variant="filled"
                onClick={() => {
                    setActive(i)
                    onElementSelected(item)
                }}
            />
        );
    })
    return <>{NavBarLinks}</>;
}