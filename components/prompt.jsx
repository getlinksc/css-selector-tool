import {CounterClockwiseClockIcon, ReloadIcon} from "@radix-ui/react-icons"
import { Button } from "@/components/ui/button"
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Label } from "@/components/ui/label"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react";
import { MaxLengthSelector } from "@/components/maxlength-selector"
import { ModelSelector } from "@/components/model-selector"
import { TemperatureSelector } from "@/components/temperature-selector"
import { TopPSelector } from "@/components/top-p-selector"
import { models, types } from "@/const/models"
import {ToastAction} from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { useCompletion } from "ai/react";

const promptApiEndpoint = "/api/completion";

function createPrompt(prompt, elements){
    return `You are an expert web scraping expert. Your job is extract and parse data from websites. 
I would like you to \"${prompt}\".\n\n With the HTML elements that I'm about to give you:\n\n 
${elements.join('\n')}`;
}


export function Prompt({elements}) {
    const [instructions, setInstructions] = useState(`Insert prompt to get ChatGPT to scrape elements.`);
    const { toast } = useToast()

    const {
        completion,
        complete,
        isLoading,
    } = useCompletion({
        api: promptApiEndpoint,
        onResponse: (resp) => {
            // trigger something when the response starts streaming in
            // e.g. if the user is rate limited, you can show a toast
            if (resp.status === 429) {
                toast({
                    variant: "destructive",
                    title: "Oh no! You're being rate limited.",
                    description: "You're being rate limited.",
                    action: <ToastAction altText="Try again">{"You're being rate limited. Please try again later."}</ToastAction>,
                })
            }
        },
    });

    async function handlePrompt(){
        const prompt = `You are an web scraping expert. I would like you to \"${instructions}\".\n\n With the HTML elements that I'm about to give you:\n\n ${elements.join('\n')}`;

        if ((prompt.length) > 4000) {
            toast({
                variant: "destructive",
                title: "Oh no! Prompt failed.",
                description: "Your prompt has failed",
                action: <ToastAction altText="Try again">{"Try again with a smaller token size prompt."}</ToastAction>,
            })
        } else {
            const results = await complete(prompt);
            console.log(`got results: ${results}`)
        }

    }
    return (
        <>
            <Tabs defaultValue="edit" className="flex-1">
                <div className="container h-full py-6">
                    <TabsContent value="edit" className="mt-2 border-0 p-0">
                        <div className="flex flex-col space-y-4">
                            <div className="grid h-full gap-6 lg:grid-cols-2">
                                <div className="flex flex-col space-y-4">
                                    <div className="flex flex-1 flex-col space-y-2">
                                        <Label htmlFor="input">Elements</Label>
                                        <Textarea
                                            id="input"
                                            placeholder={elements}
                                            className="flex-1 lg:min-h-[580px]"
                                        />
                                        <Label htmlFor="input">{elements.join("\n").length}</Label>
                                    </div>
                                    <div className="flex flex-col space-y-2">
                                        <Label htmlFor="instructions">Instructions</Label>
                                        <Textarea
                                            id="instructions"
                                            placeholder={instructions}
                                            onChange={(e) => {
                                                setInstructions(e.target.value)
                                            }}
                                        />
                                    </div>
                                </div>
                                <div >
                                    <Textarea
                                        className="mt-[21px] min-h-[400px] rounded-md border bg-muted lg:min-h-[700px]"
                                        id="results"
                                        placeholder={completion}
                                    />
                                </div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Button
                                    diabled={isLoading ? "true" : ""}
                                    onClick={() => handlePrompt()}
                                >
                                    {
                                        isLoading ?
                                            <ReloadIcon className="mr-2 h-4 w-4 animate-spin"/> : <>Submit</>
                                    }
                                </Button>
                            </div>
                        </div>
                    </TabsContent>
                </div>
            </Tabs>
        </>
    )
}