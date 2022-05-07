import React from 'react'

function Map() {
  const data=[{
      id:1,
      firstName:"yash vani",
      email:"yashvani1305@gmail.com"
  }]
 
  return (
    <div>
        {
            data.map((value)=>{
                return (<>
                   {value.id}
                   {value.firstName}
                   {value.email}
                </>)
            })
        }
    </div>
  )
}

export default Map