import React from 'react'
import { Box, Button, Card, Grid, Group, NumberInput, TextInput, Title } from "@mantine/core"
import { useForm } from '@mantine/form';
import { useAppContext } from '../providers/AppProvider';
import { showNotification } from '@mantine/notifications';
import { IconAlertTriangle, IconPlus } from "@tabler/icons-react"
import { contract } from '../config/config';

const AddPackage = () => {

  // const { contract } = useAppContext()

  const form = useForm({
    initialValues: {
      title: "",
      price: "",
      channels: 0
    },
    validate: {
      title: value => value === "" ? "Title is required" : null,
      price: value => value === "" ? "Price is required" : null,
      channels: value => value === 0 ? "Enter the no. of channels" : null,
    }
  })

  // key:u128, sub_package : felt252, channels : felt252, price : u128
  const handleCreatePackage = async () => {
    if (contract) {
      const calldata = [form.values.title, form.values.channels, form.values.price]
      const mycall = contract.populate("add_package", calldata)
      try {
        const res = await contract.add_package(mycall.calldata)
        showNotification({
          title: "Success!",
          message: "Added package successfully",
          color: "green",
          icon: <IconAlertTriangle />
        })
      } catch (e) {
        showNotification({
          title: "Failed!",
          message: "Could not add package",
          color: "red",
          icon: <IconAlertTriangle />
        })
      }
    }
  }

  return (
    <div>
      <Card radius={"lg"}>
        <Title fw={500} size={45}>Add new Package</Title>
        <form onSubmit={form.onSubmit(values => handleCreatePackage())}>
          <Grid>
            <Grid.Col span={{ xs: 12 }}>
              <TextInput label="Package Title" placeholder='Best package' {...form.getInputProps('title')} radius={'md'} />
            </Grid.Col>
            <Grid.Col span={{ xs: 6 }}>
              <NumberInput hideControls label="Price" placeholder='2,500' {...form.getInputProps('price')} radius={'md'} />
            </Grid.Col>
            <Grid.Col span={{ xs: 6 }}>
              <NumberInput hideControls label="No. of Channels" placeholder='100' {...form.getInputProps('channels')} radius={'md'} />
            </Grid.Col>
          </Grid>
          <Box mt="lg">
            <Button leftSection={<IconPlus />} type='submit'>Add package</Button>
          </Box>
        </form>
      </Card>
    </div>
  )
}

export default AddPackage