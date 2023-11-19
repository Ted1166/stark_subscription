import { Center, Grid, Image, Stack, Title } from '@mantine/core';
import React from 'react';
import { Text } from '@mantine/core';

const Home = () => {
  return (
    <div>
      <Grid>
      <Grid.Col span={{ md: 6 }}>
          <Image src={'/ui/Adev.png'} maw={'90%'} radius={'md'} />
        </Grid.Col>
      
        <Grid.Col span={{ md: 6 }}>
          <Stack className='h-100' justify='center' fz='sm'>
            <h1 >Welcome to ADEV FUNTIME - Your Gateway to Endless Entertainment! 
              Subscribe to an array of captivating channels curated by talented content creators. 
              Dive into a world of diverse content, from thrilling adventures to insightful discussions. 
              Discover, subscribe, and immerse yourself in a universe of entertainment tailored just for 
              you. Join ADEV FUNTIME today and embark on an exhilarating journey of endless discovery!</h1>
          </Stack>
        </Grid.Col>
      </Grid>
    </div>
  );
};

export default Home;
