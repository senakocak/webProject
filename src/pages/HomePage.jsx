import React from 'react'
import {Link} from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'

function HomePage() {
  return (
    <MainLayout>
        <div className='shadow-sm p-4 mb-5 bg-white rounded'>
            <h1>Hoş geldiniz!</h1>
            <Link to='/pos' className='btn btn-warning'>Sisteme giriş yapmak için tıklayınız</Link>
        </div>        
    </MainLayout>
  )
}

export default HomePage
