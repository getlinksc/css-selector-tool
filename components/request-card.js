import {
    Tabs,
} from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"

import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { ResizablePanel } from "@/components/ui/resizable"
import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import { ToastAction } from "@/components/ui/toast";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import {useState} from "react";

const fetchApiEndpoint = "/api/request";

export function RequestCard({ html, setHtml, defaultLayout = [265, 440, 655]}) {
    const [url, setUrl] = useState(null);
    const [isFetching, setIsFetching] = useState(false);
    const { toast } = useToast()

    const handleiframeLoad = (e) => {
        console.log(`iframe is loading`);
        if (e.querySelector(".selectorgadget")){
            setIsFetching(false);
        }
        setTimeout(handleiframeLoad, 30000)
    }

    function request (){
        try {
            const u = new URL(url);
            console.log(`fetch was called url ${url}`)
            setIsFetching(true)

            const config = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({"url": new URL(url)})
            };

            fetch(fetchApiEndpoint, config).then((response) => response.text())
                .then((responseData) => {
                    if (responseData.length > 0){
                        console.log(`got back ${responseData.length}`)
                        setHtml(responseData);
                        return responseData;
                    }
                })
                .catch(error => {
                    console.log(error)
                    toast({
                        variant: "destructive",
                        title: "Uh oh! Fetching failed.",
                        description: `There was a problem with your request. ${error}`,
                        action: <ToastAction altText="Try again">Try again</ToastAction>,
                    })
                });
            setIsFetching(false);
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Oh no! Invalid Url.",
                description: `Please double check the url. ${error}`,
                action: <ToastAction altText="Try again">Try again</ToastAction>,
            })
        }

        // setIsFetching(false)
    }
    return (
        <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
            <Tabs defaultValue="all">
                <div className="flex items-center px-4 py-2">
                    <h1 className="text-xl font-bold">Browser</h1>
                </div>
            </Tabs>
            <Separator/>
            <Card>
                <div className="flex flex-col gap-2 p-4 pt-0">
                    <CardContent>
                        <div className="flex space-x-2 p-2">
                            <Input
                                type="text"
                                placeholder="URL"
                                onChange={(e) => {
                                    setUrl(e.target.value)
                                }}
                            />
                            <Button
                                diabled={isFetching ? "true" : ""}
                                onClick={() => request()}
                            >
                                {
                                    isFetching ?
                                        <ReloadIcon className="mr-2 h-4 w-4 animate-spin"/> : <>Fetch</>
                                }
                            </Button>
                        </div>
                    </CardContent>
                    <ScrollArea className="h-screen">
                        {(html && html.length > 0) ?
                            <div className="overflow-y-auto h-80 sm:h-auto">
                                <iframe
                                    className="h-full max-h-[800px] p-5"
                                    srcDoc={html}
                                    sandbox="allow-forms allow-scripts"
                                    style={{width: "", height: "100%", resize: "both"}}
                                    onLoad={(e) => {handleiframeLoad(e)}}
                                />
                            </div>
                            : <></>}
                    </ScrollArea>
                </div>
            </Card>
            <CardContent>
            </CardContent>

        </ResizablePanel>
    )
}
