import { AppShell, Tabs } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { defineCurrentTabName } from "../lib/define-current-tab-name";

export const MainPage = () => {
    const navigate = useNavigate();
    const location = useLocation()
    const [opened] = useDisclosure();
    const [activeTab, setActiveTab] = useState<string | null>('movies');

    /** Необходимо, для установления активного таба после перезагрузки страницы */
    useEffect(() => {
        const activeTabName = defineCurrentTabName(location.pathname)
        setActiveTab(activeTabName)
    }, [])

    /** При клике на таб, изменяет активный таб и рендерит дочерний компонент маршрута */
    function handleChangeActiveTab(tabName: string | null): void {
        if (!tabName) return

        setActiveTab(tabName)
        navigate(tabName)
    }

    return (
        <AppShell
            navbar={{
                width: 280,
                breakpoint: 'sm',
                collapsed: { mobile: !opened },
            }}
            padding="md"
        >
            <AppShell.Navbar className="bg-bg-nav">
                <div>Icon ArrowFlicks</div>
                <Tabs color="grape" variant="pills" orientation="vertical" value={activeTab} onChange={handleChangeActiveTab}>
                    <Tabs.List>
                        <Tabs.Tab value="movies" >
                            <Link to='/movies'>Movies</Link>
                        </Tabs.Tab>
                        <Tabs.Tab value="rated-movies">
                            <Link to='/rated-movies'>Rated movies</Link>
                        </Tabs.Tab>
                    </Tabs.List>
                </Tabs>
            </AppShell.Navbar>
            <AppShell.Main>
                <Outlet />
            </AppShell.Main>
        </AppShell>
    )
}
