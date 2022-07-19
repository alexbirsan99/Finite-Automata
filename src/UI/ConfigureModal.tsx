import { sensitiveHeaders } from 'http2';
import React, { useEffect, useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/esm/Modal';

export const Configure = (props:{showSettings:boolean, onClose:Function, onGenerate:Function}) => {

    const [noStates, setNoStates] = useState(0);


    function buildTableHeader() {
        let headers = [];
        headers.push(<th style={{ textAlign: 'center' }}></th>)
        for (let i = 0; i < noStates; i++) {
            headers.push(<th style={{ textAlign: 'center' }}>{`q${i}`}</th>);
        }
        return headers;
    }

    function buildTableCells() {
        let cells = [];
        for (let i = 0; i < noStates; i++) {
            cells.push(
                <td><input type='text' className='form-control'></input></td>
            );
        }
        return cells;
    }

    function buildTableRows() {
        let rows = [];

        for (let i = 0; i < noStates; i++) {
            rows.push(
                <tr>
                    <th>{`q${i}`}</th>
                    {buildTableCells()}
                </tr>
            );
        }

        return rows;
    }


    return (
        <Modal show={props.showSettings}>
            <Modal.Header closeButton onClick = {() => props.onClose()}>
                <Modal.Title>Configureaza automatismul</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <label>Numar stari</label>
                    <input onChange={(element) => setNoStates(element.target.value as unknown as number)} id='noStates' min={0} placeholder='Introdu numarul...' type={'number'} className="form-control" />
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick = {() => props.onClose()}>
                    Renunta
                </Button>
                <Button variant="primary" onClick = {() => props.onGenerate(noStates)}>
                    Generează automatism determinist aleator
                </Button>
            </Modal.Footer>
        </Modal>
    );
}