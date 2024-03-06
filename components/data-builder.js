import {
    Tabs,
} from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"

import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import {ResizableHandle, ResizablePanel, ResizablePanelGroup} from "@/components/ui/resizable"
import { CardHeader, Card, CardContent, CardDescription } from "@/components/ui/card";
import { ResultTable } from "@/components/result-table"
import { useState, useEffect } from "react";
import * as cheerio from 'cheerio';
import { PlusCircledIcon, MinusCircledIcon} from "@radix-ui/react-icons"
import {Button} from "@/components/ui/button";

export function DataBuilder({ html, setHtml, defaultLayout = [265, 440, 755]}) {
    const [selectors, setSelectors] = useState([
        {"key": "title", "selector": ""}
    ]);
    const [hasSelectors, setHasSelectors] = useState(false);
    const [data, setData] = useState({});
    // check for updates to html, selectors

    const updateSelectorKey = (e, i) => {
        let newSelectorValues = [...selectors];
        newSelectorValues[i].key = e.target.value;
        setSelectors(newSelectorValues);
    }

    const updateSelectorValue = (e, i) => {
        let newSelectorValues = [...selectors];
        newSelectorValues[i].selector = e.target.value;
        setSelectors(newSelectorValues);
    }

    const addSelectors = (e) => {
        setSelectors([...selectors, {"key": "", "selector": ""}])
    }

    const parseForSelectors = (e) => {
        if (html){
            const $ = cheerio.load(html);
            console.log(`setting parser before parsing for page.`)

            for(let selector of selectors) {
                const selectorName = selector.key;
                console.log(`Finding elements with selector: ${selector.selector} for : ${selectorName}`)
                let $results = $(`${selector.selector}`);
                const values = []
                $results.each((i, e) => {
                    let t = $(e).text();
                    console.log(t)
                    values.push(t);
                })
                setData(data => ({
                    ...data,
                    selectorName : values
                }))
            }
        }
    }

    return (
        <ResizablePanel defaultSize={defaultLayout[3]} minSize={30}>
            <ResizablePanelGroup direction="vertical">
                <Tabs defaultValue="all">
                    <div className="flex items-center px-4 py-2">
                        <h1 className="text-xl font-bold">Selectors</h1>
                    </div>
                </Tabs>
                <Separator/>
                <ResizablePanel defaultSize={50}>
                    <Card>
                        <CardHeader className="space-y-1">
                            <CardDescription>
                                Parse for select selector
                            </CardDescription>
                        </CardHeader>
                        <div className="flex flex-col gap-2 p-4 pt-0">
                            <CardContent className="grid gap-4">
                                <ScrollArea className="h-screen">
                                    <CardContent className="grid gap-4">
                                            {selectors.map((input, index) => {
                                                return (
                                                    <div className="grid grid-cols-2 gap-6" key={index}>
                                                        <Input
                                                            id="key"
                                                            type="text"
                                                            placeholder={`key${index}`}
                                                            onChange={(e) => {updateSelectorKey(e, index)}}
                                                        />
                                                        <Input
                                                            id="selector"
                                                            type="text"
                                                            placeholder={`selector${index}`}
                                                            onChange={(e) => {updateSelectorValue(e, index)}}
                                                        />
                                                    </div>
                                                )
                                            })}
                                            <Button
                                                variant="secondary"
                                                diabled={!(hasSelectors && html && html.length > 0) ? "true" : ""}
                                                onClick={(e) => addSelectors(e)}
                                            >
                                                <PlusCircledIcon className="mr-2 h-4 w-4" />
                                                add
                                            </Button>

                                            <Button
                                                diabled={!(hasSelectors && html && html.length > 0) ? "true" : ""}
                                                onClick={() => parseForSelectors()}
                                            >
                                                search
                                            </Button>

                                            {/* Hide export until we have data to export */}
                                            {
                                                Object.keys(data).length > 0 ?
                                                    <a
                                                        download={"data.json"}
                                                        href={URL.createObjectURL(new Blob([JSON.stringify(data)], { type: "application/json" }))}>
                                                        <Button
                                                            diabled={Object.keys(data).length > 0 ? "" : "true"}
                                                        >
                                                            Export JSON
                                                        </Button>
                                                    </a>
                                                    :
                                                    <></>
                                            }
                                    </CardContent>
                                </ScrollArea>
                            </CardContent>
                        </div>
                    </Card>
                </ResizablePanel>
                <ResizableHandle withHandle/>
                <Tabs defaultValue="all">
                    <div className="flex items-center px-4 py-2">
                        <h1 className="text-xl font-bold">Results</h1>
                    </div>
                </Tabs>
                <ResizablePanel defaultSize={50}>
                    <ScrollArea className="h-screen">
                        <ResultTable data={data}/>
                    </ScrollArea>
                </ResizablePanel>
            </ResizablePanelGroup>
        </ResizablePanel>
    )
}
