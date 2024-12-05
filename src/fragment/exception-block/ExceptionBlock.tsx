import React from 'react';
import {ExceptionResponse} from "../../models/dto/ExceptionResponse";

interface ExceptionBlockProps {
    exceptionResponse: ExceptionResponse;
}

function ExceptionBlock(props: ExceptionBlockProps) {
    return (
        <>
           <div className="exception-block">
               <p>{props.exceptionResponse.code}</p>
               <p>{props.exceptionResponse.message}</p>
           </div>
        </>
    );
}

export default ExceptionBlock;