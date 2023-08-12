import { useRef } from "react";
import "./index.css";
import styled from "styled-components";
import { Modal, Button} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";


const Sidebar = ({show, setShowSidebar, component: Component}) => {
    const childRef = useRef();
    const handleSaveSegment= () => {
        childRef.current.saveSegment();
    }
    return (
        <>                    
            <Modal show={show}>
                <ModalHeader>
                <BackButton onClick={() => setShowSidebar(false)}><FontAwesomeIcon icon={faChevronLeft} /></BackButton>
                <Modal.Title>Saving Segment</Modal.Title>
                </ModalHeader>
                <Modal.Body>
                    <Component ref={childRef}/>
                </Modal.Body>
                <ModalFooter>
                    <SaveButton variant="dark" onClick={handleSaveSegment}>Save the Segment</SaveButton>
                    <CloseButton variant="light" onClick={ () => setShowSidebar(false)}>Cancel</CloseButton>
                </ModalFooter>
            </Modal>
        </>
    )
    
}

export default Sidebar;

// Styled Components
const ModalHeader = styled(Modal.Header)`
    color: #ffffff;
    background-color: #22cc9d;
    border-radius: 0px;
    justify-content: flex-start;
`;
const ModalFooter = styled(Modal.Footer)`
    background-color: #f8f8ff;
    justify-content: start;
`;
const BackButton = styled.span`
    cursor: pointer;
    padding: 5px 10px;
`;
const SaveButton = styled(Button)`
    color: #ffffff;
    background-color: #22cc9d;
    font-weight: 500;
    border: none;
`;
const CloseButton = styled(Button)`
    color: #dc3545;
    background-color: #ffffff;
    font-weight: 500;
`;