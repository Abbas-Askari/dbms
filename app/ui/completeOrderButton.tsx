'use client';

import React from 'react'
import { useFormStatus } from 'react-dom';

function CompleteOrderButton() {
    const status = useFormStatus();

    return (
        <button className="btn btn-primary flex-1 " disabled={status.pending}>
            <span>
                Finish Order
            </span>
            {
                status.pending && (<span className="loading loading-spinner loading-xs"></span>)
            }
        </button>
    )
}

export default CompleteOrderButton