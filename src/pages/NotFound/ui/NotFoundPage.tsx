import { Button, Flex, Image, Text } from "@mantine/core";
import { Link } from "react-router-dom";
import NotFoundImage from '@/app/assets/imgs/NotFoundImage.png'
import { AppLogo } from "@/shared/ui/AppLogo";

export const NotFoundPage = () => (
    <div className="p-6">
        <div>
            <AppLogo />
        </div>
        <Flex className="h-[90vh]" direction="column" align="center" justify="center" gap={48}>
            <Image src={NotFoundImage} className="w-[490px]" />
            <Flex direction="column" gap={16}>
                <Text fw={700} size='20px'>We can’t find the page you are looking for</Text>
                <Flex justify="center">
                    <Button component={Link} to='/' color="grape">Go home</Button>
                </Flex>
            </Flex>
        </Flex>
    </div>
)