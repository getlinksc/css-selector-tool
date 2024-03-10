'use client'
import {
    ResizableHandle,
    ResizablePanelGroup,
} from "@/components/ui/resizable"
import { RequestCard } from "@/components/request-card"
import { DataBuilder } from "@/components/data-builder";
import { useState } from "react";

const fetchApiEndpoint = "/api/request";

export default function Picker() {
    const [html, setHtml] = useState(null);
    const [elements, setElements] = useState([])

    return (
        <>
            <ResizablePanelGroup
                direction="horizontal"
                className="h-full resize-y items-stretch"
            >
                <RequestCard html={html} setHtml={setHtml} elements={elements}/>
                <ResizableHandle withHandle/>
                <DataBuilder html={html} setHtml={setHtml} setElements={setElements}/>
            </ResizablePanelGroup>
        </>
    )
}