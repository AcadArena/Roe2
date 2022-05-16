import {
  Popover,
  PopoverProps,
  Stack,
  Text,
  Group,
  Button,
  ButtonProps,
} from "@mantine/core"
import { useToggle } from "@mantine/hooks"
import { FC, useState } from "react"

interface ConfirmProps extends Omit<PopoverProps, "target" | "opened"> {
  onConfirm: VoidFunction
  message?: string
  ButtonProps?: ButtonProps<"button">
}
const Confirm: FC<ConfirmProps> = ({
  children,
  onConfirm,
  message,
  ButtonProps,
  ...props
}) => {
  const [opened, toggle] = useToggle(false, [false, true])
  const close = () => toggle(false)
  const clickToggle = () => toggle()

  const confirm = async () => {
    close()
    onConfirm()
  }
  return (
    <Popover
      opened={opened}
      onClose={close}
      withCloseButton
      title="Hey wait!"
      position="top"
      withArrow
      transition="pop"
      {...props}
      target={<div onClick={clickToggle}>{children}</div>}
    >
      <Stack sx={{ maxWidth: 300 }}>
        <Text size="sm">{message || "Are you sure?"}</Text>
        <Group position="apart">
          <Button {...ButtonProps} onClick={confirm}>
            Confirm
          </Button>
        </Group>
      </Stack>
    </Popover>
  )
}

export default Confirm
