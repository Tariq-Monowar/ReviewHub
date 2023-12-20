import { useEffect, useState } from 'react'
import { useFirebase } from '../../context/Firebase'
import './home.css'
import SeparateData from '../../components/separateData/SeparateData'

const Home = () => {
  const [dataList, setDataList] = useState([])
  const firebase = useFirebase()
 useEffect(() => {
  firebase.getData().then(data=>setDataList(data.docs))
 }, [])

 const handleDeleteData = (id) => {
  // Handle the deletion logic or any other action you want with the id
  console.log(id);
  const filteredResult = dataList.filter((item) => item.id !== id);
  setDataList(filteredResult);
};

  return (
    <div className='userDataContainer'>
           {
        dataList &&
        dataList.map(item=>{
          
          return <div className='showUserData' key={item.id}>
              <SeparateData onDeleteData={() => handleDeleteData(item.id)} id={item.id} {...item.data()}/>
            </div>
        })
      }
    </div>
  )
}

export default Home