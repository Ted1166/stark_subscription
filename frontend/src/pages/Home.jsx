import { Center, Grid, Image, Stack, Title } from '@mantine/core';
import React from 'react';

const Home = () => {
  return (
    <div>
      <Grid>
        <Grid.Col span={{ md: 6 }}>
          <Stack className='h-100' justify='center'>
            <Title>Adev</Title>
          </Stack>
        </Grid.Col>
        <Grid.Col span={{ md: 6 }}>
          <Image src={'/ui/Adev.png'} maw={'90%'} radius={'md'} />
        </Grid.Col>
      </Grid>
    </div>
  );
};

export default Home;
