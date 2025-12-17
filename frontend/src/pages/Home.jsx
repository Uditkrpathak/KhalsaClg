import React from 'react'
import ImageCarousel from '../components/ui/ImageCarousel'
import { carouselData } from '../layouts/data/Carousel'


const Home = () => {
  return (
    <div>
      <ImageCarousel data={carouselData} />
    </div>
  )
}

export default Home
