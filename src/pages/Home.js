'use client'

import Header from '../components/Header'
import TemplateCards from '../components/ProductCards'
import Footer from '../components/Footer'

const Home = ({ isLogged, setIsLogged, user, setProduct, setSiteId }) => {

  return (
    <div>
      <Header isLogged={isLogged} setIsLogged={setIsLogged} user={user} />
      <TemplateCards isLogged={true} setProduct={setProduct} setSiteId={setSiteId}/>
      <Footer />
    </div>
  )
}

export default Home;
