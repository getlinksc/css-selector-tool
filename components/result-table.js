import {useState} from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table"


export function ResultTable({ data, defaultLayout = [265, 440, 655]}) {
    // console.log(data)
    return (
        <div className="space-y-4">
            <div className="rounded-md border">
                <Table>
                    {
                        (data && Object.keys(data).length > 0) ? Object.keys(data).map((k,i) => {
                            return (
                                <>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead key={k} className="w-[100px]">{k.selectorName}</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {
                                            data[k].map((v, j) => {
                                                return (
                                                    <TableRow key={`${v}-${j}`}>
                                                        <TableCell className="font-medium">{v}</TableCell>
                                                    </TableRow>
                                                )
                                            })
                                        }
                                    </TableBody>
                                </>
                            )
                        }) : <></>
                    }
                </Table>
            </div>
        </div>
    )
}
