import {useState} from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table"
import {Button} from "@/components/ui/button";


export function ResultTable({ data, defaultLayout = [265, 440, 655]}) {
    // console.log(data)
    return (
        <div className="space-y-4">
            <Table>
                {
                    (data && Object.keys(data).length > 0) ? Object.keys(data).map((k,i) => {
                        return (
                            <>
                                <TableHeader>
                                    <TableRow key={`${k}-header`}>
                                        <TableHead key={k} className="w-[100px]">{k.selectorName}</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {
                                        data[k].map((v, j) => {
                                            return (
                                                <TableRow key={`${v}-${k}-${j}-row`}>
                                                    <TableCell key={`${v}${k}-${j}-value`} className="font-medium">{v}</TableCell>
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
    )
}
