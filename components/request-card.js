import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"

import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { ResizablePanel } from "@/components/ui/resizable"
import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import { ToastAction } from "@/components/ui/toast";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Prompt }  from "@/components/prompt"

import { useToast } from "@/components/ui/use-toast";
import {useState} from "react";

const fetchApiEndpoint = "/api/request";

export function RequestCard({ html, setHtml, elements, defaultLayout = [265, 440, 655]}) {
    const [url, setUrl] = useState(null);
    const [isFetching, setIsFetching] = useState(false);
    const [isJavascript, setIsJavascript] = useState(false);
    const { toast } = useToast()


    const toggleJavascript = (e) => {
        console.log(`javascript toggled: ${isJavascript}`)
        setIsJavascript(!isJavascript);
    }

    function request (){
        try {
            const u = new URL(url);
            console.log(`fetch was called url ${url}`)
            setIsFetching(true)

            const payload = {"url": new URL(url)}
            if (isJavascript){
                payload["render_js"] = true;
            }
            const config = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
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
            <Tabs defaultValue="browser">
                <div className="flex items-center px-4 py-2">
                    <h1 className="text-xl font-bold">Editor</h1>
                    <TabsList className="ml-auto">
                        <TabsTrigger value="browser" className="text-zinc-600 dark:text-zinc-200">Browser</TabsTrigger>
                        <TabsTrigger value="prompt" className="text-zinc-600 dark:text-zinc-200">Prompt</TabsTrigger>
                    </TabsList>
                </div>
                <Separator/>
                <TabsContent value="browser" className="m-0">
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
                                <div className="flex space-x-2 p-2">
                                    <Switch id="javascript-mode" checked={isJavascript} onClick={() => toggleJavascript()}/>
                                    <Label htmlFor="javascript-mode">Javascript Enabled</Label>
                                </div>
                            </CardContent>
                            <ScrollArea className="h-screen">
                                {(html && html.length > 0) ?
                                    <div>
                                        <iframe
                                            srcDoc={html}
                                            sandbox="allow-forms allow-scripts"
                                            style={{width: "850px", height:"620px", resize: "both"}}
                                        />
                                    </div>
                                    : <></>}
                            </ScrollArea>
                        </div>
                    </Card>
                </TabsContent>
                <TabsContent value="prompt" className="m-0">
                    <Card>
                        <div className="flex flex-col gap-2 p-4 pt-0">
                            <Prompt elements={elements}/>
                        </div>
                    </Card>
                </TabsContent>
            </Tabs>
        </ResizablePanel>
    )
}
