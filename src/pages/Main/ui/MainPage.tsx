import { AppShell, Burger, Tabs, Text, Flex } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { defineCurrentTabName } from "../lib/define-current-tab-name";
import { LogoIcon } from "@/shared/icons/LogoIcon";

export const MainPage = () => {
    const navigate = useNavigate();
    const location = useLocation()
    const [opened, { toggle }] = useDisclosure();
    const [activeTab, setActiveTab] = useState<string | null>('movies');

    /** Необходимо, для установления активного таба после перезагрузки страницы */
    useEffect(() => {
        const activeTabName = defineCurrentTabName(location.pathname)
        setActiveTab(activeTabName)
    }, [])

    /** При клике на таб, изменяет активный таб и рендерит дочерний компонент маршрута */
    function handleChangeActiveTab(tabName: string | null): void {
        if (!tabName) return
        toggle()
        setActiveTab(tabName)
        navigate(tabName)
    }

    return (
        <AppShell
            header={{ height: { base: 40, sm: 0 } }}
            navbar={{
                width: 280,
                breakpoint: 'sm',
                collapsed: { mobile: !opened },
            }}
            padding="md"
        >
            <AppShell.Header className="bg-bg-nav">
                <Burger
                    opened={opened}
                    onClick={toggle}
                    hiddenFrom="sm"
                    size="sm"
                />
            </AppShell.Header>
            <AppShell.Navbar className="bg-bg-nav" p="md">
                <Flex direction="column" gap={80}>
                    <Flex gap={12} align="center">
                        <LogoIcon />
                        <Text c="#9854F6" fw={700} size="24px">ArrowFlicks</Text>
                    </Flex>
                    <Tabs color="grape" variant="pills" orientation="vertical" value={activeTab} onChange={handleChangeActiveTab} className="m-auto w-full">
                        <Tabs.List className="flex flex-col gap-4 w-full">
                            <Tabs.Tab value="movies" >
                                <Link to='/movies'>Movies</Link>
                            </Tabs.Tab>
                            <Tabs.Tab value="rated-movies">
                                <Link to='/rated-movies'>Rated movies</Link>
                            </Tabs.Tab>
                        </Tabs.List>
                    </Tabs>
                </Flex>
            </AppShell.Navbar>
            <AppShell.Main>
                <Flex align="center" justify="center" style={{ height: '100%' }}>
                    <Outlet />
                </Flex>
            </AppShell.Main>
        </AppShell>
    )
}
