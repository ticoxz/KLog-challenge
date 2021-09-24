import React, { useState } from 'react';
import Image from "next/image";
import { getQueryPhotos } from '../apikey/api';

import Head from "next/head";
import {
  Box,
  Container,
  Text,
  Wrap,
  WrapItem,
  Input,
  IconButton,
  InputRightElement,
  InputGroup,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
export default function Home({ data }) {

  // Creamos el estado para meter la data del UNSPLASH API
  const [photos, setPhotos] = useState(data)

  //----------------------------------



  // Definimos nuevos estados para el SearchQUery
  const [query, setQuery] = useState("")

  const handleSubmit = async (e) => {
    await e.preventDefault();
    const res = await getQueryPhotos(query);
    await setPhotos(res);
    await setQuery("");

  }

  const handleChange = (e) => {
    setQuery(e.target.value)
  }





  return (
    <div>
      <Head>
        <title> Klog - Challenge</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box overflow="hidden" bg="black" minH="100vh">
        <Container>
          <Text
            color="#FFFF01"
            fontWeight="semibold"
            mb="1rem"
            textAlign="center"
            textDecoration="none"
            fontSize={["4xl", "4xl", "5xl", "5xl"]}
          >
            KLog Gallery
          </Text>
          <form onSubmit={handleSubmit}>
            <InputGroup pb="1rem">
              <Input placeholder="Busca una imagen" variant="ghost" value={query}
                onChange={e => handleChange(e)} />
            </InputGroup>
          </form>
        </Container>
        <Wrap m="2rem" spacing={4} justify="center">
          {
            photos?.map((photo) => (
              <WrapItem
                key={photo.urls.id}
                boxShadow="base"
                rounded="20px"
                overflow="hidden"
                bg="black"
                lineHeight="0"
              >
                <Image src={photo.urls.regular} width={400} height={600} alt={photo.urls.description} />
              </WrapItem>
            ))
          }
        </Wrap>
      </Box>
    </div>
  );
}

export const getStaticProps = async () => {

  const response = await fetch(
    `https://api.unsplash.com/photos?client_id=${process.env.NEXT_PUBLIC_CLIENT_ID}&per_page=10&page=1`
  );
  const data = await response.json();

  return {
    props: { data, },
  };
};


// export const getQueryPhotos = async (query) => {
//   const response = await fetch(
//     `https://api.unsplash.com/search/photos?page=1&per_page=20&client_id=${query}`
//   );
//   const result = await response.json();
//   return {
//     props: { search: result },
//   }
// }

