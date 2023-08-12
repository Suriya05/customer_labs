import React, { useState, useImperativeHandle } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import styled from "styled-components";
import { segmentSchemaOptions } from "../../constants/index.js";
import { nanoid } from "nanoid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from 'react-toastify';

import axios from 'axios';

const Segment = (props, ref) => {
    const [segmentName, setSegmentName] = useState("");
    const [schema, setSchema] = useState([ { id: nanoid(), key: "", value: "" } ]);      

    const segmentSchemaList = Object.entries(segmentSchemaOptions);

    useImperativeHandle(ref, 
        () => ({
            saveSegment(){
                handleSave();
            }
        })
    );

    const handleSave = async () => {
        if(segmentName === ""){
            toast.error("Please enter a valid segment name.", {
                position: toast.POSITION.TOP_RIGHT
            });
            return false;
        }
        const schemaStructure = schema.map((schemaData) => {
            return {
                [schemaData.key] : schemaData.value
            }
        })
        const segment = {
            segment_name: segmentName,
            schema:  schemaStructure,
        }
        console.log(segment, "segment")
        

        try {
            const HOST_BASE_URL = process.env.REACT_APP_HOST_BASE_URL;
            const TOKEN_URL = process.env.REACT_APP_TOKEN_URL;
            const response = await axios.post(`${HOST_BASE_URL}/${TOKEN_URL}`, segment, 
                {
                    headers: {
                        "Content-Type": "application/json",
                    }
                }
            );
            console.log(response);
            toast.success("Saved segment successfully.", {
                position: toast.POSITION.TOP_RIGHT
            });
        } 
        catch (error) {
            console.error(error);
            toast.error("Something went wrong. Failed to save segment", {
                position: toast.POSITION.TOP_RIGHT
            });
        }
        
    }

    const addNewSchema = () => {
        setSchema((prevSchema) => {
            console.log(prevSchema)
            return [...prevSchema, { id: nanoid(), key: "", value: "" }]
        })
    };

    const updateSchema = (id, selectedKey) => {

        setSchema((prevSchema) => {
            const  updatedSchema = prevSchema.filter((schemaData) => {
                if(schemaData.id === id){
                    schemaData.key = selectedKey;
                    schemaData.value = segmentSchemaOptions[selectedKey];
                }
                return schemaData;
            });
            return [...updatedSchema];
        });       

    };

    const deleteSchema = (id) => {
        setSchema((prevSchemaList) => {
            return prevSchemaList.filter(prevSchema => prevSchema.id !== id);
        })        
    }

    

    return(
        <>
        <ToastContainer />
        <Container>
            <Form>
                <Form.Label>Enter the Name of the Segment</Form.Label>
                <FormControl type="text" placeholder="Name of the segment" value={segmentName} onChange={(e)=>{setSegmentName(e.target.value)}}></FormControl>
            </Form>
            <div className="py-4">
                <p>To save your segment, you need to add the schemas to build the query</p>
                

                { (schema && schema.length>0) ? 
                <>
                    {schema.map((schemaData, i)=>{
                        return (
                            <Row className="d-flex align-items-center" key={"row"+schemaData.id}>
                                <Col md={10}>
                                    <Form.Control
                                        as="select"
                                        value={schemaData.key ?? ""}
                                        onChange={e => {
                                            updateSchema(schemaData.id, e.target.value);
                                        }}                                
                                        className="my-2"
                                        key={"select"+i}
                                    >
                                        <option key={"option"+schemaData.id} value="" disabled hidden>Please select a schema</option>
                                        {   
                                            segmentSchemaList.map((segmentSchema, j)  => {
                                                const isOptionSelected = schema.find((schemaOption) => 
                                                    schemaOption.key === segmentSchema[0]
                                                )
                                                return <option key={"option"+i+segmentSchema[0]} value={segmentSchema[0]} disabled={ isOptionSelected ? true : false} >{segmentSchema[1]}</option>;
                                            })
                                        }
                                    </Form.Control>
                                </Col>
                                <Col md={2}>
                                    <DeleteButton key={"del"+schemaData.id} onClick={() => {deleteSchema(schemaData.id)}}>
                                        <FontAwesomeIcon icon={faMinus} />
                                    </DeleteButton>
                                </Col>                              
                            </Row>

                        )
                    })}
                </>
                : null
                }

                <AddSchemaButton disabled={(schema.length >= segmentSchemaList.length) ? true : false}
                    onClick={addNewSchema}>
                        <FontAwesomeIcon icon={faPlus} /> Add new schema
                </AddSchemaButton>
            </div>
        </Container>

        </>
    )
};

export default React.forwardRef(Segment);

const FormControl = styled(Form.Control)`
    &:focus{
        background-color: none;
        box-shadow: none;
    }
`;

const AddSchemaButton = styled.button`
    font-size: 14px;
    font-weight: 500;
    display: inline-block;
    cursor: pointer;
    color: #22cc9d;
    border: none;
    background-color: transparent;
    border-bottom: 2px solid #22cc9d;
    margin: 12px 0;

    &:disabled{
        color: #dfdfdf;
        border-bottom: 2px solid #dfdfdf;
    }
`;

const DeleteButton = styled(Button)`
    color: #22cc9d;
    background-color: #ffffff;
    border-color: #22cc9d;

    &:hover{
        color: #ffffff;
        background-color: #22cc9d;
        border-color: #22cc9d;
    }
`;