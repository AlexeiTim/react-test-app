import { Flex, Text } from "@mantine/core";
import { LogoIcon } from "../icons/LogoIcon";
import { useNavigate } from "react-router-dom";

export const AppLogo = () => {
    const navigate = useNavigate()

    function handleGoToMain() {
        navigate('/')
    }
    return (
        <Flex onClick={handleGoToMain} gap={12} align="center" className="cursor-pointer">
            <LogoIcon />
            <Text c="#9854F6" fw={700} size="24px">ArrowFlicks</Text>
        </Flex>
    )
}