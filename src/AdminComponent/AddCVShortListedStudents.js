import React,{useState} from 'react'

const style = {
    position:'fixed',
    backgroundColor:'white',
    top:'0',
    left: '50%',
    transform: 'translate(-50%, 0)',
    width:'100%',
    maxWidth:'500px',
    maxHeight: '500px',
    overflow: 'auto'
}

const AddCVShortListedStudents = ({studentList, batchCode, onAdd, onClose})=>{
    const [selectedStudents, setSelectedStudents] = useState([])
    const [selectAll, setSelectAll] = useState(false)

    const handleSelect = (id)=>{
        setSelectedStudents((prev)=>[...prev, id])
    }

    const handleDeselect = (id)=>{
        setSelectedStudents((prev)=>prev.filter((i)=>i !== id))
    }

    return (
        <div className='rounded rounded-1 p-4' style={style}>
            <h2 className='h4 pb-1' style={{fontWeight:500}}>Select to Add Students</h2>
            <hr className='my-0 pb-3'/>
            <div className="table-responsive">
                <table class="table table-bordered table-gen">
                    <thead>
                        <tr>
                            <th>Select</th>
                            <th>Student Name</th>
                            <th>Batch Code</th>
                        </tr>
                    </thead>
                    <tbody>
                        {studentList
                            .map((row)=>(
                            <tr key={row.Student_Id}>
                                <td>
                                    <input type='checkbox' className='' checked={selectedStudents.includes(row.Student_Id) || selectAll}
                                    onChange={(e)=>{
                                        if(e.target.checked){
                                            handleSelect(row.Student_Id)
                                        }else{
                                            handleDeselect(row.Student_Id)
                                        }
                                    }}/>
                                </td>
                                <td>{row.Student_Name}</td>
                                <td>{batchCode}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className='d-flex justify-content-center align-items-center'>
                <div className='form-group d-flex mb-0 mr-3 align-items-center'>
                    <input type='checkbox' id='selectAllInput' className=' mr-2'
                        checked={selectAll} 
                        onChange={(e)=>{
                            if(e.target.checked){
                                setSelectAll(true)
                            }else{
                                setSelectAll(false)
                            }
                        }}
                    />
                    <label htmlFor='selectAllInput' className='mb-0'>Select All</label>
                </div>
                <button className='btn btn-primary' onClick={()=>{
                    onAdd(selectAll, selectedStudents)
                    onClose()
                    setSelectAll(false)
                    setSelectedStudents([])
                }}>
                    Add
                </button>
            </div>
        </div>
    )
}

export default AddCVShortListedStudents