import React from 'react'
import { AppShell, Button, Container, Group, Image, MantineProvider, Title, createTheme } from '@mantine/core';
import { Link } from 'react-router-dom';
import { useAppContext } from '../providers/AppProvider';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';

const theme = createTheme({
    /** Put your mantine theme override here */
});

const MantineLayout = (props) => {
    const { children } = props
    const { address, connection, handleConnetWalletBtnClick, contract } = useAppContext()

    return (
        <MantineProvider defaultColorScheme='dark' theme={theme} forceColorScheme='dark'>
            <Notifications />
            <ModalsProvider>
                <AppShell header={{ height: 80 }}>
                    <AppShell.Header >
                        <Group px={"lg"} className='h-100' justify='space-between'>
                            <Group>
                                <Image src={'/ui/Ade.png'} mah={'60px'} radius={'md'} />
                                <Title fw={500}>ADEV</Title>
                            </Group>
                            <Group className='h-100' justify='right'>
                                <Button variant='light' component={Link} to={'/'} radius={"md"} size='md'>Home</Button>
                                <Button variant='light' component={Link} to={'/subscription_channel'} radius={"md"} size='md'>Subscription Channel</Button>
                                <Button variant='light' component={Link} to={'/add-package'} radius={"md"} size='md'>Add Package</Button>
                                <Button variant='light' component={Link} to={'/history'} radius={"md"} size='md'>History</Button>
                                {
                                    connection ?
                                        <Button radius={"xl"} onClick={handleConnetWalletBtnClick}>Disconnect wallet</Button>
                                        :
                                        <Button radius={"xl"} color='green' onClick={handleConnetWalletBtnClick}>Connect wallet</Button>
                                }
                            </Group>
                        </Group>
                    </AppShell.Header>
                    <AppShell.Main>
                        {
                            !connection ? "Connect wallet to proceed" : (
                                <Container size={'xl'} py={'lg'}>
                                    {children}
                                </Container>
                            )
                        }
                    </AppShell.Main>
                </AppShell>
            </ModalsProvider>
        </MantineProvider>
    )
}

export default MantineLayout