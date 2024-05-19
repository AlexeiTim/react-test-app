import { Button, Divider, Flex, Modal, Rating, Text } from "@mantine/core"

interface Props {
    opened: boolean
    selectedRating: number
    title: string
    setSelectedRating: (value: number) => void
    close: () => void
    addToStorageFavoriteMovie: () => void
    removeRating: () => void
}

export const MovieRatingModal = ({ title, opened, selectedRating, close, setSelectedRating, addToStorageFavoriteMovie, removeRating }: Props) => {
    return (
        <Modal opened={opened} onClose={close} title="Your rating" centered>
            <div>
                <Divider />
                <div className="mt-4">
                    <Flex direction="column" gap={16}>
                        <Text fw={600} size="16px">{title}</Text>
                        <Rating count={10} size={28} value={selectedRating} onChange={setSelectedRating} />
                        <Flex>
                            <Button onClick={addToStorageFavoriteMovie} color="grape">Save</Button>
                            <Button onClick={removeRating} variant="transparent" color="grape">Remove rating</Button>
                        </Flex>
                    </Flex>
                </div>
            </div>
        </Modal>
    )
}