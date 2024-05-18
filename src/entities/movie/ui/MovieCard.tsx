import { Button, Divider, Flex, Image, Modal, Paper, Rating, Text } from "@mantine/core";
import { useNavigate } from "react-router-dom"
import { useDisclosure } from "@mantine/hooks";
import image from '@/app/assets/imgs/image.png'

export const MovieCard = () => {
    const [opened, { open, close }] = useDisclosure(false);

    const navigate = useNavigate()


    function handleGoToMovieDetail(id: number) {
        navigate(`/movies/${id}`)
    }

    return (
        <div>
            <Paper p={24} radius="lg">
                <Flex gap={16} direction={{ base: 'column', sm: 'row' }}>
                    <Image src={image} onClick={() => handleGoToMovieDetail(1)} className="cursor-pointer" />
                    <Flex justify="space-between" className="w-full">
                        <Flex direction="column" justify="space-between">
                            <Flex direction="column" gap={8}>
                                <Text c='#9854F6' fw={700} size="20px">The Green Mile</Text>
                                <Text c='#7B7C88' size="16px">1999</Text>
                                <Flex gap={8} align="center">
                                    <Flex gap={4} align="center">
                                        <Rating size={28} count={1} />
                                        <Text fw={700}>9.3</Text>
                                    </Flex>
                                    <Text c='#7B7C88'>(2.9M)</Text>
                                </Flex>
                            </Flex>
                            <Text size="16px">
                                <Flex gap={8}>
                                    <span className="text-[#7B7C88]">Genres</span>
                                    <span>Drama, Crime, Fantasy</span>
                                </Flex>
                            </Text>
                        </Flex>
                        <Rating count={1} size={28} onClick={open} />
                    </Flex>
                </Flex>
            </Paper>
            <Modal opened={opened} onClose={close} title="Your rating" centered>
                <div>
                    <Divider />
                    <div className="mt-4">
                        <Flex direction="column" gap={16}>
                            <Text fw={600} size="16px">Coco</Text>
                            <Rating count={10} size={28} />
                            <Flex>
                                <Button color="grape">Save</Button>
                                <Button variant="transparent" color="grape">Remove rating</Button>
                            </Flex>
                        </Flex>
                    </div>
                </div>
            </Modal>
        </div>
    )
}