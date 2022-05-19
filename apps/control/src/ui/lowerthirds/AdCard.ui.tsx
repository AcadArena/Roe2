import {
  ActionIcon,
  Box,
  Card,
  Group,
  Menu,
  Stack,
  Text,
  Title,
  Tooltip,
} from "@mantine/core"
import { useToggle } from "@mantine/hooks"
import { Ad } from "interface/ws/Live.interface"
import { FC } from "react"
import { Eye, EyeOff, Pencil } from "tabler-icons-react"
import { adjImageStyles, defaultAdjImage } from "utils/general"
import AdModal from "./AdModal.ui"

interface AdCardProps {
  ad: Ad
}
const AdCard: FC<AdCardProps> = ({ ad }) => {
  const [preview, togglePreview] = useToggle(false, [false, true])
  const [open, toggler] = useToggle(false, [false, true])
  const toggle = () => toggler()
  const close = () => toggler(false)
  return (
    <Card sx={{ overflow: "visible" }}>
      <Group spacing={5} sx={{ position: "absolute", top: 10, right: 10 }}>
        <Tooltip label="Preview" withArrow>
          <ActionIcon onClick={() => togglePreview()}>
            {preview ? <EyeOff size={18} /> : <Eye size={18} />}
          </ActionIcon>
        </Tooltip>
        <Menu>
          <Menu.Item onClick={toggle} icon={<Pencil size={18} />}>
            Edit
          </Menu.Item>
        </Menu>
      </Group>
      <Group noWrap align="center">
        <Box
          {...adjImageStyles(
            preview
              ? ad.image
              : {
                  ...defaultAdjImage,
                  URL: ad.image.URL,
                  BASE64: ad.image.BASE64,
                }
          )}
        />
        <Stack spacing={4}>
          <Title
            order={4}
            sx={{
              fontSize: preview ? ad.headline.size || "inherit" : "inherit",
              lineHeight: 1,
            }}
          >
            {ad.headline.text}
          </Title>
          <Text
            sx={{
              fontSize: preview ? ad.body.size || "inherit" : "inherit",
              lineHeight: 1,
            }}
            lineClamp={3}
          >
            {ad.body.text}
          </Text>
        </Stack>
      </Group>
      <AdModal ad={ad} opened={open} onClose={close} />
    </Card>
  )
}

export default AdCard