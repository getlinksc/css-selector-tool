'use client'
import {
    ResizableHandle,
    ResizablePanelGroup,
} from "@/components/ui/resizable"
import { RequestCard } from "@/components/request-card"
import { DataBuilder } from "@/components/data-builder";
import {useState} from "react";

const fetchApiEndpoint = "/api/request";

export default function Picker() {
    const [html, setHtml] = useState(null);
    return (
        <>
            <div className="relative flex min-h-screen flex-col bg-background">
            <div className="container relative p-5">
                <section>
                    <div className="overflow-hidden rounded-[0.5rem] border bg-background shadow-md md:shadow-xl">
                        <div className="hidden flex-col md:flex">
                                <ResizablePanelGroup
                                    direction="horizontal"
                                    className="h-full max-h-[800px] items-stretch"
                                >
                                    <RequestCard html={html} setHtml={setHtml}/>
                                    <ResizableHandle withHandle/>
                                    <DataBuilder html={html} setHtml={setHtml}/>
                                </ResizablePanelGroup>
                            </div>
                        </div>
                </section>
            </div>
            </div>
        </>
)
}