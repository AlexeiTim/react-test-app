import { Button, Flex, Image, Text } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import EmptyRatedImage from '@/app/assets/imgs/EmptyRatedImage.png'

export const RatedEmpty = () => {
    const navigate = useNavigate()

    function handleGoToMovies() {
        navigate('/movies')
    }

    return (
        <Flex
            className="h-[90vh]"
            align="center"
            justify="center"
        >
            <div>
                <Image
                    src={EmptyRatedImage}
                    className=" w-[400px] h-[300px] my-[auto]"
                />
                <Flex
                    direction="column"
                    gap={16}
                >
                    <Text
                        className="text-center"
                        fw={700}
                        size="20px"
                    >
                        You haven't rated any films yet
                    </Text>
                    <Flex justify="center">
                        <Button
                            className="text-center"
                            color="grape"
                            onClick={handleGoToMovies}
                        >
                            Find movies
                        </Button>
                    </Flex>
                </Flex>
            </div>
        </Flex>
    )
} 