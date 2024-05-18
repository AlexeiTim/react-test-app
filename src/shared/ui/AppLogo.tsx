import { Flex, Text } from "@mantine/core";
import { LogoIcon } from "../icons/LogoIcon";

export const AppLogo = () => (
    <Flex gap={12} align="center">
        <LogoIcon />
        <Text c="#9854F6" fw={700} size="24px">ArrowFlicks</Text>
    </Flex>
)