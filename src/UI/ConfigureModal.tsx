import { sensitiveHeaders } from 'http2';
import React, { useEffect, useRef, useState } from 'react';

export const Configure = () => {

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
        <div>
            <label>Numar stari</label>
            <input onChange={(element) => setNoStates(element.target.value as unknown as number)} id='noStates' min={0} placeholder='Introdu numarul...' type={'number'} className="form-control" />

            <br />

            <label>Numarul starii initiale</label>
            <input id='initalState' min={0} placeholder='Introdu starea...' type={'number'} className="form-control" />

            <br />

            <label>Numarul starii finale</label>
            <input id='finalState' min={0} placeholder='Introdu starea...' type={'number'} className="form-control" />

            <br />

            <table>
                <thead>
                    <tr>
                        {buildTableHeader()}
                    </tr>
                </thead>

                <tbody>
                    {buildTableRows()}
                </tbody>
            </table>
        </div>
    );
}