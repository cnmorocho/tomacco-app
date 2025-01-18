import React from 'react';

export default function Divider({
    title,
}: {
    title: string;
}): React.ReactElement {
    return (
        <>
            <p className="text-sm font-medium">{title}</p>
            <hr className="pb-1" />
        </>
    );
}
