import React from 'react'
import { useState } from 'react'

function InputUser() {
   
    const [data,setData] = useState(
        {
            Runtime:""
        }
    )


    const HandleChange=(e)=>{
        setData({Runtime:e.target.value})
        console.log(data.Runtime)
    }


  return (
      <>
      {/* {data} */}
     <input type="text" onKeyUp={HandleChange} />
     {data.Runtime}
     </>
  )
}

export default InputUser