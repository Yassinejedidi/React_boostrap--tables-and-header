import React from 'react'
import { Button, Modal } from 'react-bootstrap';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import '../Styles/client.css';
import { AiOutlineUsergroupAdd, AiOutlineEye, AiOutlineEdit, AiOutlineDelete, AiOutlineSearch } from "react-icons/ai";




function Client() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [RowData, SetRowData] = useState([])
    const [ViewShow, SetViewShow] = useState(false)
    const handleViewShow = () => { SetViewShow(true) }
    const hanldeViewClose = () => { SetViewShow(false) }

    //Edit
    const [ViewEdit, SetEditShow] = useState(false)
    const handleEditShow = () => { SetEditShow(true) }
    const hanldeEditClose = () => { SetEditShow(false) }
    //Delete
    const [ViewDelete, SetDeleteShow] = useState(false)
    const handleDeleteShow = () => { SetDeleteShow(true) }
    const hanldeDeleteClose = () => { SetDeleteShow(false) }
    //ADD
    const [ViewPost, SetPostShow] = useState(false)
    const handlePostShow = () => { SetPostShow(true) }
    const hanldePostClose = () => { SetPostShow(false) }


    const [name, setname] = useState("")
    const [email, setemail] = useState("")
    const [number, setnumber] = useState("")
    const [nic, setnic] = useState("")
    const [adresse, setaddress] = useState("")
    const [id, setId] = useState("");
    const [Delete, setDelete] = useState(false)




    //for post

    const handleSubmite = () => {
        const url = 'http://localhost:5000/clients'

        const Credentials = { name, email, number, nic, adresse }
        axios.post(url, Credentials)

            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error.response)
            });
        console.log("jjjjj", handleSubmite)
        window.location.reload()
    }
    //for edit 
    const handleEdit = () => {
        const url = `http://localhost:5000/clients/${id}`
        const Credentials = { name, email, number, nic, adresse }
        axios.put(url, Credentials)
            .then(response => {
                console.log("response", response)


            })
            .catch(err => {
                console.log("erreur", err)
            })







    }
    //to delet a client with id
    const handleDelete = () => {
        const url = `http://localhost:5000/clients/${id}`
        axios.delete(url)
            .then(response => {
                const result = response.data;
                const { status, message } = result;
                if (status !== 'SUCCESS') {
                    alert(message, status)
                }
                else {
                    alert(message)
                }
            })
            .catch(err => {
                console.log(err)
            })
        window.location.reload()

    }


    //to get all the data and then i call it in useeffect
    const GetClient = async () => {
        setLoading(true);
        try {
            const { data: response } = await axios.get('http://localhost:5000/clients');
            setData(response);
            console.log(data, "hahhaha")
        } catch (error) {
            console.error(error.message);

        }
        setLoading(false);
    }
    //to refresh the page
    const refreshPage = () => {
        window.location.reload();
    }
    //double function to put it in a one button (multiple function in one click)
    const onClick = (event) => {
        refreshPage();
        handleEdit();
    }


    useEffect(() => {


        GetClient();
    }, []);
    //for the icon
    const style = {
        fontSize: "1.3em",


    }
    const table = {
        overflow: "auto",


    }

    //for the search bar
    const [query, setQuery] = useState("")

    return (
        <div>
            <div className='row'>
                <div className='mt-5 mb-4 '>
                    <div className='TT'>
                        <h3 id='tt'> Clients</h3>



                    </div>
                    <Button variant='primary ' className='button1' onClick={() => handlePostShow()}> Add new Client
                    </Button>

                    <input placeholder="Search" id='input' onChange={event => setQuery(event.target.value)} /><AiOutlineSearch id='II' />


                </div>
            </div>
            <div className='row'>
                <div className='table-responsive'>
                    <table className='table table-striped table-hover table-bordered  '  >
                        <thead>
                            <tr>
                                <th >Name</th>
                                <th>Email</th>
                                <th>Number</th>
                                <th>Cin</th>
                                <th>Address</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody >


                            {

                                data.filter(item => {
                                    if (query === '') {
                                        return item;
                                    } else if (item.name.toLowerCase().includes(query.toLowerCase())) {
                                        return item;
                                    }
                                }).map((item) =>


                                    <tr key={item._id}>
                                        <td>{item.name}</td>
                                        <td>{item.email}</td>
                                        <td>{item.number}</td>
                                        <td>{item.nic}</td>
                                        <td>{item.adresse}</td>
                                        <td style={{ minWidth: 190 }}>

                                            <Button id='bb' variant="btn btn-outline-success" onClick={() => { handleViewShow(SetRowData(item)) }}><AiOutlineEye style={style} /></Button>
                                            <Button id='bb' variant='btn btn-outline-primary' onClick={() => { handleEditShow(SetRowData(item), setId(item._id)) }} ><AiOutlineEdit style={style} /></Button>
                                            <Button id='bb' variant='btn btn-outline-danger' onClick={() => { handleViewShow(SetRowData(item), setId(item._id), setDelete(true)) }} ><AiOutlineDelete style={style} /></Button>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>

            </div>
            {/* the modal for the view*/}
            <div className='model-box-view'>
                <Modal
                    show={ViewShow}
                    onHide={hanldeViewClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>View Client Data</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <div className='form-group'>
                                <input type="text" className='form-control' value={RowData.name} readOnly />
                            </div>
                            <div className='form-group mt-3'>
                                <input type="email" className='form-control' value={RowData.email} readOnly />
                            </div>
                            <div className='form-group mt-3'>
                                <input type="text" className='form-control' value={RowData.number} readOnly />
                            </div>
                            <div className='form-group mt-3'>
                                <input type="text" className='form-control' value={RowData.nic} readOnly />
                            </div>
                            <div className='form-group mt-3'>
                                <input type="text" className='form-control' value={RowData.adresse} readOnly />
                            </div>
                            {
                                Delete && (
                                    <Button type='submit' className='btn btn-danger mt-4' onClick={handleDelete}>Delete Client</Button>
                                )
                            }


                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='secondary' onClick={hanldeViewClose}>Close</Button>
                    </Modal.Footer>
                </Modal>

            </div>
            {/* modal for submit data */}
            <div className='model-box-view'>
                <Modal
                    show={ViewPost}
                    onHide={hanldePostClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Add new Client</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <div className='form-group'>
                                <input type="text" className='form-control' onChange={(e) => setname(e.target.value)} placeholder="Please enter Name" />
                            </div>
                            <div className='form-group mt-3'>
                                <input type="email" className='form-control' onChange={(e) => setemail(e.target.value)} placeholder="Please enter email" />
                            </div>
                            <div className='form-group mt-3'>
                                <input type="text" className='form-control' onChange={(e) => setnumber(e.target.value)} placeholder="Please enter Number" />
                            </div>
                            <div className='form-group mt-3'>
                                <input type="text" className='form-control' onChange={(e) => setnic(e.target.value)} placeholder="Please enter Cin" />
                            </div>
                            <div className='form-group mt-3'>
                                <input type="text" className='form-control' onChange={(e) => setaddress(e.target.value)} placeholder="Please enter Address" />
                            </div>
                            <Button type='submit' className='btn btn-success mt-4' onClick={handleSubmite}>Add Client</Button>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='secondary' onClick={hanldePostClose}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>

            <div className='model-box-view'>
                <Modal
                    show={ViewPost}
                    onHide={hanldePostClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Add new Client</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <div className='form-group'>
                                <input type="text" className='form-control' onChange={(e) => setname(e.target.value)} placeholder="Please enter Name" />
                            </div>
                            <div className='form-group mt-3'>
                                <input type="email" className='form-control' onChange={(e) => setemail(e.target.value)} placeholder="Please enter email" />
                            </div>
                            <div className='form-group mt-3'>
                                <input type="text" className='form-control' onChange={(e) => setnumber(e.target.value)} placeholder="Please enter Number" />
                            </div>
                            <div className='form-group mt-3'>
                                <input type="text" className='form-control' onChange={(e) => setnic(e.target.value)} placeholder="Please enter cin" />
                            </div>
                            <div className='form-group mt-3'>
                                <input type="text" className='form-control' onChange={(e) => setaddress(e.target.value)} placeholder="Please enter Address" />
                            </div>
                            <Button type='submit' className='btn btn-success mt-4' onClick={handleSubmite}>Add Client</Button>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='secondary' onClick={hanldePostClose}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
            {/* the modal for the edit*/}
            <div className='model-box-view'>
                <Modal
                    show={ViewEdit}
                    onHide={hanldeEditClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Client</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <div className='form-group'>
                                <label>Name</label>
                                <input type="text" className='form-control' onChange={(e) => setname(e.target.value)} placeholder="Please enter Name" defaultValue={RowData.name} />
                            </div>
                            <div className='form-group mt-3'>
                                <label>Email</label>
                                <input type="email" className='form-control' onChange={(e) => setemail(e.target.value)} placeholder="Please enter email" defaultValue={RowData.email} />
                            </div>
                            <div className='form-group mt-3'>
                                <label>Number</label>
                                <input type="text" className='form-control' onChange={(e) => setnumber(e.target.value)} placeholder="Please enter Number" defaultValue={RowData.number} />
                            </div>
                            <div className='form-group mt-3'>
                                <label>Cin</label>
                                <input type="text" className='form-control' onChange={(e) => setnic(e.target.value)} placeholder="Please enter cin" defaultValue={RowData.nic} />
                            </div>
                            <div className='form-group mt-3'>
                                <label>Address</label>
                                <input type="text" className='form-control' onChange={(e) => setaddress(e.target.value)} placeholder="Please enter Address" defaultValue={RowData.adresse} />
                            </div>
                            <Button type='submit' className='btn btn-warning mt-4' onClick={onClick}>Edit Client</Button>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='secondary' onClick={hanldeEditClose}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    )
}

export default Client